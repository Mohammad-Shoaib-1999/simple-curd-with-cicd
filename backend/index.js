const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API endpoint
app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Handle requests by serving index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

module.exports = app;