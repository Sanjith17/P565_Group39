const express = require('express');
const router = express.Router();
const User = require('../models/user_data');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin')
const serviceAccount = require('./adminauth.json')

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
    if (!validPassword) return res.status(400).send('Invalid password');

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
      console.log("error", error)
        res.status(400).json({status: 'error', error: "Details not full"})
    }
  });


  router.post('/forgot', async (req, res) => {
    try {
      console.log("sdf",req.body)
      let user;
      
      user = await User.findOne({ email: req.body.email });
      
  
      if (!user) return res.status(400).send({message: 'User does not exist'});
        
      await admin.auth().sendPasswordResetEmail(req.body.email)
      res.status(200).json({
        message : 'Password reset email sent.'
      })
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.post('/auth', async (req, res) => {
    const { idToken } = req.body;

    try {
      const token = await admin.auth().verifyIdToken(idToken);

      console.log(token);
      res.status(200).json({
        success : true

      
      });

      const gau = await User.create({
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
      console.log("error", error)
        res.status(400).json({status: 'error', error: "Details not full"})
    }
      
    
      
    } catch (error) {
      console.error(error.message);

      res.status(500).json({
        error: 'Internal Server Error'
      });
    }

  });


module.exports = router;