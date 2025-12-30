// Import dependencies
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request body

// Root route – simple health check
app.get('/', (req, res) => {
  res.send({ message: "PiChamp Arena Backend Running" });
});

// Sandbox transaction verification route
app.post('/verify-payment', async (req, res) => {
  const { transactionId } = req.body;

  // Check if transactionId is provided
  if (!transactionId) {
    return res.status(400).send({ 
      status: 'error', 
      message: 'transactionId is required' 
    });
  }

  try {
    // Call Pi Sandbox API to verify transaction
    const response = await axios.get(
      `${process.env.PI_SANDBOX_URL}/v1/transactions/${transactionId}`,
      {
        headers: {
          'x-api-key': process.env.PI_SANDBOX_KEY
        }
      }
    );

    // Return response from Pi Sandbox API
    res.send({
      status: 'success',
      transaction: response.data
    });
  } catch (error) {
    console.error('Sandbox verification error:', error.message);
    res.status(500).send({ 
      status: 'error', 
      error: error.message 
    });
  }
});

// Start backend server
app.listen(port, () => {
  console.log(`PiChamp Arena Backend running on port ${port}`);
});
