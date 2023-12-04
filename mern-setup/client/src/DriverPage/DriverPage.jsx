import React, { useState, useEffect } from 'react';
import './DriverPage.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link, useNavigate, Outlet, useLocation} from 'react-router-dom';
import axios from "axios";  

const DriverPage = () => {
  const navigate = useNavigate(); 
  const [addresses, setAddress] = useState([])
  const [pickupIndex, setPickupIndex] = useState(-1)
  const [state, setState] = useState({
    currentLocation: { lat: 40.712776, lng: -74.005974 },
    pickUpAddress: '123 PickUp St, City',
    dropAddress: '456 DropOff Ave, City',
    pastLocations: ['123 PickUp St, City'],
    currentLocationName: 'Current Location',
  });

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
          if (role != 'driver'){
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


      const getOrders = async() => {
        const token = localStorage.getItem('loginToken');
    
        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/getdriveraddress",{jwt:token}
          );
          const responseJSON = response.data;
          const orderList = responseJSON.orders
          setAddress(orderList)
          console.log(addresses)
  
        } catch (error) {
          console.error("Error fetching services data:", error.message);
        }
    
        
      };
  
      getOrders();
    }, []); 

    useEffect(() => {
      console.log(addresses)
    }, [addresses]);

  const onMapClick = async (e) => {
    const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    const locationName = await getPlaceName(newLocation);
    setState({ ...state, currentLocation: newLocation, currentLocationName: locationName });
  };

  const getPlaceName = async (location) => {
    return `Mock Place Name for (${location.lat.toFixed(3)}, ${location.lng.toFixed(3)})`;
  };

  const handlePickUp = async (index, trackId) => {
    
    
        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/setpickup",{trackId:trackId}
          );
          const responseJSON = response.data;
          const orderList = responseJSON.orders
          // setAddress(orderList)
          console.log(addresses)
  
        } catch (error) {
          console.error("Error fetching services data:", error.message);
        }

    setPickupIndex(0);
  };

  const handleDeliver = async (index,trackId) => {

    console.log(addresses)

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/setdelivered",{trackId:trackId}
      );
      const responseJSON = response.data;
      const orderList = responseJSON.orders
      setAddress(orderList)
      console.log(addresses)

    } catch (error) {
      console.error("Error fetching services data:", error.message);
    }
    
    const updatedvar = addresses.slice(1)
    setAddress(updatedvar)
    setPickupIndex(-1);

  };

  const handleLocationUpdate = async() => {
    setState((prevState) => ({
      ...prevState,
      pastLocations: [...prevState.pastLocations, prevState.currentLocationName],
    }));
    const token = localStorage.getItem('loginToken');

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/setdriverlocation",{location: state.currentLocation,jwt:token}
      );
    } catch (error) {
      console.error("Error fetching services data:", error.message);
    }

    console.log(state.currentLocation);
  };

  const mapStyles = { height: '300px', width: '100%' };

  return (
    <div className="driver-page">
      
      <div>
        <h2>Pickup Addresses</h2>
        {addresses && addresses.map((address, index) => (
          <div key={index}>
            {index != pickupIndex && (
              <>
                <p>{address.sourceaddress}</p>
                <button onClick={() => handlePickUp(index, address._id)} disabled={index !== 0}>
                Pick Up
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div>
        <h2>Delivery Addresses</h2>
        {addresses.length >0 && addresses.map((address, index) => (
          <div key={index}>
            { pickupIndex  !== -1 && index < 1 && (
              <>
                <p>{address.destinationaddress}</p>
                <button onClick={() => handleDeliver(index,address._id)}>Deliver</button>
              </>
            )}
          </div>
        ))}
      </div>
      

      <LoadScript googleMapsApiKey="AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={state.currentLocation}
          onClick={onMapClick}
        >
          <Marker position={state.currentLocation} />
        </GoogleMap>
      </LoadScript>

      <div className="location-update-box">
        <p>Update Location: {state.currentLocationName}</p>
        <button onClick={handleLocationUpdate}>Update Location</button>
      </div>

      <div className="history-box">
        <h3>Past Locations:</h3>
        <ul>
          {state.pastLocations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriverPage;
