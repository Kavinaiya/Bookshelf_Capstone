const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Define a simple schema and model for testing (books collection)
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, default: 0 },
  review: { type: String, default: '' },
});

const Book = mongoose.model('Book', bookSchema);

// API Routes

// GET: Fetch all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST: Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, rating, review } = req.body;

  try {
    const newBook = new Book({ title, author, rating, review });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: 'Error adding book', error: err.message });
  }
});

// PUT: Update a book by ID
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, review } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, rating, review },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});

// DELETE: Remove a book by ID
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting book', error: err.message });
  }
});

// Serve static files from the React build folder
const frontendPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendPath));

// Fallback for React Router: Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
