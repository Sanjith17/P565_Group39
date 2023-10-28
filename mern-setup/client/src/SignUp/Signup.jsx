import React, { Component } from 'react';
import '../Login/LoginCss.css'; // Import the CSS file
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      role: 'user',
      password: '',
      confirmPassword: '', 
      loginMessage: ""
    };
  }  

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleOptionChange = event => {
    console.log(event)
    this.setState({
      role: event.target.value
    })
  }

  handleSignup = async() => {
    // Implement your signup logic here
    // For simplicity, let's just print the form data
    console.log('Signup Data:', this.state);
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword, 
    }

    try{

      const res = await fetch(process.env.REACT_APP_BACKEND_URL+'/signup', {


        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert data to JSON format
      })
        .then(async(response) => {
          const responseJSON = await response.json()
          if (response.ok) {
            // If the response status is OK (e.g., 200), do something here
            console.log('Sign Up successful!');
            this.setState({loginMessage: "Sign Up Successfull."})// Your user name is:"+ responseJSON.userName})
            // this.props.history.push('/login');
            // You can redirect to another page or perform other actions upon successful login
          } else {
            // Handle errors here, e.g., display an error message to the user
            console.error('Sign Up failed', responseJSON);
            this.setState({loginMessage: "Sign Up Failed: "+responseJSON.error})
          }
        })
        .catch((error) => {
          // Handle network errors or other exceptions here
          console.error('An error occurred:', error);
        });
    }
    catch(error) {
      console.log(error)
    }
  };

  render() {
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
        <h2>{this.state.loginMessage}</h2>
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </div>


            <div>
            <label>Select an option:</label>
            <select value={this.state.role} onChange={this.handleOptionChange}>
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
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="button" onClick={this.handleSignup}>
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
  }
}

export default Signup;
