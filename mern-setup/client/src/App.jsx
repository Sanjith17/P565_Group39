
// import { useEffect, useState } from 'react';
// import './App.css';
// //import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// import { Route, Routes } from 'react-router-dom';

import LoginForm from "./Login"
import SignupForm from "./Signup"
import { getTest } from "./functions/test";
import LandingPage from "./Landing"
import IndexPage from "./IndexPage"

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
import ForgotPassword from "./FogotPassword";

export default function App() {
  return (
    <Router>
      <div>
        <div>
          FastFlex Delivery
        </div>
        <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/" element={<LandingPage />}/>
        </Routes>
        </div>
      </div>
    </Router>
  )
}
