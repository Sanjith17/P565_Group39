import React, { useState } from 'react';
import './ParcelServicePage.css';

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
  { id: 10, type: 'general', name: 'Express Delivery', price: '$50', deliveryTime: '1-2 days', weight: '0-50kg' }
];

const ParcelServicePage = () => {
  const [parcelSize, setParcelSize] = useState('');
  const [serviceSelected, setServiceSelected] = useState(false);

  const getServiceBySize = (size) => {
    switch (size) {
      case 'small':
        return 'general';
      case 'medium':
        return 'delicateItems';
      case 'large':
      case 'very large':
        return 'heavyMachinery';
      default:
        return '';
    }
  };

  const serviceType = getServiceBySize(parcelSize);
  const filteredServices = mockData.filter(service => service.type === serviceType);

  const handleSizeSelection = (size) => {
    setParcelSize(size);
    setServiceSelected(false);
  };

  const confirmService = () => {
    setServiceSelected(true);
  };

  return (
    <div className="parcel-service-container">
      <h1>Select Parcel Size</h1>
      <div className="parcel-size-selector">
        {['small', 'medium', 'large', 'very large'].map(size => (
          <button key={size} onClick={() => handleSizeSelection(size)} className={`size-button ${parcelSize === size ? 'selected' : ''}`}>
            {size}
          </button>
        ))}
      </div>

      {parcelSize && !serviceSelected && (
        <div className="service-recommendations">
          <h2>Recommended Services for {parcelSize} Parcels</h2>
          <div className="services-list">
            {filteredServices.map(service => (
              <div key={service.id} className="service-card">
                <h3>{service.name}</h3>
                <p>Price: {service.price}</p>
                <p>Delivery Time: {service.deliveryTime}</p>
                <p>Weight Limit: {service.weight}</p>
                <button onClick={confirmService}>Select & Confirm</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {serviceSelected && (
        <div className="confirmation">
          <h2>Service Confirmed!</h2>
          <p>Your {parcelSize} parcel will be picked up as per the selected service.</p>
          {/* Implement the redirection or link to the confirmation page */}
          <button onClick={() => {}}>Confirm Pickup</button>
        </div>
      )}
    </div>
  );
};

export default ParcelServicePage;
