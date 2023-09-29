import React, { Component } from 'react';
import './LoginCss.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import LoginForm from "./Login"
import SignupForm from "./Signup"
import { getTest } from "./functions/test";

export default function LandingPage() {
return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LandingPage />}/>
        </Routes>
      </div>
      

    </Router>
   
);


}