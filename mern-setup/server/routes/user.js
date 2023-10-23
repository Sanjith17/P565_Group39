const express = require('express');
const router = express.Router();
const User = require('../models/user_data');
const GoogleUser = require('../models/auth_data');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin')
const serviceAccount = require('./adminauth.json')
const generateToken = require('../helpers/generateToken')
const ResetToken = require('../models/reset_token')
const nodemailer = require('nodemailer')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://p565-dms-7c33e-default-rtdb.firebaseio.com"
})

router.post('/login', async (req, res) => {
  try {
    console.log("sdf",req.body)
    let user;
    if  (req.body.username.includes('@')){
      user = await User.findOne({ email: req.body.username });
    }else{
      user = await User.findOne({ username: req.body.username });
    }
    
    console.log('765',user)
    

    if (!user) return res.status(400).send({message: 'Log in failed'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({message: 'Log in failed'});

    res.send({message: 'Logged in successfully'});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/signup', async (req, res) => {
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
        role: role
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
  });


  router.post('/reset/:token', async (req, res) => {
    const {token} = req.params
    const resetToken = await ResetToken.findOne({ token });
    //console.log("resetToken",resetToken)
    
    if (!resetToken) {
        return res.status(400).json({ message: "Invalid or expired token." });}
    //const {password} = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //console.log(hashedPassword)

    try{
     // User.findByIdAndUpdate({_id:id},{password})
     const user = await User.findOne({username:resetToken.userId});
     //console.log(user);
    user.password = hashedPassword;
    await user.save();
    await ResetToken.deleteOne({token});
      res.send('Password has been changed');
    }
    catch (error) {
      res.status(500).send(error.message)
    }
  });
  
module.exports = router;


  router.post('/forgot', async (req, res) => {
    try {
      const email = req.body.email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account with this email found." });
  }
  const token = generateToken();
  //console.log("generate Token", token);
//console.log("user",user);
    // Save the token in the database
    const resetToken = new ResetToken({
        userId: user.username,
        token: token
    });
    await resetToken.save();
    let mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"fastflexdms@gmail.com",
            pass:"vjck kufl zqfm fung"
        }
    });
    const details = {
        from:"Support@fastflex.com",
        to:email,
        subject:"Password Reset",
        //text:'http://localhost:3000/Reset/${user._id}'
        html: `<p>Hi, This email is being sent in response to a password reset request. Please click <a href ='http://localhost:3000/resetpass?token=${token}/'>here</a> to reset your password.</p>`
    }
    const check = await mailTransport.sendMail(details);
    res.send({message: 'ok'});
    console.log =("Status ",check.status);
    } catch (error) {
      res.status(500).send(error.message);
    }
});






  router.post('/auth', async (req, res) => {
    const { idToken } = req.body;

    try {
      const token = await admin.auth().verifyIdToken(idToken);

      console.log(token);
      exit = await GoogleUser.findOne({ loginid: token.uid });
        
        
      console.log('765',exit)
        
    
      if (exit) return res.status(200).send({message: 'Already in'});
      else{
        try{
        const gau = await GoogleUser.create({
        name: token.name,
        email: token.email,
        loginid: token.uid,
        role: "user"
      })
      console.log("user updated in db", gau)
      res.json({
        status :'ok',
        // body:{
        //   userName:name
        // }
    })
    } catch (error) {
      console.log("error", error)
        res.status(400).json({status: 'error', error: "Details not full"})
    }
  }}
    
      
    catch (error) {
      console.error(error.message);

      res.status(500).json({
        error: 'Internal Server Error'
      });
    }

  });


module.exports = router;