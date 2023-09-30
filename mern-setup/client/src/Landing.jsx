import React, { Component } from 'react';
import './LoginCss.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import LoginForm from "./Login"
import SignupForm from "./Signup"
import { getTest } from "./functions/test";

export default function LandingPage() {
return (
    <div>
    FastFlex Delivery
    
    
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
    </div>
);


}