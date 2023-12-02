const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/customerNotification', async(req, res) => {
    const {customerEmail, deliveryDetails } = req.body;
    try {
        await notifyCustomer(customerEmail, deliveryDetails);
        res.status(200).json({message: 'Sent'});
    }
    catch(error) {
        console.error('experiencing error:', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

async function notifyCustomer(customerEmail) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fastFlex@gmail.com',
            password: '12345',
        },
    });

    const mailOptions = {
        from: 'fastFlex@gmail.com',
        to: customerEmail,
        subject: 'FastFlex Delivery',
        text: 'Your package has arrived. Thank you for using FastFlex Delivery!',
    };

    await transporter.sendEmail(mailOptions);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);

});




