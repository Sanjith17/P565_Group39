const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
    username: { type: String, required: true },
    packagesize: { type: String, required: true },
    sourceaddress: { type: String, required: true },
    destinationaddress: { type: String, required: true },
    servicedetails: { type: String, required: true },
    serviceprovider: { type: String, required: true },
    driver: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    id: { type: String, required: true },
    payment_id: { type: String, required: true },
});

module.exports = mongoose.model('Payment', Payment);