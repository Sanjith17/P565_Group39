// TrackPageTest1.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TrackPageTest1.css';


const mockData = {
  "123456": [
    { name: 'Pick Up', date: 'Monday 09/11/2045 at 11.45 PM', completed: true },
    { name: 'Pick Up Done', date: 'Tuesday 11/11/2045 at 10.45 AM', completed: true },
    { name: 'On The Way', date: 'Thurday 12/11/2045 at 09.55 PM', completed: true },
    { name: 'Delivered', date: 'Monday 09/11/2045 at 11.45 PM', completed: false },
  ],
  "111111": [
    { name: 'Pick Up', date: 'Monday 09/11/2045 at 11.45 PM', completed: true },
    { name: 'Pick Up Done', date: 'Tuesday 11/11/2045 at 10.45 AM', completed: true },
    { name: 'On The Way', date: 'Thurday 12/11/2045 at 09.55 PM', completed: true },
    { name: 'Delivered', date: 'Monday 09/11/2045 at 11.45 PM', completed: true },
  ],

};

const TrackPageTest1 = () => {
  const [trackingId, setTrackingId] = useState('');
  const [currentStatus, setCurrentStatus] = useState(null);
  const [trackingSteps, setTrackingSteps] = useState([]);

  const handleTrack = () => {
    const steps = mockData[trackingId] || [];
    setTrackingSteps(steps);
    const lastCompleted = steps.slice().reverse().find(step => step.completed);
    setCurrentStatus(lastCompleted || steps[0] || null);
  };
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
                <Link to="/" style={{ textDecoration: 'none', color: 'yellow' }}>Home</Link>
            </li>
            <li style={{ margin: '0 10px' }}> {/* Horizontal margin */}
                <Link to="/login" style={{ textDecoration: 'none', color: 'yellow' }}>Login</Link>
            </li>
            <li style={{ margin: '0 10px' }}> {/* Horizontal margin */}
                <Link to="/signup" style={{ textDecoration: 'none', color: 'yellow' }}>SignUp</Link>
            </li>
        </ul>
  </nav>

  {/* Tracking Container */}
  <div className="tracking-container">
    <h1>Tracking Page</h1>
    <div className="tracking-input">
      <label className="tracking-label">Please enter your tracking number:</label>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
    </div>
    <button className="track-button" onClick={handleTrackButtonClick}>
      Track
    </button>
    <div style={styles.recentlyTrackedContainer}>
      <h2 style={styles.recentlyTrackedHeader}>Recently Tracked</h2>
      <p>
        <Link to="/login" style={styles.loginSignupLink}>Log in</Link> or 
        <Link to="/signup" style={styles.loginSignupLink}>Sign up</Link> to view your recently tracked shipments.
      </p>
    </div>
  </div>
 
  <hr style={{ border: '1px solid #ccc', marginTop: '700px' }} />
          <div style={{ marginTop: '3px' }}></div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '100px 0', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3>This Site</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Tracking</Link></li>
          <li><Link to="/deliverysearch" style={{ color: 'white', textDecoration: 'none' }}>Shipping</Link></li>
          <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>About FastFlex</Link></li>
        </ul>
      </div>
      <div>
        <h3>Connect With Us</h3>
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