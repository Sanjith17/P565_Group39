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

module.exports = {
  getuser,
  get_addresses,
  get_drivers,
  set_drivers
};
