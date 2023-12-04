export default function notify() {
  const orderId = '1234';
  const apiUrl = 'http://localhost:3000/notify-customer';
  const customerEmail = getCustomerEmail(orderId); //needs a function to get the email of customer
  fetch(apiUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({orderId, customerEmail,}),
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}



