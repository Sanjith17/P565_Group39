import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import './AdminReview.css';
import { Typography, Grid, Button } from '@mui/material';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } from 'react-leaflet';

function OrderLocation() {
  const [trackId, setTrackId] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOders] = useState([]);
  const [completedOrders, setDelOrders] = useState([]);
  const [value, setValue] = useState(0);
  const mapRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('loginToken');

      // Check if the token exists
      if (token) {
        console.log('got the token');
        // Set up the headers for the API request with the JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        try {
          // Make the API request with the token in the headers
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/getuser', {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
          });
          const responseJSON = await response.json();
          const role = responseJSON.userDetails.role;
          if (role !== 'user') {
            navigate('/login');
          }
        } catch (error) {
          // Handle any errors that occur during the API request
          console.error(error);
        }
      } else {
        // Handle the case where the token is not found in local storage
        console.error('JWT token not found in local storage');
      }
    };

    fetchData();


    const getOrders = async() => {
        const token = localStorage.getItem('loginToken');
    
        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/getcustomerorders",{jwt:token}
          );
          const responseJSON = response.data;
          const orderList = responseJSON.pending_orders;
          const delorderList = responseJSON.del_orders;
  
          setOders(orderList)
          setDelOrders(delorderList)
  
          console.log(delorderList)
  
        } catch (error) {
          console.error("Error fetching services data:", error.message);
        }
    
        
      };
  
      getOrders();
  }, []);


  useEffect(() => {
    // Add any additional logic that depends on the updated state
  }, [orders, completedOrders]);

  

  const handleButtonClick = (orderNumber) => {
    setSelectedOrder(orderNumber);
    console.log(selectedOrder)
  };





  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/user">Customer Home</Link>
          </li>
          
        </ul>
      </nav>
    
      <div>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order Number: {order._id}  {order.status}
              {order.status === "Pending" && (
                <button onClick={() => handleButtonClick(order._id)}>Write Review</button>
                  )}
              {selectedOrder === order._id && order.location !== undefined && (
                <div className="admin-container">
                        <div className="map-container">
                            <h2>Live Track Map</h2>
                            <MapContainer ref={mapRef} center={[selectedOrder.location.lat,  selectedOrder.location.lng]} zoom={13} style={{ width: '100%', height: '100%' }} >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                    <Marker position={[selectedOrder.location.lat,  selectedOrder.location.lng]}>
                                        {/* <Popup>{marker.label}</Popup> */}
                                    </Marker>
                            </MapContainer>
                        </div>                
               </div>
              )}
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderLocation;
