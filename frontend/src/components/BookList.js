import { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books', err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {books.map(book => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
