import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../Login/LoginCss.css'; // Import the CSS file
import FastFlexIcon from './FastFlex.png';

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState(''); // "email" or "question"
  const [securityQuestions, setSecurityQuestions] = useState([]); // array of questions
  const [answers, setAnswers] = useState([]); // array of answers
  const [fetchingQuestions, setFetchingQuestions] = useState(false);



 
  const fetchSecurityQuestions = async () => {
    try {
      const response = await axios.post('http://localhost:8080/security_questions', { email });
  
      const questionsObject = response.data;
      //console.log('Backend response:',questionsObject);
    if (questionsObject) {
        const questionsArray = Object.values(questionsObject);
        setSecurityQuestions(questionsArray);
      } else {
        console.error('Questions are missing or undefined in the response.');
      }
    } catch (error) {
      console.error('Error fetching security questions:', error);
    }
  };
  




  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/verify-answers', {
        email, answers
      });
      console.log(response.data);
      if(response?.data?.resetToken?.token){
        navigate(`/resetpass?token=${response.data.resetToken.token}/`);
      }
    } catch (error) {
      console.error('Error verifying the answers:', error);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Forgot', { email });
      console.log(response.data);
    } catch (error) {
      console.error('Not a valid email or username:', error);
    }
  };
  const styles = {
    helpContainer: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    },
    header: {
      color: '#333',
      marginBottom: '20px'
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px'
    },
    formBox: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '300px', // adjust width as needed
      margin: '0 10px'
    },
    inputField: {
      display: 'block',
      width: '97%',
      padding: '9x',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      backgroundColor: 'yellow',
      color: '#333',
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px'
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
      <div style={styles.helpContainer}>
      <h1 style={styles.header}>How Can We Help?</h1>
      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <h2>Password Reset</h2>
          <p>Forgot your password? Let's get you a new one. Enter your email address and username to get started.</p>
          
          <div>
              <input 
                type="email" 
                placeholder="Please type your email here" 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '5px', fontSize: '1rem' }}
              />
          </div>
          <button type="button" style={styles.button}>Send Reset Link via Email</button>
          
          <button type="submit"> Send Email</button>
        </div>
        <div style={styles.formBox}>
          <h2>Security Questions</h2>
          {
            securityQuestions && (
              <div>
                <label>Email:</label>
                <input 
                  type="email" 
                  placeholder="Enter email to get security questions" 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={{ width: '100%', padding: '5px', fontSize: '1rem' }}
                />
                {!fetchingQuestions ? (
                  <button 
                    type="button" 
                    style={styles.button}
                    onClick={() => { 
                      setFetchingQuestions(true); 
                      fetchSecurityQuestions(); 
                    }}
                  >
                    Fetch Questions {'>'}
                  </button>
                  
                ) : (
                  securityQuestions.map((question, index) => (
                    <div key={index}>
                      <label>{question}</label>
                      <input 
                        type="text" 
                        placeholder="Your answer" 
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[index] = e.target.value;
                          setAnswers(newAnswers);
                        }} 
                      />
                    </div>
                  ))
                )}
              </div>
            )
          }
          <button type="submit">{method === 'email' ? 'Send Email' : 'Submit Answers'}</button>
        </div>
      </div>
      <Link to="/login" style={styles.backLink}>Back to Log In</Link>
    </div>
      {/* <form onSubmit={method === 'email' ? handleEmailSubmit : handleAnswerSubmit}>
        {method === 'email' && (
          <div>
            <label>Password Recovery:</label>
            <input type="email" placeholder="Please type your email here" onChange={(e) => setEmail(e.target.value)} />
          </div>
        )}
        
        {securityQuestions && method === 'question' && (
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter email to get security questions" onChange={(e) => setEmail(e.target.value)} />
            {!fetchingQuestions ? (
              <button type="button" onClick={() => { setFetchingQuestions(true); fetchSecurityQuestions(); }}>Fetch Questions</button>
            ) : (
              securityQuestions.map((question, index) => (
                <div key={index}>
                  <label>{question}</label>
                  <input type="text" placeholder="Your answer" onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }} />
                </div>
              ))
            )}
          </div>
        )}

        {method ? (
          <button type="submit">{method === 'email' ? 'Send Email' : 'Submit Answers'}</button>
        ) : (
          <>
            <button type="button" onClick={() => setMethod('email')}>Send Reset Link via Email</button>
            <button type="button" onClick={() => setMethod('question')}>Answer Security Questions</button>
          </>
        )}
      </form> */}
      <hr style={{ border: '1px solid #ccc', marginTop: '640px' }} />
          <div style={{ marginTop: '3px' }}></div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '70px 0', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3 style={{ color: 'white', textDecoration: 'none' }}>This Site</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Tracking</Link></li>
          <li><Link to="/deliverysearch" style={{ color: 'white', textDecoration: 'none' }}>Shipping</Link></li>
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
  );
}

export default Forgot;