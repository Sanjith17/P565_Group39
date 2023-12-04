import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdminReview.css';

function GetReview() {
  const [trackId, setTrackId] = useState([]);
  const location = useLocation();
  const addressId = location.state.completedAddress;
  console.log(addressId);

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
          if (role !== 'admin') {
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

    const fetchReviews = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/getreviews', {
          addressId,
        });

        const responseJSON = response.data;
        const deliveryList = responseJSON.drivers;

        console.log(deliveryList);
        setTrackId(deliveryList);
      } catch (error) {
        console.error('Error fetching services data:', error.message);
      }
    };

    fetchReviews();
  }, [addressId, navigate]);



  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/admin">Admin Home</Link>
          </li>
          
        </ul>
      </nav>
    <div className="container">
      {trackId.map((trackk, index) => (
        <div key={index} className="review-box">
          <p className="review-details">Tracking ID: {trackk._id}</p>
          <p className="review-details">Driver Email: {trackk.driver}</p>
          <p className="review-details">Review: {trackk.review}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default GetReview;
