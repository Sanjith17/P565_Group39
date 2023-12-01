import React, { useState } from "react";
import "./TrackingPage.css"; // Import a separate CSS file for styling
import { Link } from "react-router-dom";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackButtonClick = () => {
    // Handle tracking logic here (you can use the trackingNumber state)
    alert(`Tracking number: ${trackingNumber}`);
  };

  return (
    <div>
  {/* Navbar */}
  <nav className="tracking-navbar">
    <ul>
      <li><Link to="/" className="tracking-navbar-link">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
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
  </div>
      <div className="tracking-box">
        <h1>Tracking</h1> </div>
</div>

  );
};

export default TrackingPage;
