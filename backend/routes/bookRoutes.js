const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, author, thumbnail } = req.body;
  try {
    const book = new Book({ title, author, thumbnail });
    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
