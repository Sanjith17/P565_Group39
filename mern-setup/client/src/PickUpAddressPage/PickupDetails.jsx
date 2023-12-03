import React from 'react';
import './PickupDetails.css';

const mockPickups = [
    { customerName: 'John Doe', address: '123 Main St, Cityville', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P123', pickupDate: '2023-12-03' },
    { customerName: 'Jane Smith', address: '456 Oak Ave, Townland', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P124', pickupDate: '2023-12-04' },
    { customerName: 'Alice Johnson', address: '789 Pine Rd, Villageville',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P125', pickupDate: '2023-12-05' },
    { customerName: 'Bob Brown', address: '321 Maple St, Citytown',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P126', pickupDate: '2023-12-06' },
    { customerName: 'Carol White', address: '654 Elm St, Townville',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P127', pickupDate: '2023-12-07' },
    { customerName: 'Franck White', address: '677 Elm St, Townville', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P9897', pickupDate: '2023-12-07' },
  ];
const PickupDetails = ({ parcelId }) => {
    const details = mockPickups.find(p => p.parcelId === "P123");

    if (!details) {
        return <p>Parcel details not found.</p>;
    }

    return (
        <div className="pickup-details">
            <h2>Parcel Details</h2>
            <p><strong>Customer:</strong> {details.customerName}</p>
            <p><strong>Pickup Address:</strong> {details.address}</p>
            <p><strong>Delivery Address:</strong> {details.deliveryAddress}</p>
            <p><strong>Parcel ID:</strong> {details.parcelId}</p>
            <p><strong>Pickup Date:</strong> {details.pickupDate}</p>
        </div>
    );
};

export default PickupDetails;
