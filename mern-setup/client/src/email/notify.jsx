<html lang = "en">
  <head>
    <meta> charset = "UTF-8"</meta>
    <meta> name = "viewport" content = "width=device-width, initial-scale = 1.0"</meta>
    <title>Delivery Notification</title>
  </head>
  <body>
    <script>
      const orderId = '123';
      const apiUrk = http://localhost:3000/notify-customer;
      const customerEmail = getCustomerEmail(orderId);
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId, customerEmail,}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:' error));
    </script>
  </body>
</html>

