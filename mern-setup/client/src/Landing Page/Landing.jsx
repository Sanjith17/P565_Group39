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
      
    </div>
  </div>
);


}