const express = require('express');
const router = express.Router();
const User = require('../models/admin_form2');
const GoogleUser = require('../models/auth_data');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin')
const serviceAccount = require('../routes/adminauth.json')
const generateToken = require('../helpers/generateToken')
const ResetToken = require('../models/reset_token')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const loginSecretKey = 'fastflex-user-login-secret-key'; 

const company_services = async (req, res) => {
    try {
      console.log("soud",req.body)
      const company_name = req.body.company_name;
      const price = req.body.price;
      const type_of_service = req.body.type_of_service;
      const weight_category  = req.body.weight_category;

      
      console.log("--------------------------")

      const user = await User.create({
        company_name: req.body.company_name,
        price: req.body.price,
        type_of_service: req.body.type_of_service,
        weight_category: req.body.weight_category,
      })
      console.log("user updated in db", user)
      res.json({
        status :'ok',
        body:{
          userName:company_name
        }
    })
    } catch (error) {
      console.log("error   ", error)
        res.status(400).json({status: 'error', error: "Details not full"})
    }
  
}
module.exports ={
    company_services
  }
