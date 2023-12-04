import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"; // Assuming you want a cog icon
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function MyPage() {
  const [userId, setUserId] = useState(null);
  const [mockData, setData] = useState([]);
  const [orders, setOders] = useState([]);
  const [delorders, setDelOrders] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem("loginToken");

      // Check if the token exists
      if (token) {
        console.log("got the token");
        // Set up the headers for the API request with the JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        try {
          // Make the API request with the token in the headers
          const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/getuser",
            {
              method: "POST", // or 'POST', 'PUT', etc.
              headers: headers,
            }
          );
          const responseJSON = await response.json();

          const role = responseJSON.userDetails.role;
          // Handle the API response data here
          if (role !== "user") {
            navigate("/login" );
          }
          setUserId(responseJSON.userDetails.userId);

        } catch (error) {
          // Handle any errors that occur during te API request
          console.error(error);
        }
      } else {
        // Handle the case where the token is not found in local storage
        console.error("JWT token not found in local storage");
      }
    };

    fetchData();

    const fetchServices = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/services"
        );

        const responseJSON = response.data;
        console.log(responseJSON);

        setData(responseJSON);
      } catch (error) {
        console.error("Error fetching services data:", error.message);
      }
    };

    fetchServices();

    const getOrders = async() => {
      const token = localStorage.getItem('loginToken');
  
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/getcustomerorders",{jwt:token}
        );
        const responseJSON = response.data;
        const orderList = responseJSON.pending_orders;
        const delorderList = responseJSON.del_orders;

        setOders(orderList)
        setDelOrders(delorderList)

        console.log(delorders)

      } catch (error) {
        console.error("Error fetching services data:", error.message);
      }
  
      
    };

    getOrders();
  }, []); 

  useEffect(() => {
    // Add any additional logic that depends on the updated state
  }, [orders, delorders]);

  useEffect(() => {
    // Add any additional logic that depends on the updated state
  }, [orders]);

  const [searchTerm, setSearchTerm] = useState("");
  const [criteria, setCriteria] = useState("delicateItems");
  const [size, setSize] = useState("Light");
  const [selectedService, setSelectedService] = useState(null);
  console.log(mockData);


  const handleServiceClick = (serviceId) => {
    if (selectedService === serviceId) {
      setSelectedService(null); 
    } else {
      setSelectedService(serviceId);
    }
  };

  const handleBookServiceClick = (item) => {
    navigate("/booking", { state: { selectedItem: item } });
  };

  const handleButtonReview = (item) => {
    navigate("/user/prevorders", { state: { deliveredOrders: delorders } });
  };

  return (
    <div>
      <div>
        {userId ? <p>User ID: {userId}</p> : <p>Loading user details...</p>}
      </div>
      <div>
      <ul>
      <li>
          <button onClick={() => handleButtonReview()}>Previous Orders</button>
          </li>
      </ul>
      </div>
      <div className="search-container">
        <h2>Search Delivery Services</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          >
            <option value="heavy_machinery">Heavy Machinery</option>
            <option value="light">Light</option>
            <option value="delicate">Delicate</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
          </select>

          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Light">Light Item</option>
            <option value="Heavy">Heavy Item</option>
            <option value="Moderate">Mediuim Item</option>
          </select>

          <button onClick={() => setSearchTerm("")}>Reset</button>
        </div>
        <div className="results">
          {mockData
            .filter(
              (item) =>
                item.type_of_service === criteria &&
                item.weight_category === size &&
                item.company_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <div
                key={item._id}
                className="result-item"
                onClick={() => handleServiceClick(item._id)}
              >
                <div className="service-info">
                  {item.company_name}
                  {selectedService === item._id && (
                    <div className="details">
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>

                      <button onClick={() => handleBookServiceClick(item._id)}>
                        Book Service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
