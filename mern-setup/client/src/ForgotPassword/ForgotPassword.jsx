import React, { Component } from 'react';
import './LoginCss.css';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const inputValue = value;
    console.log("name", name)
    console.log("value", value)
    this.setState({
      [name]: inputValue,
    });
  };

  handleForgotPassword = async() => {
    const { email } = this.state;
    
    // You can implement your login logic here
    // For simplicity, let's just print the values
    console.log('email', email);

    const data = {
        email: email
    };

    // Make a POST request to the server

    const getTest = async () => {
      try{

          const res = await fetch( process.env.REACT_APP_BACKEND_URL+'/forgot', {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert data to JSON format
          })
            .then(async (response) => {
              const responseJSON = await response.json()
              if (response.ok) {
                // If the response status is OK (e.g., 200), do something here
                console.log('Sent Email successful!');
                console.log(responseJSON.message)
                this.setState({
                  loginMessage: responseJSON.message
                })
                // You can redirect to another page or perform other actions upon successful login
              } else {
                // Handle errors here, e.g., display an error message to the user
                console.log('Reset failed');
                this.setState({
                  loginMessage: responseJSON.message
                })
              }
            })
            .catch((error) => {
              // Handle network errors or other exceptions here
              console.error('An error occurred:', error.message);
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
      {/* <nav>
      <ul>
        <li>
        <a href="/Login">Back To Login</a>
        </li>
      </ul>
      </nav> */}
      <div className='login-container'>
        <div className="login-form">
            <h2>Forgot Passworrd</h2>
            <form>
            <div className="form-group">
                <label htmlFor="userEmail">Mail ID</label>
                <input
                type="email"
                id="userEmail"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                />
            </div>
            <button type="button" onClick={this.handleForgotPassword}>
                Send mail
            </button>
            </form>
            <p>
                <a href="/login">Back to Login</a>
            </p>

        </div>
      </div>
      </div>
    );
  }
}
export default ForgotPassword;
