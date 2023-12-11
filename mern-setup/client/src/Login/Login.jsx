import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./LoginCss.css";
import { Link, useNavigate } from "react-router-dom";
import app from "../Firebase/firebase";
import GoogleIcon from "./google-icon.png";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate(); // Move useNavigate to the component level

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name === "username") {
      setUsername(inputValue);
    } else if (name === "password") {
      setPassword(inputValue);
    } else if (name === "rememberMe") {
      setRememberMe(inputValue);
    }
  };

  // const handleMFA = async () => {

  //   const mfaAuthCode = prompt('Please enter the Google authentication Code')

  //   const mfaStatus = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/duo-auth", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ mfaAuthCode })
  //   })

  //   const result = await mfaStatus.json()


  // };

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      const idToken = await result.user.getIdToken();

      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert("You are being redirected to the user Dashboard");
        navigate("/dashboard");
      } else {
        alert("You are being redirected to the Landing page");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
      rememberMe: rememberMe,
    };

    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseJSON = await response.json();
      // await axios.post(process.env.REACT_APP_BACKEND_URL + "/duo-auth", {username: username}).then((duoAuthResponse) => {
      //   window.open(duoAuthResponse.data.authUrl, '_blank');
      // }).catch((err)=>{console.log(err)});

      if (response.ok) {
        console.log("Login successful!");
        console.log(responseJSON.message);
        setLoginMessage(responseJSON.message);
        navigate('/login/validation' ,{state: { string: responseJSON.string, jwt: responseJSON.jwt_token, role: responseJSON.user_det } })

        // Cookies.set("loginToken", responseJSON.jwt_token);

        // localStorage.setItem('loginToken', responseJSON.jwt_token);
        // if (responseJSON.user_det === 'user'){
        // navigate('/user');
        // }
        // else {
        //   if (responseJSON.user_det === 'admin'){
        //     navigate('/admin');
        //   }
        //   else{
        //     navigate('/driver');
        //   }
        // }
      } else {
        console.log("Login failed");
        setLoginMessage(responseJSON.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
        <h2>{loginMessage}</h2>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username or Mail Id</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              style={{
                margin: "0 auto",
                maxWidth: "350px",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              style={{
                margin: "0 auto",
                maxWidth: "350px",
              }}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleInputChange}
              />
              Remember Me
            </label>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={handleLogin}
              style={{
                backgroundColor: "#f00",
                margin: "0 auto",
                maxWidth: "350px",
              }}
            >
              Login
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ccc",
                padding: "10px 20px",
                marginTop: "10px",
                cursor: "pointer",
                display: "inline-block",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "350px",
                alignSelf: "center",
              }}
              onClick={signInWithGoogle}
            >
              <img
                src={GoogleIcon}
                alt="Google Icon"
                width="20"
                height="20"
                style={{ verticalAlign: "middle", marginRight: "10px" }}
              />
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

export default Login;
