const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    let user;
    if (req.body.username.includes('@')) {
      user = await User.findOne({ email: req.body.username });
    } else {
      user = await User.findOne({ username: req.body.username });
    }

    if (!user) return res.status(400).send('User not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    res.send('Logged in successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/signup', async (req, res) => {
    try {
      const emailName = req.body.email.split('@')[0];
      const randomNum = Math.floor(Math.random() * 10000);
      const username = `${emailName}${randomNum}`;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: username,
        password: hashedPassword,
      })
      res.json({status :'ok'})
    } catch (error) {
        res.json({status: 'error', error: 'Duplicate email'})
    }
  });

module.exports = router;