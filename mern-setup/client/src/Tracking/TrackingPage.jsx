// TrackingPage.jsx
import React, { useState } from 'react';
import './TrackingPage1.css'; // make sure the CSS file is in the same directory
import trackingData from './Trackdata'; // your mock data file

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = trackingData.find(data => data.trackingNumber === trackingNumber);
    setTrackingInfo(info);
  };

  return (
    <div className="tracking-page">
      <form onSubmit={handleSubmit} className="tracking-form">
        <input 
          type="text" 
          value={trackingNumber} 
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="tracking-input"
          placeholder="Enter tracking number"
        />
        <button type="submit" className="tracking-submit">Track</button>
      </form>
      {trackingInfo && (
        <div className="tracking-details">
          <h2 className="tracking-header">Tracking Details</h2>
          <div className="tracking-timeline">
            {trackingInfo.progress.map((item, index) => (
              <div key={index} className="tracking-event">
                <div className={`tracking-icon ${item.completed ? "completed" : "pending"}`}>
                  {item.completed && <span className="checkmark">&#10003;</span>}
                </div>
                <div className="tracking-info">
                  <div className="tracking-status">{item.status}</div>
                  <div className="tracking-date">{item.date}</div>
                </div>
                {index < trackingInfo.progress.length - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
