// Import necessary modules
const express = require('express');       // Import Express.js
const mongoose = require('mongoose');    // Import Mongoose for MongoDB
const cors = require('cors');             // Import CORS for cross-origin requests
const Book = require('./backend/models/Book');   // Import the Book model
const userRoutes = require('./backend/routes/UserRoutes'); // Import the user routes
require('dotenv').config();              // Load environment variables from .env file
const path = require('path');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS for frontend communication
app.use(cors());

// Suppress Mongoose strictQuery deprecation warning
mongoose.set('strictQuery', false);

// Debug log for MongoDB URI
console.log('MongoDB URI:', process.env.MONGO_URI);

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Fallback for React's routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// --- MongoDB Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Endpoints ---

// Book Routes
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

// User Routes (Authentication)
app.use('/api/users', userRoutes); // Register the user routes for /register, /login, /currently-reading

// Default route for health check
app.get('/', (req, res) => {
  res.send('Bookshelf API is running...');
});

// --- Start the Server ---
const PORT = process.env.PORT || 5000;  // Define the port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
