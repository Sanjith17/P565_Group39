import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css'

const DistanceCalculator = () => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  // const price = React.useRef(null);
  // const finalPrice = React.useRef(null);
  const navigate = useNavigate();

  // const originRef = useRef(null);
  // const destinationRef = useRef(null);
  const [places, setPlaces] = useState({ "origin": null, "originApt": null, "destinationApt": null, "destination": null })


  const location = useLocation();
  const selectedItem = location.state.selectedItem;


  const calculateDistance = async () => {
    return new Promise((resolve, reject) => {
      const originPlace = places["origin"]?.getPlace();
      const destinationPlace = places["destination"]?.getPlace();

      if (!originPlace || !destinationPlace) {
        reject('Invalid origin or destination places');
        return;
      }

      const originLatLng = originPlace.geometry.location;
      const destinationLatLng = destinationPlace.geometry.location;

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: originLatLng,
          destination: destinationLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            const totalDistance = response.routes[0].legs[0].distance.text;
            const numericMatch = totalDistance.match(/[\d,.]+/);

            if (numericMatch && numericMatch.length > 0) {
              // Extract only the numeric part and remove commas
              const numericPart = numericMatch[0].replace(/,/g, '');

              // Convert the numeric part to a floating-point number
              const numericDistance = parseFloat(numericPart);

              if (!isNaN(numericDistance)) {
                console.log('Numeric Distance:', numericDistance);
                setError(null);
                resolve(numericDistance);
              } else {
                setError('Invalid numeric distance');
                reject('Invalid numeric distance');
              }
            } else {
              setError('No numeric part found in total distance');
              reject('No numeric part found in total distance');
            }
          } else {
            setError(`Error calculating distance: ${status}`);
            reject(`Error calculating distance: ${status}`);
          }
        }
      );
    });
  };

  const calculatePrice = async () => {

    const numericDistance = await calculateDistance();

    console.log(numericDistance)
    try {
      // Make the API request with the token in the headers
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/getprice', { selectedItem });
      const responseJSON = await response.data;
      console.log(responseJSON)
      // calPrice(responseJSON,distance);

      const calculationResult = 2 + 0.01 * responseJSON * numericDistance;
      console.log(calculationResult)
      setPrice(calculationResult)


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




  const gotoPayment = () => {
    // Assuming you want to send the item details to the next page
    // You can use the navigate function to move to the new page
    console.log('came to payment function')

    const originAddress = places["origin"]?.getPlace()?.formatted_address;
    console.log("Origin Address:", originAddress + places["originApt"]);

    const destinationAddress = places["destination"]?.getPlace()?.formatted_address;
    console.log("Origin Address:", destinationAddress + places["destinationApt"]);

    navigate('/payment', { state: { selectedItem: selectedItem, price: price, origin: originAddress, destination: destinationAddress } });
    // navigate('/payment', { state: { places: places,selectedItem:selectedItem,price:price } });

  };



  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs"
      libraries={['places']}
    >
      <div className='booking-container'>
        <h2 className='booking-header'>Booking Page</h2>
        {selectedItem && (
          <div className='booking-paragraph'>
            <p>Selected Item: {selectedItem}</p>
          </div>
        )}
      </div>

      <div className='booking-container'>
        <div>
          <label className='booking-label'>Origin:</label>
          <Autocomplete onLoad={(autocomplete) => (setPlaces(prev => { return { ...prev, "origin": autocomplete } }))}>
            <input className='booking-input' type="text" placeholder="Enter origin address" />
          </Autocomplete>
          <label className='booking-label'>Pickup-Apt/Suite Number<input
            className='booking-input'
            type="text"
            value={places['originApt']}
            onChange={(e) => setPlaces((prev) => { return { ...prev, "originApt": e.target.value } })}
            placeholder='Apt/Suite No'
          /></label>
        </div>

        <div>
          <label className='booking-label'>Destination:</label>
          <Autocomplete onLoad={(autocomplete) => (setPlaces(prev => { return { ...prev, "destination": autocomplete } }))}>
            <input className='booking-input' type="text" placeholder="Enter destination address" />
          </Autocomplete>
          <label className='booking-label'>Drop of - Apt/Suite Number<input
            className='booking-input'
            type="text"
            value={places["destinationApt"]}
            onChange={(e) => setPlaces((prev) => { return { ...prev, "destinationApt": e.target.value } })}
            placeholder='Apt/Suite No'
          /></label>
        </div>

        <button className='booking-button' onClick={() => calculatePrice()}>Calculate Price</button>
        {price && <p className='booking-paragraph'>Final Price: {price}$</p>}
        {price && <p className='booking-paragraph'><button className='booking-button' onClick={gotoPayment}>Make Payment</button></p>}
        {error && <p className='error'>Wrong addresses</p>}
      </div>
    </LoadScript>

  );
};

export default DistanceCalculator;
