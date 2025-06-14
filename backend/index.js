const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API route with error handling
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Unable to fetch products' });
  }
});

// Favicon route
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/favicon.ico'));
});

// Fallback for SPA routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

module.exports = app;
