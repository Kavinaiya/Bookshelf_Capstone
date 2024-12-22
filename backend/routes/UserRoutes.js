const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate user based on JWT token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Route to register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get user's currently reading books (protected route)
router.get("/currently-reading", authenticate, async (req, res) => {
  try {
    // Assuming you have a 'currentlyReading' field in your User model
    const user = await User.findById(req.user.id); // Access user from authenticated token
    if (!user) return res.status(404).json({ error: "User not found" });

    // Return the books the user is currently reading
    res.json({ currentlyReading: user.currentlyReading });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
