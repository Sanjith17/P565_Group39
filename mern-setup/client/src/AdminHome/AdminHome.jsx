import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import Leaflet styles
import './AdminHome.css';

function AdminHome() {
    const [data, setData] = useState({
        total: 100,
        pending: 30,
        completed: 70,
        graphData: [
            { name: 'Total', count: 100 },
            { name: 'Pending', count: 30 },
            { name: 'Completed', count: 70 },
        ],
    });
    const [userId, setUserId] = useState(null);

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
        
                  // Handle the API response data here
                  setUserId(responseJSON.userId);
                  console.log(responseJSON.userId)
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
        }, []); 
        const mockData = {
            total: 100,
            pending: 30,
            completed: 70,
            graphData: [
                { name: 'Total', count: 100 },
                { name: 'Pending', count: 30 },
                { name: 'Completed', count: 70 },
            ],
        };
        // setData(mockData);
    

    const mockMarkers = [
        { id: 1, lat: 39.76, lng: -86.15, label: 'Delivery A' },
        { id: 2, lat: 40.515, lng: -90.156, label: 'Delivery B' },
    ];

    if (!data) return null;

    return (
        <div>
      <div>
        {userId ? (
          <p>User ID: {userId}</p>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
        <div className="admin-container">
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Total Deliveries</Typography>
                        <Typography variant="h3">{data.total}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Pending Deliveries</Typography>
                        <Typography variant="h3">{data.pending}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="admin-box">
                        <Typography variant="h6">Completed Deliveries</Typography>
                        <Typography variant="h3">{data.completed}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="graph-container">
                        <Typography variant="h6" gutterBottom>Delivery Statistics</Typography>
                        <BarChart width={500} height={300} data={data.graphData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="map-container">
                        <h2>Live Track Map</h2>
                        <MapContainer center={[39.76,  -86.15]} zoom={13} style={{ width: '100%', height: '400px' }}>
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
           </div>
    );
                            }
export default AdminHome;
