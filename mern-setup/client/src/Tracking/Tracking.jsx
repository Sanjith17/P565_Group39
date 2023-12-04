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
            onClick={handleTrack}
          >
            Track
          </button>
        </div>
      </div>
      {currentStatus && (
        <div className="status-box">
          <div className="status-name">{currentStatus.name}</div>
          <div className="status-date">{currentStatus.date}</div>
        </div>
      )}
      <div className="status-line">
        {trackingSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`dot ${step.completed ? 'completed' : ''}`}>
              {step.completed && <span className="checkmark">&#10003;</span>}
            </div>
            {index < trackingSteps.length - 1 && (
              <div className="line-segment"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TrackPageTest1;