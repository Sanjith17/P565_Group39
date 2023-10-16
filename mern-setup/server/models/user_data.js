const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
      firstname: { type: String, required: true},
      lastname: { type: String, required: true},

  username: { type: String, unique: true, required: true }, 
  password: { type: String, required: true },
  role:{type: String, required:true},
  email:{type: String, required: true}
},
{collection: 'user-data'})

module.exports = mongoose.model('UserData', User);

const gauth = new mongoose.Schema(
  {
    name: { type: String, required: true},

role:{type: String, required:true},
email:{type: String, required: true},
loginid:{type: String, required: true}
},
{collection: 'auth-data'})

module.exports = mongoose.model('authData', gauth);