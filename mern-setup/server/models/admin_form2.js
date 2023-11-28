// const mongoose = require('mongoose');

// const Services = new mongoose.Schema({
//     company_name:{ type: String, required: true},
//     type_of_service : { type: String, required: true},
//     weight_category : { type: String, required: true},
//     price : { type: String, required: true },
// },
// {collection: 'services-data'})

// module.exports = mongoose.model('services', Services);


const mongoose = require('mongoose');

const Services = new mongoose.Schema({
  company_name: { type: String, required: true },
  type_of_service: { type: String, required: true },
  weight_category: { type: String, required: true },
  price: { type: String, required: true },
},
{collection: 'services-data'});

// Compound unique index on company_name, type_of_service, and weight_category
Services.index(
  { company_name: 1, type_of_service: 1, weight_category: 1 },
  { unique: true }
);

module.exports = mongoose.model('services', Services);
