import React ,{ useState }from 'react';
import { Button } from 'react-bootstrap';
import './PickupList.css';
// Mock Data
const mockPickups = [
  { customerName: 'John Doe', address: '123 Main St, Cityville', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P123', pickupDate: '2023-12-03' },
  { customerName: 'Jane Smith', address: '456 Oak Ave, Townland', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P124', pickupDate: '2023-12-04' },
  { customerName: 'Alice Johnson', address: '789 Pine Rd, Villageville',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P125', pickupDate: '2023-12-05' },
  { customerName: 'Bob Brown', address: '321 Maple St, Citytown',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P126', pickupDate: '2023-12-06' },
  { customerName: 'Carol White', address: '654 Elm St, Townville',deliveryAddress: '789 Park Ave, Cityville', parcelId: 'P127', pickupDate: '2023-12-07' },
  { customerName: 'Franck White', address: '677 Elm St, Townville', deliveryAddress: '789 Park Ave, Cityville',parcelId: 'P9897', pickupDate: '2023-12-07' },
];

const PickupList = () => {
    const [pickups, setPickups] = useState(mockPickups.map(p => ({ ...p, confirmed: false })));
  
    /*
    const handleConfirmPickup = (parcelId) => {
      // Update the confirmed state for the specific parcel
      const updatedPickups = pickups.map(pickup => 
        pickup.parcelId === parcelId ? { ...pickup, confirmed: true } : pickup
      );
      setPickups(updatedPickups);
  
      // Display parcel details (can be a modal, new page, etc.)
      // For simplicity, we'll just log it to the console
      const pickupDetails = pickups.find(p => p.parcelId === parcelId);
      console.log('Parcel Details:', pickupDetails);
    };
  */
    
    const handleConfirmPickup = (parcelId) => {
        const updatedPickups = pickups.map(pickup => 
            pickup.parcelId === parcelId ? { ...pickup, confirmed: true } : pickup
        );
        setPickups(updatedPickups);

        if (updatedPickups.find(p => p.parcelId === parcelId).confirmed) {
            window.location.href = `/details/${parcelId}`;
        }
    };

    return (
      <div className="pickup-list">
        {pickups.map((pickup, index) => (
          <div key={index} className="pickup-item">
            <p><strong>Customer:</strong> {pickup.customerName}</p>
            <p><strong>Pickup Address:</strong> {pickup.address}</p>
            {pickup.confirmed && <p><strong>Delivery Address:</strong> {pickup.deliveryAddress}</p>}
            <p><strong>Parcel ID:</strong> {pickup.parcelId}</p>
            <p><strong>Pickup Date:</strong> {pickup.pickupDate}</p>
            <Button 
              variant="primary" 
              onClick={() => handleConfirmPickup(pickup.parcelId)}
            >
              {pickup.confirmed ? 'View Details' : 'Confirm Pickup'}
            </Button>
          </div>
        ))}
      </div>
    );
  };
  
  export default PickupList;