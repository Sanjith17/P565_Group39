const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
    username: { type: String, required: true },
    sourceaddress: { type: String, required: true },
    destinationaddress: { type: String, required: true },
    driver: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    service_id: { type: String, required: true },
    location: { type: String, required: true },
    review : {type: String}
    // payment_id: { type: String, required: true },
    // tracking_id: { type: String, required: true}
});

module.exports = mongoose.model('Payment', Payment);