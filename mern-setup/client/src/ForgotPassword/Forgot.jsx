import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Login/LoginCss.css'; // Import the CSS file

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

  return (
    <div>
      <form onSubmit={method === 'email' ? handleEmailSubmit : handleAnswerSubmit}>
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
      </form>
    </div>
  );
}

export default Forgot;