import React, { Component } from 'react';
import './LoginCss.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;



    this.setState({
      [name]: inputValue,
    });
  };

  handleLogin = () => {
    const { username, password, rememberMe } = this.state;

    // You can implement your login logic here
    // For simplicity, let's just print the values
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    const data = {
      username: username,
      password: password,
      rememberMe: rememberMe,
    };
  
    // Make a POST request to the server
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert data to JSON format
    })
      .then((response) => {
        if (response.ok) {
          // If the response status is OK (e.g., 200), do something here
          console.log('Login successful!');
          // You can redirect to another page or perform other actions upon successful login
        } else {
          // Handle errors here, e.g., display an error message to the user
          console.error('Login failed');
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions here
        console.error('An error occurred:', error);
      });
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
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
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
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={this.state.rememberMe}
                onChange={this.handleInputChange}
              />
              Remember Me
            </label>
          </div>
          <button type="button" onClick={this.handleLogin}>
            Login
          </button>
        </form>
        <p>
          New user? <a href="/signup">Sign Up</a>
        </p>

      </div>
      </div>
    );
  }
}
export default Login;
