import LoginForm from "./Login/Login";
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
import Tracking from "./Tracking/Tracking";
import DeliverySearch from "./DeliverySearch/DeliverySearch";
import AdminHome from "./AdminHome/AdminHome";
import Form1 from "./AdminHome/Form1";
import Form2 from "./AdminHome/Form2";
import CustomerHome from "./CustomerHome/CustomerHome";
import DriverPage from "./DriverPage/DriverPage";
import Shipment from "./Shipment/Shipment"
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
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
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/user" element={<CustomerHome />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/driver" element={<DriverPage/>} />
          <Route path="/" element={<LandingPage />}/>

        </Routes>
        <Kommunicate/>
      </AuthProvider>
    </Router>
  );
}
