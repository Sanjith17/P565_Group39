import React, { useState } from "react";
import "../Login/LoginCss.css"; // Import the CSS file
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
    question1: "what is your mother's maiden name?",
    question2: "What was the name of your first pet?",
    answer1: "",
    answer2: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [qrCode, setqrCode] = useState("");
  const [DisplayQR, setDisplayQR] = useState(false);
  const history = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (event) => {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  };

  const handleQuestion1Change = (event) => {
    setFormData({
      ...formData,
      question1: event.target.value,
    });
  };

  const handleQuestion2Change = (event) => {
    setFormData({
      ...formData,
      question2: event.target.value,
    });
  };

  const mfaSetup = async (qrcodeURL) => {
    if (qrcodeURL != null) {
      setqrCode(qrcodeURL);
      setDisplayQR(true);
    }

    if (DisplayQR) {
      const qrCodeDiv = document.createElement("div");
      qrCodeDiv.innerHTML =
        "<h2>Scan the QR code on your Google Authenticator app on Phone, after scanning click ok</h2><img src = {qrCode} />";

      return window.confirm(`${qrCode}`);
    }
    return false;
  };

  const handleSignup = async () => {
    console.log("Signup Data:", formData);
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      question1: formData.question1,
      question2: formData.question2,
      answer1: formData.answer1,
      answer2: formData.answer2,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseJSON = await response.json();

      if (response.ok) {
        console.log("Sign Up successful!");
        setLoginMessage("Sign Up Successful.");

        if (mfaSetup(response.qrcodeURL)) {
          history("/login");
        }
      } else {
        console.error("Sign Up failed", responseJSON);
        setLoginMessage("Sign Up Failed: " + responseJSON.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
              <select value={formData.role} onChange={handleRoleChange}>
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

            <div className="form-group">
              <label>Question 1</label>
              <select
                value={formData.question1}
                onChange={handleQuestion1Change}
              >
                <option value="what is your mother's maiden name?">
                  what is your mother's maiden name?
                </option>
                <option value="What high school did you attend?">
                  What high school did you attend?
                </option>
                <option value="What was your favorite food as a child?">
                  What was your favorite food as a child?
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="answer1">Answer 1</label>
              <input
                type="text"
                id="answer1"
                name="answer1"
                value={formData.answer1}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Question 2</label>
              <select
                value={formData.question2}
                onChange={handleQuestion2Change}
              >
                <option value="What was the name of your first pet?">
                  What was the name of your first pet?
                </option>
                <option value="What was your childhood nickname?">
                  What was your childhood nickname?
                </option>
                <option value="In what city were you born?">
                  In what city were you born?
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="answer2">Answer 2</label>
              <input
                type="text"
                id="answer2"
                name="answer2"
                value={formData.answer2}
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
