import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import Leaflet styles
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from "axios"; 
import Cookies from "js-cookie";


function Validation        (){
    const [code, setCode] = useState('')
    const navigate = useNavigate();

    const [userCode, setUserCode] = useState('');

    const location = useLocation();
    const addressId = location.state.email;
    



    console.log(location.state.string)
    const handleInputChange = (e) => {
        setUserCode(e.target.value);
      };


      const handleSubmit = () => {
        // Compare entered code with the expected code
        if (userCode === location.state.string) {
          console.log('Code is correct!');

          Cookies.set("loginToken", location.state.jwt);

          localStorage.setItem('loginToken', location.state.jwt);
          if (location.state.role === 'user'){
          navigate('/user');
          }
          else {
            if (location.state.role === 'admin'){
              navigate('/admin');
            }
            else{
              navigate('/driver');
            }
          }
        } else {
            alert('Not corrrect Code')
            navigate('/login')
          console.log('Code is incorrect. Please try again.');
        }
      };

   

    return(

        <div>
      <label htmlFor="codeInput">Enter Code:</label>
      {/* Input field for code */}
      <input
        type="text"
        id="codeInput"
        value={userCode}
        onChange={handleInputChange}
      />

<Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
        
    }

    export default Validation;


