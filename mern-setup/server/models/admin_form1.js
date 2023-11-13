const mongoose = require('mongoose');

const Search = new mongoose.Schema({
    name:{ type: String, required: true,unique: true},
    description : { type: String, required: true},
},
{collection: 'search-data'})

module.exports = mongoose.model('search', Search);