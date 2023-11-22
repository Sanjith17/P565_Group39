const mongoose = require('mongoose');

const Services = new mongoose.Schema({
    company_name:{ type: String, required: true,unique: true},
    type_of_service : { type: String, required: true},
    weight_category : { type: String, required: true},
    price : { type: String, required: true},
},
{collection: 'services-data'})

module.exports = mongoose.model('services', Services);