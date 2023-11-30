const express = require("express");
const router = express.Router();
const User = require("../models/user_data");
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
module.exports = {
  getuser,
};
