import React, { useState } from 'react';
import axios from 'axios';
import {useSearchParams } from 'react-router-dom';

function Reset() {
  
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  console.log()
  const [searchParams, setSearchParams] = useSearchParams();
  const x = searchParams.get("token")
  const doReset = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_BACKEND_URL)
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+`/reset/${x}`, {
        password,
        confirmpassword
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error with new password', error.response.data);
    }
  };

  return (
    <div >
      <form onSubmit={doReset}>
        <div className='form-group'>
          <label>Make New Password:</label>
          <input type="password" value={password} placeholder = "new password" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" value={confirmpassword} placeholder = "confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default Reset;