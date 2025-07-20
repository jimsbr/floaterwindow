require('dotenv').config();
const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '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');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// API Routes
app.get('/api/get-stripe-config', (req, res) => {
  res.json({
    publishableKey: 'pk_live_51Mx80sDJ7rG9FLpHTFdY5sRL5uIUkFkXFdQ1P6syUOqVC7GMRwgIUQymPT1uE2x0DsEJwsokonOu1zTuDqTJc9TP00rnJ3UnBX'
  });
});

app.get('/api/get-product-info', (req, res) => {
  res.json({
    name: 'Floater Window',
    price: 500,
    currency: 'usd',
    formattedPrice: '$5.00',
    description: 'A YouTube player that floats above your other windows'
  });
});

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, // $5.00
      currency: 'usd',
      receipt_email: email,
      metadata: {
        product: 'Floater Window',
        email: email
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment Intent ID is required' });
    }

    // Retrieve the payment intent to check its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Generate a download token (simple timestamp-based token for demo)
      const downloadToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({
        success: true,
        downloadToken: downloadToken,
        message: 'Payment confirmed successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        error: `Payment not completed. Status: ${paymentIntent.status}`
      });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to confirm payment' 
    });
  }
});

// Import the secure download functions
const { addValidToken, handler: secureDownloadHandler } = require('./api/secure-download.js');

app.get('/api/download', (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ error: 'Download token required' });
  }

  // Add the token to valid tokens for download
  addValidToken(token);
  
  // Return success response
  res.json({ success: true, message: 'Download token validated' });
});

// Secure download endpoint
app.get('/api/secure-download', async (req, res) => {
  await secureDownloadHandler(req, res);
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Test the payment flow at http://localhost:${PORT}`);
}); 