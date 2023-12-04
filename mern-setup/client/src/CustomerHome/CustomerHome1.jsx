import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Assuming you want a cog icon
import { Link, useNavigate } from 'react-router-dom';

function MyPage() {
  const [userId, setUserId] = useState(null);
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
          if (role != 'user'){
            navigate('/'+role)
          }
          setUserId(responseJSON.userDetails.userId);
          
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
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  const [searchTerm, setSearchTerm] = useState('');
  const [criteria, setCriteria] = useState('delicateItems');
  const [selectedService, setSelectedService] = useState(null);

  const mockData = [
    { id: 1, type: 'delicateItems', name: 'Normal Delicate', price: '$20', deliveryTime: '1-2 days', weight: '0-5kg' },
    { id: 2, type: 'heavyMachinery', name: 'Heavy Logistics', price: '$100', deliveryTime: '3-5 days', weight: '10-100kg' },
    { id: 3, type: 'delicateItems', name: 'Pro Delicate', price: '$35', deliveryTime: '1 day', weight: '0-3kg' },
    { id: 4, type: 'heavyMachinery', name: 'Oversized Heavy Machine', price: '$300', deliveryTime: '7-14 days', weight: '100-500kg' },
    { id: 5, type: 'general', name: 'Basic Delivery', price: '$10', deliveryTime: '3-5 days', weight: '0-10kg' },
    { id: 6, type: 'general', name: 'Premium Delivery', price: '$25', deliveryTime: '2-3 days', weight: '0-10kg' },
    { id: 7, type: 'delicateItems', name: 'Delicate Quick', price: '$45', deliveryTime: 'Same day', weight: '0-2kg' },
    { id: 8, type: 'heavyMachinery', name: 'Heavy Standard', price: '$150', deliveryTime: '5-7 days', weight: '20-150kg' },
    { id: 9, type: 'general', name: 'Economy Delivery', price: '$5', deliveryTime: '5-10 days', weight: '0-5kg' },
    { id: 10, type: 'general', name: 'Premium Delivery', price: '$50', deliveryTime: '10-15 days', weight: '0-50kg' }
  ];

  const handleServiceClick = (serviceId) => {
    if (selectedService === serviceId) {
      setSelectedService(null); // Hide details if the same service is clicked again
    } else {
      setSelectedService(serviceId);
    }
  }

  const openSettings = () => {
    // Simulate opening settings (you would replace this with actual settings logic)
    alert('Opening Settings');
  }

  return (
    <div>
      <div>
        {userId ? (
          <p>User ID: {userId}</p>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      <div className="search-container">
        <h2>Search Delivery Services</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
            <option value="delicateItems">Delicate Items</option>
            <option value="heavyMachinery">Heavy Machinery</option>
            <option value="general">General</option>
          </select>

          
          <button onClick={() => setSearchTerm('')}>Reset</button>
          {/* <button onClick={openSettings} className="settings-button">
            <FontAwesomeIcon icon={faCog} /> {}
          </button> */}
        </div>
        <div className="results">
          {mockData
            .filter(
              (item) =>
                item.type === criteria &&
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className="result-item"
                onClick={() => handleServiceClick(item.id)}
              >
                <div className="service-info">
                  {item.name}
                  {selectedService === item.id && (
                    <div className="details">
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                      <p>
                        <strong>Delivery Time:</strong> {item.deliveryTime}
                      </p>
                      <button>Book Service</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
