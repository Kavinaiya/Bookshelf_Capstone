// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)

// Set the port (Heroku uses a dynamic port)
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Example Schema (can be expanded)
const Book = mongoose.model('Book', new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number },
  review: { type: String }
}));

// Example API Routes
// GET: Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST: Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, rating, review } = req.body;
    const newBook = new Book({ title, author, rating, review });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).send('Bad Request');
  }
});

// PUT: Update a book's details (for review or rating update)
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).send('Error updating book');
  }
});

// DELETE: Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).send('Error deleting book');
  }
});

// Serve static files from the React app (built frontend)
const frontendPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendPath));

// Fallback route to serve the React index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
