const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ['currently reading', 'to read', 'completed'], default: 'to read' },
  addedAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
