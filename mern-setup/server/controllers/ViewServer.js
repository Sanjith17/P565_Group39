const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const services = [
    {id: 1, name: 'Express Delivery', price: 10},
    {id: 2, name: 'Standard Delivery, price: 5'}
];

const orders = [];
const reviews = [];

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.get('/services', (req, res) => {
    res.json(services);
});

app.get('/tracking/:trackingId', (req, res) => {
    const trackingId = req.params.trackingId;
    res.json({
        trackingStatus: 'In Transit'});
    });

app.post('/place-order', (req, res) => {
    const {size, serviceId} = req.body;
    const selectedService = services.find(service.id === parseInt(orderId))
    const newOrder = {size, service: selectedservice, payment: false, review: null};
    orders.push(newOrder);
    res.json(newOrder);
});

app.post('/make-payment', (req, res) => {
    const {orderId} = req.body;
    const order = orders.find(order => order.id === parseInt(orderId));
    order.payment = true;
    res.json({message: 'Payment successful'});
});

app.post('/submit-review', (req, res) => {
    const {orderId, review} = req.body;
    const order = orders.find(order => order.id === parseInt(orderId));
    order.review = review;
    reviews.push({orderId, review});
    res.json({message: 'Review submitted'});
});

app.get('/all-orders', (req, res) => {
    res.json(orders);
});

app.get('/all-reviews', (req, res) => {
    res.json(reviews);
})

app.post('/delegate-delivery', (req, res) => {
    const{orderId, driverId} = req.body;
    res.json({message: 'Delivery delegated'});
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});