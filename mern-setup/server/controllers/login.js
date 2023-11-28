const express = require('express');
const router = express.Router();
const User = require('../models/user_data');
const GoogleUser = require('../models/auth_data');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin')
const serviceAccount = require('../routes/adminauth.json')
const generateToken = require('../helpers/generateToken')
const ResetToken = require('../models/reset_token')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const loginSecretKey = 'fastflex-user-login-secret-key'; 


const login = async (req, res) => {
    try {
      console.log("sdf",req.body)
      let user = {}
      if(req.body.username.includes('@')){
        user = await User.findOne({ email: req.body.username });
      }else{
        user = await User.findOne({ username: req.body.username });
      }
      
      if (!user) return res.status(400).send({message: 'Log in failed'});
      
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send({message: 'Log in failed'});
      
      const token = jwt.sign({ username: user.email }, loginSecretKey);
      
      res.send({message: 'Logged in successfully', user_det: 
        user.role, // Include the user's ID // Include other user details as needed
        // Add more user properties here
      
      jwt_token: token
    },);
  } catch (error) {
    res.status(500).send(error.message);
  }
  }

module.exports ={
  login
}