import React, { Component } from 'react';
import { signInWithGoogle } from './firebase';
import './LoginCss.css';
import { redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      loginMessage: ""
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;



    this.setState({
      [name]: inputValue,
    });
  };

  handleLogin = async() => {
    const { username, password, rememberMe } = this.state;


    const data = {
      username: username,
      password: password,
      rememberMe: rememberMe,
    };
  
    

    const getTest = async () => {
      try{
          const res = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert data to JSON format
          })
            .then(async (response) => {
              const responseJSON = await response.json()
              if (response.ok) {
                
                console.log('Login successful!');
                console.log(responseJSON.message)
                
                this.setState({
                  loginMessage: responseJSON.message
                })
                // You can redirect to another page or perform other actions upon successful login
              } else {
                
                console.log('Login failed');
                this.setState({
                  loginMessage: responseJSON.message
                })
              }
            })
            .catch((error) => {
              
              console.error('An error occurred:', error);
            });
      }
      catch(error) {
        console.log(error)
      }
    }
       
    await getTest()
  };


  render() {
    return (
      <div>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      </nav>
      <div className="login-form">
        <h2>{this.state.loginMessage}</h2>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username or Mail Id</label>
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
          
          <button type="button" style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #ccc',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }} onClick={signInWithGoogle}>
                  
            <img src="./Resources/google-icon.png"
                    alt="Google Icon"
                    width="20"
                    height="20"
                    style={{ verticalAlign: 'middle', marginRight: '10px' }}/>
            Sign in with Google
          </button>
          

        </form>
        <p>
          Forgot Password? <a href="/forgot">Reset Password</a>
        </p>
        <p>
          New user? <a href="/signup">Sign Up</a>
        </p>

      </div>
      </div>
    );
  }
  addDimensions() {

  }
}
export default Login;
