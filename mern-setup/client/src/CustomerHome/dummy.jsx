import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RentedBooksPage({ userId }) {
  const [rentedBooks, setRentedBooks] = useState({ current: [], past: [] });

  useEffect(() => {

          const token = localStorage.getItem('token');
          if (!token) {
            alert('No token found. Please log in.');
            return;
          }

         const fetchBooks = async () => {
            try {
              const response = await axios.get('http://localhost:8080/rentedbooks/getbooks',{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setRentedBooks(response.data)
            } catch (error) {
              console.error('Error fetching rented books:', error);
            }
          };
      
          fetchBooks();
        
  }, []);

  const handleReturnBook = async (rentedBookId) => {
    try {
      const response = await axios.put(`http://localhost:8080/rentedbooks/update-status/${rentedBookId}`, 
        { status: 'returned' }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log(response.data)
      if (response.status === 200) {
        // Update the state to reflect the change
        setRentedBooks(prevState => ({
          ...prevState,
          current: prevState.current.filter(book => book._id !== rentedBookId),
          past: [...prevState.past, response.data] // Add the returned book to past rentals
        }));
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleReviewSubmit = async (e, ownerId) => {
    e.preventDefault();
    const { rating, review } = e.target.elements;
    
    try {
      console.log(ownerId)
      const response = await axios.post(`http://localhost:8080/rentedbooks/review/${ownerId}`, { 
        rating: rating.value,
        comment: review.value
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data);
      // Update UI to reflect the new review
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };  

  return (
    <div className="rented-books">
      <h1>My Rented Books</h1>
      <h2>Current Rentals</h2>
      <ul>
        {rentedBooks.current.map(book => (
          <li key={book._id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Rented for {book.days} days</p>
            <p>Price per day: ${book.price_per_day}</p>
            <button onClick={() => handleReturnBook(book._id)}>Return</button>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
      <h2>Past Rentals</h2>
      <ul>
        {rentedBooks.past.map(book => (
          <li key={book._id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Rented for {book.days} days</p>
            <p>Price per day: ${book.price_per_day}</p>
            <form onSubmit={(e) => handleReviewSubmit(e, book.owner_user_id)}>
      <input type="number" name="rating" min="1" max="5" required placeholder="Rating (1-5)" />
      <textarea name="review" required placeholder="Write a review about the owner"></textarea>
      <button type="submit">Submit Review</button>
    </form>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RentedBooksPage;