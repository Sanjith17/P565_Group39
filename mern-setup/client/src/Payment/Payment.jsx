import React, { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Stripe from "stripe";
import "./Payment.css";

const PaymentForm = (props) => {
  const navigate = useNavigate();
  const { userType } = useContext(AuthContext);

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

  const send_payment = props.location?.state?.send_payment || null;

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

  const stripe1 = new Stripe("sk_test_51OHG5UHLO6dUyxTOTw1UzChp5nwVdrkl4SweHkRID3msnLN1KYimq7PXAs4NfXdei6WUp6YYjYYUF2QjREKoqviU00S41dPJB9");

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [successpayment, setSuccessPayment] = useState(true);

  const handleClick = () => {
    const data = send_payment?.data;
    navigate("/login", {
      state: { data },
    });
  };

  const handlePay = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const amountInCents = Math.round(send_payment.amount * 100);
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
      alert("Payment Success")
    }
  };

  return (
    <div className="container_payment">
      {!success ? (
        <form className="payment_form" onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit" onClick={handlePay}>Pay</button>
        </form>
      ) : (
        <div>
          <h2>Done with the payment</h2>
          <h3>Your tracking id is: {send_payment.geneterate_tracking}</h3>
          <h5>
            <a href="/" onClick={handleClick}>
              Click here to go to home screen
            </a>
          </h5>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
