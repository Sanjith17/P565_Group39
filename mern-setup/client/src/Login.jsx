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
