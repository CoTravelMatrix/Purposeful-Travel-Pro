const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// LayerV API Key
const LAYERV_API_KEY = 'lv_live_79OkMcF1xIs3YI4QaujcZIN6tDekvQ8coQ_qKf73E4A';

// Middleware
app.use(cors());
app.use(express.json());

// API Key authentication middleware
app.use((req, res, next) => {
  const providedKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (!providedKey || providedKey !== LAYERV_API_KEY) {
    return res.status(401).json({ error: 'Invalid LayerV API key' });
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Purposeful Travel Pro secured by LayerV' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Purposeful Travel Pro server running on port ${PORT}, secured by LayerV`);
});