import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import Leaflet styles
import './AdminHome1.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from "axios"; 

function AdminHome() {
    const [userId, setUserId] = useState(null);
    const [completedAdd, setCompletedAdd] = useState([]);
    const [pickedAdd, setPickeddAdd] = useState([]);
    const [unassignAdd, setUnassignAdd] = useState([]);

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

            const fetchAddresses = async () => {
              try {
                const response = await axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/getaddresses"
                );
        
                const responseJSON = response.data;
                const comAdd = responseJSON.deliveredAddresses; 
                const unAdd = responseJSON.unassignedAddresses; 
                const penAdd = responseJSON.pendingAddresses; 

                console.log(responseJSON);
                setCompletedAdd(comAdd);
                setPickeddAdd(penAdd);
                setUnassignAdd(unAdd);

                

        
                // setData(responseJSON);
              } catch (error) {
                console.error("Error fetching services data:", error.message);
              }
            };
        
            fetchAddresses();
        }, []); 


    

    const mockMarkers = [
        { id: 1, lat: 39.76, lng: -86.15, label: 'Delivery A' },
        { id: 2, lat: 40.515, lng: -90.156, label: 'Delivery B' },
    ];


    const handleButtonClick = (addressId) => {
      // Handle button click for the specific address
      console.log(pickedAdd)
      console.log(`Button clicked for Address ${addressId}`);
      navigate("/admin/assign", { state: { selectedAddress: addressId } });
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
            <Link to="/admin/form2">Add Company Services</Link>
          </li>
          <li>
            <Link to="/admin/delete">Remove Company Services</Link>
          </li>
          <li>
            <Link to="/admin/update">Update Company Services</Link>
          </li>
          <li>
            <Link to="/admin/drivers">View Drivers</Link>
          </li>
        </ul>
      </nav>
        <div className="admin-container">
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Total Deliveries</Typography>
                        <Typography variant="h3">{unassignAdd.length+pickedAdd.length+completedAdd.length}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Pending Deliveries</Typography>
                        <Typography variant="h3">{unassignAdd.length+pickedAdd.length}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Completed Deliveries</Typography>
                        <Typography variant="h3">{completedAdd.length}</Typography>
                    </div>
                </Grid>

                <Grid item xs={5} sm={4}>
                  <div className="admin-box">
                    <Typography variant="h6">Completed Deliveries</Typography>
                    {/* Display list of addresses for completed deliveries */}
                    <ul>
                      {completedAdd.map((address, index) => (
                          <li key={index}>{address}</li>
                        ))}
                    </ul>
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <div className="admin-box">
                    <Typography variant="h6">Assigned Deliveries</Typography>
                    {/* Display list of addresses for assigned deliveries */}
                    <ul>
                      {pickedAdd.map((address, index) => (
                        <li key={index}>{address}</li>
                      ))}
                    </ul>
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                      <Typography variant="h6">Addresses to be assigned</Typography>
                      {/* Display addresses with buttons */}
                      <div className="address-column">
                        <ul>
                          {unassignAdd.map((address, index) => (
                            <li key={index}>
                              {address}
                              <button onClick={() => handleButtonClick(address)}>Click me</button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="address-column">
                        {/* Additional column for addresses */}
                        {/* ... */}
                      </div>
                      <div className="address-column">
                        {/* Additional column for addresses */}
                        {/* ... */}
                      </div>
                    </div>
                  </Grid>
                
                <Grid item xs={12} sm={12}>
                    <div className="map-container">
                        <h2>Live Track Map</h2>
                        <MapContainer center={[39.76,  -86.15]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {mockMarkers.map(marker => (
                                <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                                    <Popup>{marker.label}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </Grid>
            </Grid>
           </div>
           <Outlet/>
           </div>
    );
                            }
export default AdminHome;
