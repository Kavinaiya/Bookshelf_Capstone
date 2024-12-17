const express = require('express');       // Import Express.js
const mongoose = require('mongoose');     // Import Mongoose for MongoDB
const cors = require('cors');             // Import CORS for cross-origin requests
const book = require('./models/book');    // Import the Book model
require('dotenv').config();               // Load environment variables from .env file

const app = express();
app.use(express.json());  // Middleware to parse incoming JSON data
app.use(cors());          // Enable CORS for frontend communication

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Endpoints ---

// Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, status } = req.body;   // Extract book details from the request body
    const newBook = new Book({ title, author, status });  // Create a new Book document
    await newBook.save();                         // Save to MongoDB
    res.status(201).json(newBook);                // Send back the created book
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();  // Fetch all books from MongoDB
    res.json(books);                  // Send back the books as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get currently reading books
app.get('/api/books/currently-reading', async (req, res) => {
  try {
    const books = await Book.find({ status: 'currently reading' }); // Find books with the 'currently reading' status
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get completed books
app.get('/api/books/completed', async (req, res) => {
  try {
    const books = await Book.find({ status: 'completed' }); // Find books with 'completed' status
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default route for health check
app.get('/', (req, res) => {
  res.send('Bookshelf API is running...');
});

// --- Start the Server ---
const PORT = process.env.PORT || 5000;  // Define the port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
