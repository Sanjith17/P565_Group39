
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LoginForm from "./Login"
import SignupForm from "./Signup"
import { getTest } from "./functions/test";

function App() {
  return (
    <div className="App">
      <LoginForm />
      
      

    </div>
  );
}

export default App;
