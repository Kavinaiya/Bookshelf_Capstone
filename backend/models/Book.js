const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  // Other fields...
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
