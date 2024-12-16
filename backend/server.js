const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Serve frontend build files
const frontendPath = path.join(__dirname, 'frontend/build');
app.use(express.static(frontendPath));

// API Routes
app.get('/api/books', (req, res) => {
    res.json([{ title: 'Book 1' }, { title: 'Book 2' }]); // Dummy API
});

// Fallback for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
