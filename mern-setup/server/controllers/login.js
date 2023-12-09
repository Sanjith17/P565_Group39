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



const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};



const login = async (req, res) => {

  const randomString = generateRandomString(6);
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
      
    //   res.send({message: 'Logged in successfully', user_det: 
    //     user.role, 

      
    //   jwt_token: token,
    //   string: randomString



    // },);

    let mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fastflexdms@gmail.com",
        pass: "vjck kufl zqfm fung",
      },
    });
    const details = {
      from: "Support@fastflex.com",
      to: user.email,
      subject: "Login Authentication",
      html: `<p>Hi, This email is being sent in response to a password reset request. ${randomString}  Please click  to reset your password.</p>`,
    };
    const check = await mailTransport.sendMail(details);
    res.send({message: 'Logged in successfully', user_det: 
        user.role, 

      
      jwt_token: token,
      string: randomString



    },);
  } catch (error) {
    res.status(500).send(error.message);
  }
  }

module.exports ={
  login
}