import React, { useState } from 'react';
import '../Login/LoginCss.css'; // Import the CSS file
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '', 
  });

  const [loginMessage, setLoginMessage] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionChange = (event) => {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  }

  const handleSignup = async () => {
    console.log('Signup Data:', formData);
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      confirmPassword: formData.confirmPassword, 
    }

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        console.log('Sign Up successful!');
        setLoginMessage("Sign Up Successful.");
        // Redirect to the login page or any other page on success
        history.push('/login');
      } else {
        console.error('Sign Up failed', responseJSON);
        setLoginMessage("Sign Up Failed: " + responseJSON.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div className="login-container">
        <div className="login-form">
          <h2>{loginMessage}</h2>
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Select an option:</label>
              <select value={formData.role} onChange={handleOptionChange}>
                <option value="user">User</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;










