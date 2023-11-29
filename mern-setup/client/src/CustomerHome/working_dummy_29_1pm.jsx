import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DistanceCalculator = () => {
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  // const price = React.useRef(null);
  // const finalPrice = React.useRef(null);
  const navigate = useNavigate(); 

  // const originRef = useRef(null);
  // const destinationRef = useRef(null);
  const [places,setPlaces] = useState({"origin":null,"destination":null})

  const location = useLocation();
  const selectedItem = location.state.selectedItem;



  const calculatePrice = async () => {
    // setPrice(0)
    //console.log(price)

    await calculateDistance();
    // console.log(distance)

    try {
        // Make the API request with the token in the headers
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/getprice',{selectedItem}); 
        const responseJSON = await response.data;
        console.log(responseJSON)
        calPrice(responseJSON);


        
        // setPrice(responseJSON);
        // price.current = responseJSON
        // console.log(price.current)
        // await calPrice()
        console.log(price)
      } catch (error) {
        // Handle any errors that occur during te API request
        console.error(error);
      }

}

    // useEffect(() => {
    //     console.log("Price updated:", price);
    //   }, [price]);
    

    const calPrice = (flt) => {
        // console.log(price.current, distance)
        // const flt = parseFloat(price.current)
        // const flt = price
        const calculationResult = 2 + 0.01 * flt * distance;
        console.log(calculationResult)
        setPrice(calculationResult)
        // finalPrice.current = calculationResult
        // console.log(calculationResult)


    }

    const gotoPayment = (item) => {
        // Assuming you want to send the item details to the next page
        // You can use the navigate function to move to the new page
        navigate('/booking', { state: { selectedItem: item } });
      };
  
  const calculateDistance = async () => {
    const originPlace = places["origin"]?.getPlace();
    const destinationPlace = places["destination"]?.getPlace();

    if (!originPlace || !destinationPlace) {
      setError('Please select valid origin and destination places.');
      return;
    }

    const originLatLng = originPlace.geometry.location;
    const destinationLatLng = destinationPlace.geometry.location;

    const directionsService = new window.google.maps.DirectionsService();

    await directionsService.route(
      {
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          const totalDistance = response.routes[0].legs[0].distance.text;
          const numericDistance = parseFloat(totalDistance.match(/\d+/)[0]);
          setDistance(numericDistance);
          console.log(numericDistance);
          setError(null);
        } else {
          setDistance(null);
          setError(`Error calculating distance: ${status}`);
        }
      }
    );
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs" 
      libraries={['places']}
    >
        <div>
      <h2>Booking Page</h2>
      {selectedItem && (
        <div>
          <p>Selected Item: {selectedItem}</p>
          
        </div>
      )}
    </div>
      <div>
        <div>
          <label>Origin:</label>
          <Autocomplete onLoad={(autocomplete) => (setPlaces(prev=>{return {...prev,"origin":autocomplete}}))}>
            <input type="text" placeholder="Enter origin address" />
          </Autocomplete>
        </div>
        <div>
          <label>Destination:</label>
          <Autocomplete onLoad={(autocomplete) => (setPlaces(prev=>{return {...prev,"destination":autocomplete}}))}>
            <input type="text" placeholder="Enter destination address" />
          </Autocomplete>
        </div>
        <button onClick={()=>calculatePrice()}>Calculate Price</button>
        {/* {distance && <p>Final Price: {finalPrice.current}$</p>} */}
        {distance && <p>Final Price: {price}$</p>}
        {distance && <p><button onClick={gotoPayment}>Make Payment</button></p>}
        {error && <p style={{ color: 'red' }}>Wrond addresses</p>}
      </div>
    </LoadScript>
  );
};

export default DistanceCalculator;
