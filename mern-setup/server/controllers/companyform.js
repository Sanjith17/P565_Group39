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

const company_form = async (req, res) => {
    try {
      console.log("soud",req.body)
      const emailName = req.body.email.split('@')[0];
      const randomNum = Math.floor(Math.random() * 10000);
      const username = `${emailName}${randomNum}`;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const role = req.body.role

      if (req.body.password != req.body.confirmPassword){
        return res.status(400).json({status:"error", error:"passwords doesn't match"})
      }
      console.log("--------------------------")

      const user = await User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        username: username,
        password: hashedPassword,
        role: role,
        answer1:req.body.answer1,
        answer2:req.body.answer2,
        question1:req.body.question1,
        question2:req.body.question2,
      })
      console.log("user updated in db", user)
      res.json({
        status :'ok',
        body:{
          userName:username
        }
    })
    } catch (error) {
      console.log("error   ", error)
        res.status(400).json({status: 'error', error: "Details not full"})
    }
  
}
module.exports ={
    company_form
  }
