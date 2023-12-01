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

const company_remove_services = async (req, res) => {
  try {
    const company_name = req.body.company_name;
    const type_of_service = req.body.type_of_service;
    const weight_category = req.body.weight_category;

    const deletedService = await User.findOneAndDelete({
      company_name: company_name,
      type_of_service: type_of_service,
      weight_category: weight_category,
      // price: { $exists: true },
    });

    if (deletedService) {
      console.log("Service deleted from db", deletedService);
      res.json({
        status: 'ok',
        body: {
          userName: company_name,
          deletedService: deletedService,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        error: 'Service not found',
      });
    }
  } catch (error) {
    console.log("error   ", error);
    res.status(400).json({ status: 'error', error: "Details not full" });
  }
};

const update_services = async (req, res)  => {
  try {

    const criteria  = {
    company_name: req.body.company_name,
    type_of_service: req.body.type_of_service,
    weight_category: req.body.weight_category
    }
    const updateData = {
      company_name: req.body.new_company_name,
        price: req.body.new_price,
        type_of_service: req.body.new_type_of_service,
        weight_category: req.body.new_weight_category,
    }
    console.log('___________________________________')
    console.log(req.body);
    const result = await User.updateOne(criteria, { $set: updateData });
    console.log(result)
    if (result.modifiedCount > 0) {
      console.log('Record updated successfully');
      res.json({
        status: 'ok',
        body: 'Record updated successfully',       
      });
      // return { status: 'ok', message: 'Record updated successfully' };
    } else {
      console.log('Record not found or no changes made');
      res.json({
        status: 'ok',
        body: 'Record updated successfully',       
      });
    }
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(400).json({ status: 'error', error: "Details not full" });
  }
};

const services_list = async (req, res)  => {
  try {
    const servicesData = await User.find();
    console.log(servicesData)
    // res.json({
    //   status: 'ok',
    //   body : servicesData
    // });
    res.json(servicesData)
  } catch (error) {
    console.error('Error fetching services data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}

const get_price = async (req, res)  => {
  try {
    console.log(req.body.selectedItem)
    const price = await User.findOne({_id:req.body.selectedItem});
    console.log('price  ',price)
    // res.json({
    //   status: 'ok',
    //   body : servicesData
    // });
    // console.log(price.price)
    res.json(price.price)
  } catch (error) {
    console.error('Error fetching services data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}



module.exports ={
    company_services,
    company_remove_services,
    update_services,
    services_list,
    get_price
  }
