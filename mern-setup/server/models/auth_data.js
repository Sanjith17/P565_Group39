const mongoose = require('mongoose');

const gauth = new mongoose.Schema(
  {
    name: { type: String, required: true},

role:{type: String, required:true},
email:{type: String, required: true},
loginid:{type: String, required: true}
},
{collection: 'auth-data'})

module.exports = mongoose.model('authData', gauth);