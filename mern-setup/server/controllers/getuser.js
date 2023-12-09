const express = require("express");
const router = express.Router();
const User = require("../models/user_data");
const Payment = require("../models/payment");
const GoogleUser = require("../models/auth_data");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const serviceAccount = require("../routes/adminauth.json");
const generateToken = require("../helpers/generateToken");
const ResetToken = require("../models/reset_token");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const loginSecretKey = "fastflex-user-login-secret-key";

const getuser = async (req, res) => {
  const token = req.header("Authorization"); // Extract the token from the 'Authorization' header

  if (!token) {
    return res.status(400).json({ message: "Token is missing." });
  }

  // Remove the 'Bearer ' prefix from the token if it's included (common in JWT tokens)
  const tokenWithoutPrefix = token.replace("Bearer ", "");

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(tokenWithoutPrefix, loginSecretKey);

    // Extract the user ID from the decoded token (you can customize the token structure as needed)
    const userId = decoded.username;
    console.log(userId);
    let user = {};
    user = await User.findOne({ email: userId });
    // You can fetch user details from a database or any other data source here
    const userDetails = {
      userId: userId,
      role: user.role,
      // Add more user details here
    };

    // Send the user details back to the frontend
    // res.json(userDetails);

    res.send({ userDetails });
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

const get_addresses = async (req, res) => {
  try {
    // Find payments with pending status
    const unassignedOrders = await Payment.find({ status: 'Pending' });

    const deliveredOrders = await Payment.find({ status: 'Delivered' });

    const pendingOrders = await Payment.find({ status: { $in: ['Assigned', 'transit'] } });

    // Extract _id from each payment
    const addresses = unassignedOrders.map(payment => payment._id);
    console.log(addresses)

    const unassignedAddresses = unassignedOrders.map(payment => payment._id);
    const deliveredAddresses = deliveredOrders.map(payment => payment._id);
    const pendingAddresses = pendingOrders.map(payment => payment._id);

    res.json({ unassignedAddresses, deliveredAddresses, pendingAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const get_drivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' });
    res.json({drivers})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

const set_drivers = async (req, res) => {
  try {
    const deliveryId = await Payment.find({ _id: req.body.addressId });
    console.log(deliveryId)
    const criteria  = {
      _id: req.body.addressId
    }
    const updateData = {
      driver: req.body.driverEmail,
      status: "Assigned"
    }
    const result = await Payment.updateOne(criteria, { $set: updateData });
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
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

const set_driver_location = async (req, res) => {
  try {

    const decoded = jwt.verify(req.body.jwt, loginSecretKey);

    // Extract the user ID from the decoded token (you can customize the token structure as needed)
    const userMail = decoded.username;
    const criteria  = {
      email: userMail
    }
    const updateData = {
      location: JSON.stringify(req.body.location),
    }
    const criteria1  = {
      driver: userMail,
      status: "Pending"
    }
    const result = await User.updateOne(criteria, { $set: updateData });
    const result1 = await Payment.updateOne(criteria1, { $set: updateData });
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
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


const get_reviews = async (req, res) => {
  console.log(req.body.addressId)
  
    // Extract the user ID from the decoded token (you can customize the token structure as needed)
    
    try {
      const drivers = await Payment.find({ _id: { $in: req.body.addressId }});
      console.log(drivers)
      res.json({drivers})
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const get_customer_orders = async (req, res) => {

  const decoded = jwt.verify(req.body.jwt, loginSecretKey);
  // console.log(req.body.addressId)
  const userMail = decoded.username;
  console.log(userMail)
    
    try {
      const del_orders = await Payment.find({ username: userMail, status:'Delivered'});
      const pending_orders = await Payment.find({ username: userMail, status:{ $ne: 'Delivered' }});
      
      //console.log(orders)
      res.json({del_orders,pending_orders})
       
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const set_review = async (req, res) => {

  

    
    try {

      const criteria  = {
        _id: req.body.orderId
      }
      const updateData = {
        review: req.body.orderreview,
      }
      const result = await Payment.updateOne(criteria, { $set: updateData });
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
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const trackorder = async (req, res) => {
  console.log(req.body.addressId)
  
    // Extract the user ID from the decoded token (you can customize the token structure as needed)
    
    try {
      const orderDetails = await Payment.find({ _id: { $in: req.body.trackingId }});
      console.log(orderDetails)
      res.json({orderDetails})
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const get_customer_add = async (req, res) => {
  console.log(req.body.addressId)
  
    // Extract the user ID from the decoded token (you can customize the token structure as needed)
    
    try {
      const orderDetails = await Payment.find({ _id: { $ne: req.body.trackingId }});
      console.log(orderDetails)
      res.json({orderDetails})
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const get_driver_add = async (req, res) => {
  const decoded = jwt.verify(req.body.jwt, loginSecretKey);

  const userMail = decoded.username;
  console.log(userMail)
    
    try {
      const orders = await Payment.find({ driver: userMail, status:{ $ne: 'Delivered' }});
      // const pending_orders = await Payment.find({ username: userMail, status:{ $ne: 'Delivered' }});
      
      //console.log(orders)
      res.json({orders})
       
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const set_pickup = async (req, res) => {

  try {

    const criteria  = {
      _id: req.body.trackId
    }
    const updateData = {
      status: "Pending",
    }
    const result = await Payment.updateOne(criteria, { $set: updateData });
    console.log(result)
    if (result.matchedCount > 0) {
      console.log('Record updated successfully');

      res.json({
        status: 'ok',
        body: 'Record updated successfully',       
      });
      // return { status: 'ok', message: 'Record updated successfully' };
    } else {
      console.log('Record not found or no changes made');
      res.status(500).json({ error: 'Record Not Found' });
    }
    
    
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

const set_delivered = async (req, res) => {

  try {

    const criteria  = {
      _id: req.body.trackId
    }
    const updateData = {
      status: "Delivered",
    }

    const maill = await Payment.findOne({_id : req.body.trackId});

    const result = await Payment.updateOne(criteria, { $set: updateData });

    console.log(maill.username)

    let mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fastflexdms@gmail.com",
        pass: "vjck kufl zqfm fung",
      },
    });
    const details = {
      from: "Support@fastflex.com",
      to: maill.username,
      subject: "Delivery Completed",
      html: `<p>Hi, This email is being sent to let you know that your delivery with tracking Id ${maill._id} has been Delivered`,
    };
    const check = await mailTransport.sendMail(details);
    console.log("Status ", check.response);


    if (result.modifiedCount > 0) {
      console.log('Record updated successfully');

      res.json({
        status: 'ok',
        body: 'Record updated successfully',       
      });
      // return { status: 'ok', message: 'Record updated successfully' };
    } else {
      console.log('Record not found or no changes made');
      res.status(500).json({ error: 'Record Not Found' });
    }
    
    
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


module.exports = {
  getuser,
  get_addresses,
  get_drivers,
  set_drivers,
  set_driver_location,
  get_reviews,
  get_customer_orders,
  set_review,
  trackorder,
  get_customer_add,
  get_driver_add,
  set_pickup,
  set_delivered

};
