document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('countryCode').value + document.getElementById('phone').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    // Do the validation and/or send data to the backend for registration.
    console.log('Form Data:', formData);
    
    alert('Signup successful! (This is just a simulation. Implement backend logic for real functionality.)');
});
