import React, { useState } from "react";
import "./RatingAndReview.css";
import { Link } from "react-router-dom";

const RatingAndReview = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            header: "excellent product",
            content: "this product was really good",
            rating: 10,
            productName: "Shoes",
        }
    ]);

    return (
        <div>
            {reviews.map(review => (
                <div key = {review.id} className = "review-container">
                    <div className = "review-header">{review.header}</div>
                    <div className = "review">
                        {review.content}
                    </div>
                    <div className="rating">Rating: {review.rating}</div>
                    <div className="proName">Product: {review.productName}</div>
                    <div className="proReview"></div>
                </div>
            ))}
                    <Link to = "/">Back to home</Link>
        </div>
    );
};

export default RatingAndReview;

