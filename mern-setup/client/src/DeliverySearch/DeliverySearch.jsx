import React, { useState, useEffect} from 'react';
import './DeliverySearch.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome (assuming you have it installed)
import FastFlexIcon from './FastFlex.png';


const DeliverySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [criteria, setCriteria] = useState('delicateItems');
    const [selectedService, setSelectedService] = useState(null);

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
        { id: 10, type: 'general', name: 'Premium Delivery', price: '$50', deliveryTime: '10-15 days', weight: '0-50kg' }
    ];

    const handleServiceClick = (serviceId) => {
        if (selectedService === serviceId) {
            setSelectedService(null); // Hide details if the same service is clicked again
        } else {
            setSelectedService(serviceId);
        }
    }

    const openSettings = () => {
        // Simulate opening settings (you would replace this with actual settings logic)
        alert('Opening Settings');
    }

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        },
        header: {
            marginBottom: '20px',
        },
        searchBox: {
            display: 'flex',
            marginBottom: '20px',
        },
        input: {
            flex: '1',
            marginRight: '10px',
            padding: '10px',
            fontSize: '16px',
        },
        select: {
            marginRight: '10px',
            padding: '10px',
            fontSize: '16px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        settingsButton: {
            fontSize: '16px',
            padding: '10px',
            cursor: 'pointer',
        },
        results: {
            borderTop: '1px solid #ccc',
            paddingTop: '20px',
        },
        resultItem: {
            padding: '10px',
            borderBottom: '1px solid #eee',
            cursor: 'pointer',
        },
        serviceInfo: {
            fontSize: '18px',
            color: '#333',
        },
        details: {
            marginTop: '10px',
            background: '#f8f8f8',
            padding: '10px',
            borderRadius: '4px',
        },
        bookButton: {
            marginTop: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
        },
    };
    const MyButton = ({ buttonText, to }) => {
        return (
          <Link to={to} style={{ display: 'inline-block',
          width: '80px', // Square shape
          height: '50px', // Square shape
          lineHeight: '50px', // Center text vertically
          textAlign: 'center', // Center text horizontally
          backgroundColor: 'Yellow', 
          color: 'Black', 
          textDecoration: 'underline', 
          border: 'none', 
          cursor: 'pointer',
          boxShadow: '1px 5px 10px rgba(10,0,0,0.2)'}}>
            {buttonText}
          </Link>
        );
      };




    return (
        <div>
      <nav>
        <ul>
          <div>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px' }}>
          <img src={FastFlexIcon} alt="FastFlex" style={{ marginRight: '-300px', width: '60px', height: '60px' }} />
          <MyButton buttonText="Home" to="/" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>New user?</span>
          <MyButton buttonText="Sign Up" to="/signup" style={{ marginRight: '30px' }} />
          </div>
          </header>
          <hr style={{ border: '1px solid #ccc', marginTop: '10px' }} />
          <div style={{ marginTop: '30px' }}></div>
          </div>
        </ul>
      </nav>
        <div style={styles.container}>
            <h2 style={styles.header}>Search Delivery Services</h2>
            <div style={styles.searchBox}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Search for a service..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select style={styles.select} value={criteria} onChange={e => setCriteria(e.target.value)}>
                    <option value="delicateItems">Delicate Items</option>
                    <option value="heavyMachinery">Heavy Machinery</option>
                    <option value="general">General</option>
                </select>
                <button style={styles.button} onClick={() => setSearchTerm('')}>Reset</button>
                <button style={styles.settingsButton} onClick={openSettings}>
                    {/* Assuming you're using FontAwesome */}
                    {/* <FontAwesomeIcon icon="cog" /> */}
                    Settings
                </button>
            </div>
            <div style={styles.results}>
                {mockData.filter(item => item.type === criteria && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                    <div key={item.id} style={styles.resultItem} onClick={() => handleServiceClick(item.id)}>
                        <div style={styles.serviceInfo}>
                            {item.name}
                            {selectedService === item.id &&
                                <div style={styles.details}>
                                    <p><strong>Price:</strong> {item.price}</p>
                                    <p><strong>Delivery Time:</strong> {item.deliveryTime}</p>
                                    <button style={styles.bookButton}>Book Service</button>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <hr style={{ border: '1px solid #ccc', marginTop: '640px' }} />
          <div style={{ marginTop: '3px' }}></div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '70px 0', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>This Site</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Tracking</Link></li>
          <li><Link to="/aboutus" style={{ color: 'white', textDecoration: 'none' }}>About FastFlex</Link></li>
        </ul>
      </div>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>Connect With Us</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="https://www.facebook.com" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a></li>
          <li>Contact Us: +1(626) fas-flex </li>
          {/* ... other list items */}
        </ul>
        </div>
      </footer>
    </div>
    </div>
  

    
    //     <div className="search-container">
    //         <h2>Search Delivery Services</h2>
    //         <div className="search-box">
    //             <input
    //                 type="text"
    //                 placeholder="Search for a service..."
    //                 value={searchTerm}
    //                 onChange={e => setSearchTerm(e.target.value)}
    //             />
    //             <select value={criteria} onChange={e => setCriteria(e.target.value)}>
    //                 <option value="delicateItems">Delicate Items</option>
    //                 <option value="heavyMachinery">Heavy Machinery</option>
    //                 <option value="general">General</option>
    //             </select>
    //             <button onClick={() => setSearchTerm('')}>Reset</button>
    //             <button onClick={openSettings} className="settings-button">
    //                 <FontAwesomeIcon icon="cog" /> {/* Use the FontAwesome settings icon here */}
    //             </button>
    //         </div>
    //         <div className="results">
    //             {mockData.filter(item => item.type === criteria && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
    //                 <div key={item.id} className="result-item" onClick={() => handleServiceClick(item.id)}>
    //                     <div className="service-info">
    //                         {item.name}
    //                         {selectedService === item.id &&
    //                             <div className="details">
    //                                 <p><strong>Price:</strong> {item.price}</p>
    //                                 <p><strong>Delivery Time:</strong> {item.deliveryTime}</p>
    //                                 <button>Book Service</button>
    //                             </div>
    //                         }
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
    );
};

export default DeliverySearch;
