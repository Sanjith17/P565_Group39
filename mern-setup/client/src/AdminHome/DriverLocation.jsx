import React, { useState, useEffect, useRef } from 'react';
import { Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import Leaflet styles
import './AdminHome1.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from "axios"; 

function DriverLocation() {
    const [userId, setUserId] = useState(null);
    const [completedAdd, setCompletedAdd] = useState([]);
    const [pickedAdd, setPickeddAdd] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState({firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        role: '',
        answer1: '',
        answer2: '',
        question1: '',
        question2: '',
        location: {
            lat: 39.168804, 
            lng: -86.536659
        }});
    const [drivers, setDrivers] = useState([]);
    const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef();


    const navigate = useNavigate(); 
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
          // Handle the API response data here
                if (role != 'admin'){
                    navigate('/login')
          }
        
                  // Handle the API response data here
                  setUserId(responseJSON.userDetails.userId);
                  console.log(responseJSON.userDetails.userId)
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

        const handleMapReady = () => {
            setMapReady(true);
          };


        useEffect(() => {
            console.log(selectedDriver);
            if (selectedDriver?.location && mapReady) {
                mapRef.current.setView([selectedDriver.location.lat, selectedDriver.location.lng], mapRef.current.getZoom());
              }
          }, [selectedDriver, mapReady]);
          
    const mockMarkers = [
        { id: 1, lat: 39.76, lng: -86.15, label: 'Delivery A' },
        { id: 2, lat: 40.515, lng: -90.156, label: 'Delivery B' },
    ];


    const handleButtonClick = (driver) => {
      // Handle button click for the specific address
      console.log(driver)
      if(typeof driver.location === 'string'){
        driver.location = JSON.parse(driver.location)
      }
      setSelectedDriver({...driver})
      console.log(selectedDriver)
      handleMapReady(true)
      // Add your logic here
    };

    return (
        <div>
      <div>
        {userId ? (
          <p>User ID: {userId}</p>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
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
          <button onClick={() => handleButtonClick(driver)}>Show Location</button>
        </div>
      ))}
    </div>
      </div>
        <div className="admin-container">
            <Typography variant="h4" gutterBottom>Location of {selectedDriver.firstname} {selectedDriver.lastname}</Typography>
                <Grid item xs={12} sm={12}>
                    <div className="map-container">
                        <h2>Live Track Map</h2>
                        <MapContainer ref={mapRef} center={[selectedDriver.location.lat,  selectedDriver.location.lng]} zoom={13} style={{ width: '100%', height: '100%' }} >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                                <Marker position={[selectedDriver.location.lat,  selectedDriver.location.lng]}>
                                    {/* <Popup>{marker.label}</Popup> */}
                                </Marker>
                        </MapContainer>
                    </div>
                </Grid>
            
           </div>
           <Outlet/>
           </div>
    );
                            }
export default DriverLocation;
