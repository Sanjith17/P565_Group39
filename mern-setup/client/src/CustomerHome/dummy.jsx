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

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const sourcePlace = sourceRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();

    //alert(sourcePlace);
    const streetAddress = sourcePlace.formatted_address;
    const streetAddress1 = streetAddress.split(",")[0].trim();
    setsourcestreetaddress(streetAddress1);
    const sourceCity = sourcePlace.address_components.find((component) =>
      component.types.includes("locality")
    )?.long_name;
    setSourceCityship(sourceCity);
    const sourceState = sourcePlace.address_components.find((component) =>
      component.types.includes("administrative_area_level_1")
    )?.short_name;
    setSourceStateship(sourceState);
    const sourceZip = sourcePlace.address_components.find((component) =>
      component.types.includes("postal_code")
    )?.long_name;
    setSourceZipship(sourceZip);
    const sourceCountry = sourcePlace.address_components.find((component) =>
      component.types.includes("country")
    )?.short_name;
    setSourceCountryship(sourceCountry);

    const destinationstreet = destinationPlace.formatted_address;
    const destinationstreet1 = destinationstreet.split(",")[0].trim();
    setdestinationstreetaddress(destinationstreet1);
    const destinationCity = destinationPlace.address_components.find(
      (component) => component.types.includes("locality")
    )?.long_name;
    setdestinationCityship(destinationCity);
    const destinationState = destinationPlace.address_components.find(
      (component) => component.types.includes("administrative_area_level_1")
    )?.short_name;
    setdestinationStateship(destinationState);
    const destinationZip = destinationPlace.address_components.find(
      (component) => component.types.includes("postal_code")
    )?.long_name;
    setdestinationZipship(destinationZip);
    const destinationCountry = destinationPlace.address_components.find(
      (component) => component.types.includes("country")
    )?.short_name;
    setdestinationCountryship(destinationCountry);

    if (!sourcePlace || !destinationPlace) {
      alert("Please select source and destination");
      return;
    }
    const results = await directionsService.route(
      {
        origin: sourcePlace.geometry.location,
        destination: destinationPlace.geometry.location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          setDirectionsResponse(response);
          setDistance(response.routes[0].legs[0].distance.text);
          // setDuration(response.routes[0].legs[0].duration.text);
          // alert(distance);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  useEffect(() => {
    if (buttonclicked) {
      const createShipment = async () => {
        const response = await fetch("https://api.goshippo.com/shipments/", {
          method: "POST",
          headers: {
            Authorization:
              "ShippoToken shippo_test_f1e2c504159dd862a4515dcf87bab4aa8ba5b050",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            object_purpose: "PURCHASE",
            address_from: {
              street1: sourcestreetaddress,
              city: sourceCityship,
              state: sourceStateship,
              zip: sourceZipship,
              country: sourceCountryship,
            },
            address_to: {
              street1: destinationstreetaddress,
              city: destinationCityship,
              state: destinationStateship,
              zip: destinationZipship,
              country: destinationCountryship,
            },
            parcels: [
              {
                length: "10",
                width: "8",
                height: "6",
                distance_unit: "in",
                serviceType: serviceType,
                weight: packageWeight,
                mass_unit: "lb",
              },
            ],
            async: false,
          }),
        });
        console.log();
        const shipmentData = await response.json();
        if (!response.ok) {
          console.error(`Error creating shipment: ${shipmentData.detail}`);
          return;
        }

        const shipmentId = shipmentData.object_id;

        const getRates = async () => {
          const currencyCode = "USD"; // Replace with the desired currency code

          const response = await fetch(
            `https://api.goshippo.com/shipments/${shipmentId}/rates/${currencyCode}/`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "ShippoToken shippo_test_f1e2c504159dd862a4515dcf87bab4aa8ba5b050",
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            console.log(data.results);
            setRates(data.results);
          } else {
            console.error(`Error fetching rates: ${data.detail}`);
          }
        };
        getRates();
      };
      createShipment();
    }
    setbuttonclicked(false);
  }, [
    buttonclicked,
    sourceCityship,
    sourcestreetaddress,
    sourceStateship,
    sourceZipship,
    sourceCountryship,
    destinationCityship,
    destinationZipship,
    destinationStateship,
    destinationstreetaddress,
    serviceType,
    packageWeight
  ]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";
  const handlestate = () => {
    // MapComponent();
    calculateRoute();
    setbuttonclicked(true);
  };

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
              
              
            </form> 
          </div>
        </div>
    </div>
  );
};

export default Price;