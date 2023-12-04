import React from 'react';
import {Link} from 'react-router-dom';

import "./LandingPage.css";


export default function LandingPage() {

  

return (
  <div className="body">
    <div className="App">
      <nav className="landing-navbar">
        <Link to="/login" className="navbar-item">Login</Link>
        <Link to="/signup" className="navbar-item">Sign Up</Link>
      </nav>
      <header className="App-header">
        <h1>Welcome to FastFlex, We're the fastest</h1>
        <p>Track your journey with us!</p>
        <Link to="/tracking">
          <button className="track-button" >Track</button>
        </Link>
      </header>
      
      <hr style={{ border: '1px solid #ccc', marginTop: '400px' }} />
          <div style={{ marginTop: '3px' }}></div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '70px 0', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>This Site</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Tracking</Link></li>
          <li><Link to="/deliverysearch" style={{ color: 'white', textDecoration: 'none' }}>Shipping</Link></li>
          <li><Link to="/aboutus" style={{ color: 'white', textDecoration: 'none' }}>About FastFlex</Link></li>
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
  </div>
);


}