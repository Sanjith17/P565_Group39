// import "./calculate.css";
// import "./Shipment/Shipment.css"
import { useNavigate } from "react-router-dom";

//import shippo from "shippo";

import React, { useRef, useState, useEffect } from "react";
import {
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";


const Price = () => {
  const navigate = useNavigate();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  // const [weight, setWeight] = useState("");
  //const [msg, setMsg] = useState("");
  const [rates, setRates] = useState([]);
  const [buttonclicked, setbuttonclicked] = useState(false);
  const [sourceCityship, setSourceCityship] = useState("");
  const [sourceStateship, setSourceStateship] = useState("");
  const [sourceZipship, setSourceZipship] = useState("");
  const [sourceCountryship, setSourceCountryship] = useState("");
  const [destinationCityship, setdestinationCityship] = useState("");
  const [destinationCountryship, setdestinationCountryship] = useState("");
  const [destinationZipship, setdestinationZipship] = useState("");
  const [destinationStateship, setdestinationStateship] = useState("");
  const [sourcestreetaddress, setsourcestreetaddress] = useState("");
  const [destinationstreetaddress, setdestinationstreetaddress] = useState("");

  const [serviceType, setPackageSize] = useState("basic");
  const [packageWeight, setPackageWeight] = useState("Light");
  const handleSelectButtonClick = () => {
    // Navigate to the login page
    navigate("/login");
  };

  // Event handler for the onChange event of the select element
  const handlePackageSizeChange = (e) => {
    setPackageSize(e.target.value); // Update the state with the selected package size
  };

  const handlePackageWeightChange = (e) => {
    setPackageWeight(e.target.value); // Update the state with the selected package size
  };

  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs",
    libraries: ["places"],
  });



  const handleSubmit23 = (e) => {
    e.preventDefault();

    const sourcePlace = sourceRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();
    

    // Check if places are selected
    if (sourcePlace && destinationPlace) {
      const requestData = {
        sourceAddress: sourcePlace.formatted_address,
        destinationAddress: destinationPlace.formatted_address,
        // Add any additional data you want to send
      };
      console.log(requestData.sourceAddress)
      // Send the data to your backend API using fetch or axios
    //   fetch("YOUR_BACKEND_API_ENDPOINT", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(requestData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // Handle the response from the backend
    //       console.log("Backend response:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error sending data to backend:", error);
    //     });
    }
    
  };
  

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
      <div className="b_container_customer">
        <div className="username_display"></div>
        <div className="homeTitle">Package Cost</div>
        <div className="content">
          <div className="form">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="Source" className="shippmentlabel">Source</label>
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        sourceRef.current = autocomplete;
                      }}>
                      <input
                        type="text"
                        name="email"
                        placeholder="Source place"
                      />
                    </Autocomplete>
                </div>
                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      destinationRef.current = autocomplete;
                    }}>
                    <input
                      className="input-login"
                      type="text"
                      name="destination"
                      placeholder="Destination Place"
                    />
                  </Autocomplete>
               </div>
              </div>
              
              <button onClick={ handleSubmit23}>Submit</button>
            </form> 
          </div>
        </div>
    </div>
  );
};

export default Price;