import React, { useState } from 'react';
import '../Login/LoginCss.css'; // Import the CSS file
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

const Form1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    descryption: '',
  });

  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSignup = async () => {
    console.log('Search update:', formData);
    const data = {
      name: formData.name,
      descryption: formData.descryption,
    };

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
        setLoginMessage("Successful.");
        alert('successfully submitted')
        navigate('/admin');
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
      <div className="login-container">
        <div className="login-form">
          <h2>Search Database Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descryption">Descryption</label>
              <input
                type="text"
                id="descryption"
                name="descryption"
                value={formData.descryption}
                onChange={handleInputChange}
              />
            </div>

            

            <button type="button" onClick={handleSignup}>
              Submit 
            </button>
          </form>
          <p>
            Want to enter details of each service? <a href="/admin/form2">Services</a>
          </p>
          <p>
            Go to Home<a href="/admin">Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form1;
