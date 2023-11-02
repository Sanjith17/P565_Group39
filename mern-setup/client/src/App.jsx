
// import { useEffect, useState } from 'react';
// import './App.css';
// //import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// import { Route, Routes } from 'react-router-dom';

import LoginForm from "./Login/Login"
import SignupForm from "./SignUp/Signup"
import LandingPage from "./Landing Page/Landing"
// import IndexPage from "./IndexPage"

// function App() {
//   return (
    
//       <Route path="/" element={<LandingPage />}>
//         <Route path= "/login" element={<LoginForm />}/>
//         </Route>



    
//     // <div className="App">
//     //   <h1> FastFlex Delivery</h1>
//     //   <href> Login</href>
//     //   <LoginForm />
//     //   <SignupForm />
//     // </div>
//   );
// }

// export default App;


import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import ResetPass from "./ResetPass";
import Transition from "./Pages/transition";

import ForgotPassword from "./ForgotPassword/Forgot";
import Dashboard from "./Dashboard/Dashboard";
import Tracking from "./Tracking/Tracking";
import DeliverySearch from "./DeliverySearch/DeliverySearch";
import AdminHome from "./AdminHome/AdminHome";
export default function App() {
  return (
    <Router>
      <div>
        <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/deliverysearch" element={<DeliverySearch />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/" element={<LandingPage />}/>

        </Routes>
        </div>
      </div>
    </Router>
  )
}
