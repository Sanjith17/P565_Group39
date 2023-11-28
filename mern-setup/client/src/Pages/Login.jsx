import React, { Component } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import './LoginCss.css';
import { Link, useNavigate } from 'react-router-dom';
import app from './firebase';
import GoogleIcon from './Resources/google-icon.png'
// import { makeStyles } from '@mui/styles';

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

  signInWithGoogle = async() => {
    try{
      const auth = getAuth(app);
      const provider = await new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      const idToken = await result.user.getIdToken();

      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idToken}),
      })

      const data = await response.json()

      console.log(data)

      const navigate = useNavigate();

      if (data.success) {
        navigate('/dashboard');
      }
      else {
        alert("You are being redirected to Landing page")
        // redirect('/mern-setup/client/src/Landing.jsx')
        navigate('/')
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  handleLogin = async() => {
    const { username, password, rememberMe } = this.state;


    const data = {
      username: username,
      password: password,
      rememberMe: rememberMe,
    };
  
    const getTest = async () => {
      try{
          await fetch(process.env.REACT_APP_BACKEND_URL+'/login', {
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

                const navigate = useNavigate()

                navigate('/')
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
              style={{
                margin: '0 auto',
                maxWidth: '350px'
              }}
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
              style = {{
                margin: '0 auto',
                maxWidth: '350px'
              }}
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
          <div className='form-group'>
            <button type="button" onClick={this.handleLogin} style={{
              backgroundColor: '#f00',
              margin: '0 auto',
              maxWidth: '350px'
            }}>
              Login
            </button>

            <button type="button" style={{
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #ccc',
                      padding: '10px 20px',
                      marginTop: '10px',
                      cursor: 'pointer',
                      display: 'inline-block',
                      borderRadius: '5px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      maxWidth: '350px',
                      alignSelf: 'center'
                  }} onClick={this.signInWithGoogle}>

              <img src={GoogleIcon}
                      alt="Google Icon"
                      width="20"
                      height="20"
                      style={{ verticalAlign: 'middle', marginRight: '10px' }}/>
              Sign in with Google
            </button>
          </div>
          
          

        </form>
        <p>
          Forgot Password? <Link to="/forgot">Reset Password</Link>
        </p>
        <p>
          New user? <Link to="/signup">Sign Up</Link>
        </p>

      </div>
      </div>
    );
  }

}
export default Login;
