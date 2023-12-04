import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import Leaflet styles
import './AdminHome1.css';
import { Link, useNavigate, Outlet, useLocation} from 'react-router-dom';
import axios from "axios"; 


function AssignDriver() {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);
    const location = useLocation();
    const addressId = location.state.selectedAddress;

    useEffect(() => {
        const fetchData = async () => {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('loginToken');
      
            // Check if the token exists
            if (token) {
              console.log("got the token");
              // Set up the headers for the API request with the JWT token
              const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              };
      
              try {
                // Make the API request with the token in the headers
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/getuser', {
                  method: 'POST', // or 'POST', 'PUT', etc.
                  headers: headers,
                });
                const responseJSON = await response.json();
                const role = responseJSON.userDetails.role
              if (role != 'admin'){
                  navigate('/login')
        }
      
                
              } catch (error) {
                // Handle any errors that occur during te API request
                console.error(error);
              }
            } else {
              // Handle the case where the token is not found in local storage
              console.error('JWT token not found in local storage');
            }
          };
      
          fetchData();


          const fetchDrivers = async () => {
            try {
              const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/getdrivers"
              );
      
              const responseJSON = response.data;
              const driverList = responseJSON.drivers;

              console.log(driverList);
              setDrivers(driverList)
              console.log(drivers)

              

      
              // setData(responseJSON);
            } catch (error) {
              console.error("Error fetching services data:", error.message);
            }
          };
      
          fetchDrivers();

    }, []); 

    const handleButtonClick = async (driverId) => {
        console.log(`Button clicked for Address ${driverId}`);
        try {
            const response = await axios.post(
              process.env.REACT_APP_BACKEND_URL + "/setdrivers",{addressId: addressId, driverEmail: driverId}
              
            );
            navigate('/admin')
          } catch (error) {
            console.error("Error fetching services data:", error.message);
          }

        
      };

    return (
        <div>
      {addressId}
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin Home</Link>
          </li>
          
        </ul>
      </nav>
      <div>
      <div>
      {drivers.map((driver, index) => (
        <div key={index}>
          <p>Driver Name: {driver.firstname} {driver.lastname}</p>
          <p>Driver Email: {driver.email} </p>
          <button onClick={() => handleButtonClick(driver.email)}>Click me</button>
        </div>
      ))}
    </div>
      </div>
      </div>       
    );
}

export default AssignDriver;