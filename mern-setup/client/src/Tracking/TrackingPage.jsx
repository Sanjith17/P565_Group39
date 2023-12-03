import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TrackingPage1.css';
import axios from 'axios'; 

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

  return (
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
    </div>
  );
};

export default TrackPageTest1;