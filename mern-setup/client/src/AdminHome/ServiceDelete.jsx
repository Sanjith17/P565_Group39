import React, { useState } from 'react';
import '../Login/LoginCss.css'; // Import the CSS file
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

const Form1 = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    type_of_service: '',
    weight_category: '',
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


  const handleTypeChange = (event) => {
    setFormData({
      ...formData,
      type_of_service: event.target.value,
    });
  };

  const handleWeightChange = (event) => {
    setFormData({
      ...formData,
      weight_category: event.target.value,
    });
  };


  const handleSubmit = async () => {
    console.log('Search update:', formData);
    const data = {
      company_name: formData.company_name,
      type_of_service: formData.type_of_service,
      weight_category: formData.weight_category,
    };

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/service_delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        alert('successfully deleted')
        navigate('/admin');
      } else {
        console.error('DElete failed', responseJSON);
        alert('Service Not found')
        navigate('/admin/delete');
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
              <label htmlFor="company_name">Company Name</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
              />
            </div>
            

            <div className="form-group">
              <label>Type of Service</label>
              <select value={formData.type_of_service} onChange={handleTypeChange}>
                <option value="heavy_machinery">Heavy Machinery</option>
                <option value="light">Light</option>
                <option value="delicate">Delicate</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>

            <div className="form-group">
              <label>Weight Category</label>
              <select value={formData.weight_category} onChange={handleWeightChange}>
                <option value="Light">Light</option>
                <option value="Heavy">Heavy</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>


            <button type="button" onClick={handleSubmit}>
              Submit 
            </button>
          </form>
          <p>
            Want to enter descryption of each company? <a href="/admin/form1">Company</a>
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
   