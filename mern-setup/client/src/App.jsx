import LoginForm from "./Login/Login";
import Validation from "./Login/Validation";
import SignupForm from "./SignUp/Signup";
import LandingPage from "./Landing Page/Landing";
import { AuthProvider } from "./Auth/AuthProvider";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPass from "./ResetPass";
import Transition from "./Pages/transition";

import Recommendation from "./RecommendedService/ParcelServicePage";
import ForgotPassword from "./ForgotPassword/Forgot";
import Kommunicate from "./Chat/Chat";
import Dashboard from "./Dashboard/Dashboard";
import Tracking from "./Tracking/TrackingPage";
import DeliverySearch from "./DeliverySearch/DeliverySearch";
import AdminHome from "./AdminHome/AdminHome";
import Form1 from "./AdminHome/Form1";
import Form2 from "./AdminHome/Form2";
import ServiceDelete from "./AdminHome/ServiceDelete";
import AssignDriver from "./AdminHome/AssignDriver";
import ServiceUpdate from "./AdminHome/ServiceUpdate";
import DriverLocation from "./AdminHome/DriverLocation";
import AdminReview from "./AdminHome/AdminReview";
import CustomerHome from "./CustomerHome/CustomerHome";
import CustomerReview from "./CustomerHome/CustomerReview";
import OrderLocation from "./CustomerHome/OrderLocation";
import BookingPage from "./CustomerHome/Booking2";
import DriverPage from "./DriverPage/DriverPage";
import Shipment from "./Shipment/Shipment";

import StripeContainer from "./Payment/StripeContainer";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login/validation" element={<Validation />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/deliverysearch" element={<DeliverySearch />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/admin/form1" element={<Form1 />} />
          <Route path="/admin/form2" element={<Form2 />} />
          <Route path="/admin/delete" element={<ServiceDelete />} />
          <Route path="/admin/update" element={<ServiceUpdate />} />
          <Route path="/admin/assign" element={<AssignDriver />} />
          <Route path="/admin/drivers" element={<DriverLocation />} />
          <Route path="/admin/review" element={<AdminReview />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/user/prevorders" element={<CustomerReview />} />
          <Route path="/user/maps" element={<OrderLocation />} />
          <Route path="/user" element={<CustomerHome />} />
          <Route path="/Shipping" element={<Shipment />} />
          {/* <Route path="/Location" element = {<Location />} /> */}
          {/* <Route path="/Rating" element = {<Rating />} /> */}
          <Route path="/payment" element={<StripeContainer />} />
          <Route path="/driver" element={<DriverPage/>} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/" element={<LandingPage />}/>

        </Routes>
        <Kommunicate/>
      </AuthProvider>
    </Router>
  );
}
