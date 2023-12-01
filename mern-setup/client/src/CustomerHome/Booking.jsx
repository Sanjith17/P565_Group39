import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function BookingPage() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Ensure location.state is not null before accessing selectedItem
    if (location.state && location.state.selectedItem) {
      setSelectedItem(location.state.selectedItem);
    }
  }, [location.state]);

  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const handleSelectSource = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected Source:', { address, latLng });
    setSourceAddress(address);
  };

  const handleSelectDestination = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected Destination:', { address, latLng });
    setDestinationAddress(address);
  };

  const handleBookingSubmit = () => {
    // Perform the booking logic with sourceAddress, destinationAddress, and selectedItem
    // You can send this data to the backend or perform any other necessary actions
    console.log('Booking submitted:', { sourceAddress, destinationAddress, selectedItem });
  };

  return (
    <div>
      <h2>Booking Page</h2>
      {selectedItem && (
        <div>
          <p>Selected Item: {selectedItem.company_name}</p>
          {/* Display other details as needed */}
        </div>
      )}

      <div>
        <label htmlFor="sourceAddress">Source Address:</label>
        <PlacesAutocomplete
          value={sourceAddress}
          onChange={(value) => setSourceAddress(value)}
          onSelect={handleSelectSource}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Enter source address...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>

      <div>
        <label htmlFor="destinationAddress">Destination Address:</label>
        <PlacesAutocomplete
          value={destinationAddress}
          onChange={(value) => setDestinationAddress(value)}
          onSelect={handleSelectDestination}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Enter destination address...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>

      <button onClick={handleBookingSubmit}>Submit Booking</button>
    </div>
  );
}

export default BookingPage;
