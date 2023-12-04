const express = require("express");
const router = express.Router();
const User = require("../models/user_data");
const GoogleUser = require("../models/auth_data");
const Payment = require("../models/payment");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const serviceAccount = require("./adminauth.json");
const generateToken = require("../helpers/generateToken");
const ResetToken = require("../models/reset_token");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const loginController = require("../controllers/login");
const getusercont = require("../controllers/getuser");
const form2 = require("../controllers/companyservices");
const form1 = require("../controllers/companyform");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const dotenv = require("dotenv");
const { Client } = require("@duosecurity/duo_universal");
const payment = require("../models/payment");

const loginSecretKey = "fastflex-user-login-secret-key";
dotenv.config({ path: "../" });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://p565-dms-7c33e-default-rtdb.firebaseio.com",
});

const duoClient = new Client({
  clientId: process.env.DUO_CLIENT_ID,
  clientSecret: process.env.DUO_CLIENT_SECRET,
  apiHost: process.env.DUO_HOST,
  redirectUrl: "http://localhost:8080/redirect",
});



router.post("/payment", async (req, res) => {
  console.log(req.body);

  const token = req.header("Authorization"); // Extract the token from the 'Authorization' header

  if (!token) {
    return res.status(400).json({ message: "Token is missing." });
  }

  // Remove the 'Bearer ' prefix from the token if it's included (common in JWT tokens)
  const tokenWithoutPrefix = token.replace("Bearer ", "");
  const decoded = jwt.verify(tokenWithoutPrefix, loginSecretKey);
  const userId = decoded.username;
  console.log(req.body.sourceaddress);

  try{
  const payment = await Payment.create({
    username: userId,
    sourceaddress: req.body.sourceAddress,
    destinationaddress: req.body.destinationAddress,
    driver: "Unassigned",
    price: req.body.price,
    status: "Pending",
    service_id: req.body.service_id,
    location: "Source",
    review: "",
    // payment_id: req.body.payment_id,
    // tracking_id: await generateTrackingId(
    //   req.body.service_id,
    //   req.body.payment_id
    // ),
  });

  console.log("The payment stored in db", payment);

  // return res.json({ status: ok, trackingId: tracking_id });
  return res.json({ status: ok });
}
catch (error) {
  console.log("error   ", error);
  res.status(400).json({ status: "error", error: "Details not full" });
}
});

router.post("/login", loginController.login);

router.post("/getuser", getusercont.getuser);
router.post("/service_delete", form2.company_remove_services);
router.post("/service_update", form2.update_services);
router.post("/services", form2.services_list);
router.post("/getprice", form2.get_price);
router.post("/getaddresses", getusercont.get_addresses);
router.post("/getdrivers", getusercont.get_drivers);
router.post("/getreviews", getusercont.get_reviews);
router.post("/getcustomerorders", getusercont.get_customer_orders);
router.post("/setdrivers", getusercont.set_drivers);
router.post("/setreview", getusercont.set_review);
router.post("/setdriverlocation", getusercont.set_driver_location);
router.post("/trackorder", getusercont.trackorder);
router.post("/getdriveraddress", getusercont.get_driver_add);
router.post("/setpickup", getusercont.set_pickup);
router.post("/setdelivered", getusercont.set_delivered);


router.post("/admin_form2", form2.company_services);


// router.post("/duo-auth", async (req, res) => {
//   const username = req.body.username;
//   console.log("username coming for duo from client", username);

//   if (!username) {
//     return res.status(400).json({ message: "Missing username" });
//   }

//   await duoClient.healthCheck();
//   const state = duoClient.generateState();
//   req.session.duo = { state, username };
//   console.log(req.session);
//   const authUrl = duoClient.createAuthUrl(username, state);
//   await duoClient.healthCheck();
//   const state = duoClient.generateState();
//   req.session.duo = { state, username };
//   console.log(req.session);
//   const authUrl = duoClient.createAuthUrl(username, state);

//   res.json({ authUrl });
// });
//   res.json({ authUrl });
// });

router.get("/redirect", async (req, res) => {
  console.log("duo callback");
  res.send(
    "Authenticated Successfully, Please close this tab and go back to the app"
  );
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
      location: ''
    });
    console.log("user updated in db", user);
  } catch (error) {
    console.log("error   ", error);
    res.status(400).json({ status: "error", error: "Details not full" });
  }
});

router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const resetToken = await ResetToken.findOne({ token });

  if (!resetToken) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.findOne({ username: resetToken.userId });
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

    if (exit) {
      return res.status(200).send({ message: "Already in" });
    } else {
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
