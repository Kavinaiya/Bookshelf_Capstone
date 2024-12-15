import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (review) {
      await axios.post(`http://localhost:5000/api/books/${id}/reviews`, { review });
      setReview('');
      // Re-fetch the book details after submitting the review
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <div>
        <h3>Reviews:</h3>
        {book.reviews.map((rev, index) => (
          <p key={index}><strong>{rev.user}:</strong> {rev.review}</p>
        ))}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
      />
      <button onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
}

export default BookDetails;
