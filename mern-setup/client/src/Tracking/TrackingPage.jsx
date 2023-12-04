import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TrackingPage1.css';
import axios from 'axios'; 
import { Link } from "react-router-dom";
import FastFlexIcon from './FastFlex.png';

const steps = [

]

const TrackPageTest1 = () => {
  const [trackingId, setTrackingId] = useState('');
  const [currentStatus, setCurrentStatus] = useState(null);
  const [showSteps, setShowSteps] = useState(false)
  const [trackingSteps, setTrackingSteps] = useState([{ name: 'Pick Up', status: 'Unassigned', completed: false },
  { name: 'Pick Up Done', status: 'Assigned', completed: false },
  { name: 'On The Way', status: 'Pending', completed: false },
  { name: 'Delivered', status: 'Delivered', completed: true },]);
  const [makeApiCall, setMakeApiCall] = useState(0)

  useEffect(() => {
    console.log(trackingSteps)
  }, [trackingSteps])

  // useEffect(() => {
  //   console.log(currentStatus)
  //   const steps = trackingSteps;
  //   let value = true
  //   for(let i = 0; i < 4; i++){
  //     if(trackingSteps[i].status == currentStatus){
  //       trackingSteps[i].completed = value
  //       value = false
  //       continue
  //     }
  //     trackingSteps[i].completed = value
  //   }
  //   setTrackingSteps(steps);
  //   console.log(trackingSteps)
    
  // }, [currentStatus])


  useEffect(() => {
    setTrackingSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        completed:
          (currentStatus === 'Unassigned' && index === 0) ||
          (currentStatus === 'Assigned' && index <= 1) ||
          (currentStatus === 'Pending' && index <= 2) ||
          currentStatus === 'Delivered',
      }))
    );
  }, [currentStatus]);
  
  
  
  





  useEffect(() => {
    const handleTrack = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/trackorder",{trackingId:trackingId}
        );
        const responseJSON = response.data;
        const orderList = responseJSON.orderDetails;
  
        setCurrentStatus(orderList[0].status)
        console.log(orderList)
  
      } catch (error) {
        console.error("Error fetching services data:", error.message);
      }
      setShowSteps(true)
    };
    if(trackingId != ''){
      handleTrack()
    }

  }, [makeApiCall]);

  const makeCall = () => {
    setMakeApiCall(!makeApiCall)
  }
  const styles = {
    recentlyTrackedContainer: {
      marginTop: '20px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9', // Example background color
      border: '1px solid #ddd', // Example border
      borderRadius: '4px' // Example border radius
    },
    recentlyTrackedHeader: {
      marginBottom: '10px',
      color: '#333', // Example text color
    },
    loginSignupLink: {
      margin: '0 5px',
      textDecoration: 'none',
      color: '#0066cc', // Example link color
      fontWeight: 'bold' // Example font weight
    }
  };

  return (
    <div>
  {/* Navbar */}
  <nav className="tracking-navbar">
    <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
            <li style={{ margin: '0 10px' }}> {/* Horizontal margin */}
              <img src={FastFlexIcon} alt="FastFlex" style={{ marginRight: '5px', width: '60px', height: '60px' }} />
                <Link to="/" style={{ textDecoration: 'none', color: 'yellow' }}>Home</Link>
            </li>
            <li style={{ margin: ' 10px' }}> {/* Horizontal margin */}
                <Link to="/login" style={{ textDecoration: 'none', color: 'yellow' }}>Login</Link>
            </li>
            <li style={{ margin: ' 10px' }}> {/* Horizontal margin */}
                <Link to="/signup" style={{ textDecoration: 'none', color: 'yellow' }}>SignUp</Link>
            </li>
        </ul>
  </nav>

    <div className="track-container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Tracking ID"
          aria-label="Tracking ID"
          aria-describedby="button-track"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-track"
            onClick={makeCall}
          >
            Track
          </button>
        </div>
      </div>
      {currentStatus && (
        <div className="status-box">
          <div className="status-name">{currentStatus}</div>
          {/* <div className="status-date">{currentStatus.date}</div> */}
        </div>
      )}
      {showSteps && <div className="status-line">
        {trackingSteps.map((step, index) => (
          <React.Fragment key={index}>
            {index >= 1 && (
              <div className={`line-segment ${step.completed ? 'completed' : ''}`}></div>
            )}
            <div className={`dot ${step.completed ? 'completed' : ''}`}>
              {step.completed && <span className="checkmark">&#10003;</span>}
            </div>
          </React.Fragment>
        ))}
      </div>
}
<div style={styles.recentlyTrackedContainer}>
      <h2 style={styles.recentlyTrackedHeader}>Recently Tracked?</h2>
      <p>
        <Link to="/login" style={styles.loginSignupLink}>Log in</Link> or 
        <Link to="/signup" style={styles.loginSignupLink}>Sign up</Link> to view your recently tracked shipments.
      </p>
    </div>  
    </div>
    <hr style={{ border: '1px solid #ccc', marginTop: '650px' }} />
          <div style={{ marginTop: '3px' }}></div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '70px 0', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>This Site</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/deliverysearch" style={{ color: 'white', textDecoration: 'none' }}>Shipping</Link></li>
          <li><Link to="/aboutus" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></li>
        </ul>
      </div>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>Connect With Us</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="https://www.facebook.com" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a></li>
          <li>Contact Us: +1(626) fas-flex </li>
          {/* ... other list items */}
        </ul>
        </div>
      </footer>
    </div>
  );
};

export default TrackPageTest1;