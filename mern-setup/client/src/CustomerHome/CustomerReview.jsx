import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import './AdminReview.css';

function SetReview() {
  const [trackId, setTrackId] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOders] = useState([]);
  const [completedOrders, setDelOrders] = useState([]);
  const [value, setValue] = useState(0);

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
  };


  const handleReviewSubmit = async (e, orderId) => {
    e.preventDefault();
    
    console.log(`Review for Order ${orderId}: ${e.target.review.value}`);
    const orderreview = e.target.review.value

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/setreview",{orderId:orderId, orderreview:orderreview}
      );
      const responseJSON = response.data;
      navigate('/user')


    } catch (error) {
      console.error("Error fetching services data:", error.message);
    }
     

    
    
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
    {/* <div className="container">
      {trackId.map((trackk, index) => (
        <div key={index} className="review-box">
          <p className="review-details">Tracking ID: {trackk._id}</p>
          <p className="review-details">Driver Email: {trackk.driver}</p>
          <p className="review-details">Review: {trackk.review}</p>
        </div>
      ))}
      </div> */}


        <ul>
        {completedOrders.map((order) => (
          <li key={order._id}>
            Order Number: {order._id}
            {!order.review && (
        <button onClick={() => handleButtonClick(order._id)}>Write Review</button>
                )}
            {selectedOrder === order._id  && (
              <div>
                <form onSubmit={(e) => handleReviewSubmit(e, order._id)}>
      {/* <input type="number" name="rating" min="1" max="5" required placeholder="Rating (1-5)" /> */}
      <textarea name="review" required placeholder="Write a review about the owner"></textarea>
      <button type="submit">Submit Review</button>
    </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SetReview;
