const express = require("express");
const router = express.Router();
const User = require("../models/user_data");
const GoogleUser = require("../models/auth_data");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const serviceAccount = require("./adminauth.json");
const generateToken = require("../helpers/generateToken");
const ResetToken = require("../models/reset_token");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const loginController = require("../controllers/login");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const getusercont = require('../controllers/getuser')
const dotenv = require("dotenv")

const loginSecretKey = "fastflex-user-login-secret-key";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://p565-dms-7c33e-default-rtdb.firebaseio.com",
});
const duoClient = new Client({
  clientId: process.env.DUO_CLIENT_ID,
  clientSecret: process.env.DUO_CLIENT_SECRET,
  apiHost: process.env.DUO_HOST,
  redirectUrl: "http://localhost:8000/redirect",
});

router.post("/login", loginController.login);
router.post('/getuser', getusercont.getuser);


router.post('/api/duo-auth', async (req, res) => {

  const qrcodeSecret = speakeasy.generateSecret({
    name: loginSecretKey,
  });



  const mfa_verify = req.body


});

router.post("/signup", async (req, res) => {
  try {
    console.log("soud", req.body);
    const emailName = req.body.email.split("@")[0];
    const randomNum = Math.floor(Math.random() * 10000);
    const username = `${emailName}${randomNum}`;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;

    if (req.body.password != req.body.confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", error: "passwords doesn't match" });
    }
    console.log("--------------------------");

    const user = await User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      username: username,
      password: hashedPassword,
      role: role,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      question1: req.body.question1,
      question2: req.body.question2,
    });
    console.log("user updated in db", user);

    const qrcodeSecret = speakeasy.generateSecret({
      name: loginSecretKey,
    });

    qrcode.toDataURL(qrcodeSecret.otpauth_url, function (err, data) {
      if (err) {
        console.log("Error inside the QR Code generator");
        throw err.message;
      }
      res.json({
        status: "ok",
        body: {
          userName: username,
          qrcodeURL: data
        }
      });
    });
  } catch (error) {
    console.log("error   ", error);
    res.status(400).json({ status: "error", error: "Details not full" });
  }
});

router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const resetToken = await ResetToken.findOne({ token });
  //console.log("resetToken",resetToken)

  if (!resetToken) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
  //const {password} = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //console.log(hashedPassword)

  try {
    // User.findByIdAndUpdate({_id:id},{password})
    const user = await User.findOne({ username: resetToken.userId });
    //console.log(user);
    user.password = hashedPassword;
    await user.save();
    await ResetToken.deleteOne({ token });
    res.send("Password has been changed");
  } catch (error) {
    res.status(500).send("emo ");
  }
});

module.exports = router;

router.post("/forgot", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account with this email found." });
    }
    const token = generateToken();
    //console.log("generate Token", token);
    //console.log("user",user);
    // Save the token in the database
    const resetToken = new ResetToken({
      userId: user.username,
      token: token,
    });
    await resetToken.save();
    let mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fastflexdms@gmail.com",
        pass: "vjck kufl zqfm fung",
      },
    });
    const details = {
      from: "Support@fastflex.com",
      to: email,
      subject: "Password Reset",
      //text:'http://localhost:3000/Reset/${user._id}'
      html: `<p>Hi, This email is being sent in response to a password reset request. Please click <a href ='http://localhost:3000/resetpass?token=${token}/'>here</a> to reset your password.</p>`,
    };
    const check = await mailTransport.sendMail(details);
    res.send({ message: "ok" });
    console.log = ("Status ", check.status);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/security_questions", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account with this email found." });
    }
    const questions = {
      question1: user.question1,
      question2: user.question2,
    };
    console.log(questions);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify-answers", async (req, res) => {
  const { email, answers } = req.body;
  const user = await User.findOne({ email });
  const verifiedAnswers = [user.answer1, user.answer2];
  console.log(user);
  console.log(email, answers);
  if (!user || JSON.stringify(verifiedAnswers) !== JSON.stringify(answers)) {
    return res
      .status(400)
      .json({ message: "Answer is incorrect or email not found" });
  }
  const token = generateToken();

  const resetToken = new ResetToken({
    userId: user.username,
    token: token,
  });
  await resetToken.save();
  return res.status(200).json({ resetToken: resetToken });
});

router.post("/auth", async (req, res) => {
  const { idToken } = req.body;

  try {
    const token = await admin.auth().verifyIdToken(idToken);

    console.log(token);
    exit = await GoogleUser.findOne({ loginid: token.uid });

    console.log("765", exit);

    if (exit) return res.status(200).send({ message: "Already in" });
    else {
      try {
        const gau = await GoogleUser.create({
          name: token.name,
          email: token.email,
          loginid: token.uid,
          role: "user",
        });
        console.log("user updated in db", gau);
        res.json({
          status: "ok",
          // body:{
          //   userName:name
          // }
        });
      } catch (error) {
        console.log("error", error);
        res.status(400).json({ status: "error", error: "Details not full" });
      }
    }
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
