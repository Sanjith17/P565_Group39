import React from 'react';
import './DriverPage.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class DriverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 40.712776, lng: -74.005974 },
      pickUpAddress: '123 PickUp St, City',
      dropAddress: '456 DropOff Ave, City',
      pastLocations: ['123 PickUp St, City'], // Starting with the pickup location
      currentLocationName: 'Current Location', // Placeholder name for the current location
    };
  }

  onMapClick = async (e) => {
    const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    const locationName = await this.getPlaceName(newLocation); // Simulating a geocoding API call
    console.log(newLocation)
    this.setState({ currentLocation: newLocation, currentLocationName: locationName });
  }

  // Placeholder function to simulate getting a place name from coordinates
  getPlaceName = async (location) => {
    // In a real application, this would be an API call to a geocoding service
    // Here, it returns a mock place name
    return `Mock Place Name for (${location.lat.toFixed(3)}, ${location.lng.toFixed(3)})`;
  }

  handleLocationUpdate = () => {
    this.setState(state => ({
      pastLocations: [...state.pastLocations, state.currentLocationName]
    }));
    // console.log(this.state.pastLocations)
    // In a real application, also update the location to the backend server
  }

  render() {
    const mapStyles = { height: "300px", width: "100%" };

    return (
      <div className="driver-page">
        <div className="details-box">
          <h2>Pick Up:</h2>
          <p>{this.state.pickUpAddress}</p>
          <h2>Drop Off:</h2>
          <p>{this.state.dropAddress}</p>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={this.state.currentLocation}
            onClick={this.onMapClick}
          >
            <Marker position={this.state.currentLocation} />
          </GoogleMap>
        </LoadScript>

        <div className="location-update-box">
          <p>Update Location: {this.state.currentLocationName}</p>
          <button onClick={this.handleLocationUpdate}>Update Location</button>
        </div>

        <div className="history-box">
          <h3>Past Locations:</h3>
          <ul>
            {this.state.pastLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DriverPage;
