import React, { useState } from 'react';
import '../Login/LoginCss.css';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

const Form1 = () => {
  const [formData, setFormData] = useState({
    find_company_name: '',
    find_type_of_service: '',
    find_weight_category: '',
    update_company_name: '',
    update_price: '',
    update_type_of_service: '',
    update_weight_category: '',
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

  const handleTypeChange = (event, fieldPrefix) => {
    setFormData({
      ...formData,
      [`${fieldPrefix}_type_of_service`]: event.target.value,
    });
  };

  const handleWeightChange = (event, fieldPrefix) => {
    setFormData({
      ...formData,
      [`${fieldPrefix}_weight_category`]: event.target.value,
    });
  };

//   const handleFindRecord = async () => {
//     // Logic to find the record based on formData.find_company_name, formData.find_type_of_service, formData.find_weight_category
//     console.log('Finding record:', formData);
//   };

  const handleUpdateRecord = async () => {
    console.log('Updating record:', formData);
    const data = {
        company_name: formData.find_company_name,
        type_of_service: formData.find_type_of_service,
        weight_category: formData.find_weight_category,
        new_company_name: formData.update_company_name,
        new_price: formData.update_price,
        new_type_of_service: formData.update_type_of_service,
        new_weight_category: formData.update_weight_category,
      };
    console.log(data);
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/service_update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        console.log('Update successful!');
        setLoginMessage('Update successful.');
        alert('Successfully updated');
        navigate('/admin');
      } else {
        console.error('Update failed', responseJSON);
        setLoginMessage('Update Failed: ' + responseJSON.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h2>Search and Update Database Form</h2>
          <form>
            {/* Form for finding a record */}
            <div className="form-group">
              <label htmlFor="find_company_name">Find Company Name</label>
              <input
                type="text"
                id="find_company_name"
                name="find_company_name"
                value={formData.find_company_name}
                onChange={(event) => handleInputChange(event, 'find')}
              />
            </div>

            <div className="form-group">
              <label>Find Type of Service</label>
              <select
                value={formData.find_type_of_service}
                onChange={(event) => handleTypeChange(event, 'find')}
              >
                <option value="heavy_machinery">Heavy Machinery</option>
                <option value="light">Light</option>
                <option value="delicate">Delicate</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>

            <div className="form-group">
              <label>Find Weight Category</label>
              <select
                value={formData.find_weight_category}
                onChange={(event) => handleWeightChange(event, 'find')}
              >
                <option value="Light">Light</option>
                <option value="Heavy">Heavy</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>

            {/* Form for updating a record */}
            <div className="form-group">
              <label htmlFor="update_company_name">Update Company Name</label>
              <input
                type="text"
                id="update_company_name"
                name="update_company_name"
                value={formData.update_company_name}
                onChange={(event) => handleInputChange(event, 'update')}
              />
            </div>

            <div className="form-group">
              <label>Update Type of Service</label>
              <select
                value={formData.update_type_of_service}
                onChange={(event) => handleTypeChange(event, 'update')}
              >
                <option value="heavy_machinery">Heavy Machinery</option>
                <option value="light">Light</option>
                <option value="delicate">Delicate</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>

            <div className="form-group">
              <label>Update Weight Category</label>
              <select
                value={formData.update_weight_category}
                onChange={(event) => handleWeightChange(event, 'update')}
              >
                <option value="Light">Light</option>
                <option value="Heavy">Heavy</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="update_price">Update Price</label>
              <input
                type="text"
                id="update_price"
                name="update_price"
                value={formData.update_price}
                onChange={(event) => handleInputChange(event, 'update')}
              />
            </div>

            {/* <button type="button" onClick={handleFindRecord}>
              Find Record
            </button> */}

            <button type="button" onClick={handleUpdateRecord}>
              Update Record
            </button>
          </form>

          <p>
            Want to enter the description of each company? <a href="/admin/form1">Company</a>
          </p>
          <p>
            Go to Home <a href="/admin">Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form1;
