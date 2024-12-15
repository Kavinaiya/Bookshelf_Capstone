import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';

function Dashboard() {
  const [currentlyReading, setCurrentlyReading] = useState([]);

  useEffect(() => {
    const fetchCurrentlyReading = async () => {
      const response = await axios.get('http://localhost:5000/api/users/currently-reading');
      setCurrentlyReading(response.data);
    };

    fetchCurrentlyReading();
  }, []);

  return (
    <div>
      <h2>My Bookshelf</h2>
      <h3>Currently Reading:</h3>
      <ul>
        {currentlyReading.map(book => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
      <BookList />
    </div>
  );
}

export default Dashboard;
