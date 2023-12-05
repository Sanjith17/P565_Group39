import React, { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Stripe from "stripe";
import "./Payment.css";
import axios from "axios";

const PaymentForm = (props) => {
  const navigate = useNavigate();
  const { userType } = useContext(AuthContext);
  const location = useLocation();
  // const places = location.state.places;
  const selectedItem = location.state.selectedItem;
  const sourceAddress = location.state.origin;
  const destinationAddress = location.state.destination;
  const price = location.state.price;
  const [username, setUserName] = useState('');
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const [successpayment, setSuccessPayment] = useState(true);
  console.log(selectedItem, price, sourceAddress, destinationAddress);

  // Styling buttons based on user login status
  useEffect(() => {
    const loginButton = document.getElementById("Login-button");
    const signupButton = document.getElementById("Signup-button");
    const logoutButton = document.getElementById("logout-button");
    const aboutus = document.getElementById("aboutus");
    const contactus = document.getElementById("contactus");
    const shipwithus = document.getElementById("shipwithus");
    const letsconnect = document.getElementById("letsconnect");

    // if (!userType) {
    //   // Redirect to login if user is not logged in
    //   navigate("/login");
    //   return;
    // }

    if (userType) {
      // Hide buttons for logged-in user
      loginButton.style.display = "none";
      signupButton.style.display = "none";
      aboutus.style.display = "none";
      contactus.style.display = "none";
      shipwithus.style.display = "none";
      letsconnect.style.display = "none";
      logoutButton.style.display = "block";
    }
  }, [userType, navigate]);

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        marginTop: "2rem",
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const stripe1 = new Stripe(
    "sk_test_51OHG5UHLO6dUyxTOTw1UzChp5nwVdrkl4SweHkRID3msnLN1KYimq7PXAs4NfXdei6WUp6YYjYYUF2QjREKoqviU00S41dPJB9"
  );



  const handleClick = () => {
    navigate("/user");
  };


  // const paymentIdGenerator = async (service_id) => {
  //   const chars = "0123456789";
  //   let payment_id = "";
  //   for (let i = 0; i < 10; i++) {
  //     const randomIndex = Math.floor(Math.random() * chars.length);
  //     payment_id += chars[randomIndex];
  //   }
  //   if (payment_id !== service_id) return trackingId;
  //   else return paymentIdGenerator(service_id);
  // }

  // const generatePaymentId = async () => {
  //   return await paymentIdGenerator(selectedItem);
  // };

  const handlePay = async () => {
    const token = localStorage.getItem("loginToken");
    const u_name = ''
    if (token) {
      console.log("got the token");
      // Set up the headers for the API request with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // try {
      //   // Make the API request with the token in the headers
      //   const response = await fetch(
      //     process.env.REACT_APP_BACKEND_URL + "/getuser",
      //     {
      //       method: "POST", // or 'POST', 'PUT', etc.
      //       headers: headers,
      //     }
      //   );
      //   const responseJSON = await response.json();
      //   // setUserName(responseJSON.userDetails.userId);
      //   console.log(responseJSON.userDetails.userId)
      //   const u_namee = responseJSON.userDetails.userId
      //   console.log(u_namee)
      //   setUserName(prev => ({...prev, username:u_namee}));
      //   console.log(username);
      // } catch (err) {
      //   console.error(err);
      // }
    

    // const pay_id =  paymentIdGenerator(selectedItem);
    // console.log('pay ',pay_id);
    const data = {
      sourceAddress: sourceAddress,
      destinationAddress: destinationAddress,
      price: price,
      service_id: selectedItem,
    };
      

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/payment",
        {
          method: "POST",
          headers: headers,
          body:  JSON.stringify(data)
        }
      )
        const responseJSON = await response.json();
      if (response.ok) { 
        setSuccessPayment(true);
      // setTrackingId(responseJSON.trackingId) 
    }
    }
    catch (error) {
      console.error(error)
    }
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const amountInCents = Math.round(price * 100);
        const payment = await stripe1.paymentIntents.create({
          amount: amountInCents,
          currency: "USD",
          description: "FastFlex payment",
          payment_method: paymentMethod.id,
          confirm: true,
        });
      } catch (error) {
        console.log("Error", error);
        setSuccessPayment(false);
      }
    } else {
      console.log(error.message);
      setSuccessPayment(false);
    }

    if (successpayment) {
      setSuccess(true);
      alert("Payment Success");
    }
  };

  return (
    <div className="body_payment">

    <div className="container_payment">
      {!success ? (
        <form className="payment_form" onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit" onClick={handlePay}>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>Done with the payment</h2>
          {/* <h3>Your tracking id is: { trackingId }</h3> */}
          <h5>
            <a href="/user" onClick={handleClick}>
              Click here to go to home screen
            </a>
          </h5>
        </div>
      )}
    </div>
    </div>
  );
};

export default PaymentForm;
