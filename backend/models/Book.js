const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  // other fields...
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
