const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51RmnPXRjYW8SYgrswzPscsmPb1kCvx4lhBwosDa8oFJOqNqMh8jwSQaS9cRK2Cyw3lZEDFKpPoswb8GkXdD9mN5F00JX1oTrNX');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Get product info to determine price
    let amount = 500; // Default fallback ($5.00)
    let currency = 'usd';
    let priceId = null;
    
    try {
      // First try to use the specific price ID if available
      if (process.env.STRIPE_PRICE_ID) {
        const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID);
        amount = price.unit_amount;
        currency = price.currency;
        priceId = price.id;
      } else if (process.env.STRIPE_PRODUCT_ID) {
        // Fallback to product ID and find the first active price
        const prices = await stripe.prices.list({
          product: process.env.STRIPE_PRODUCT_ID,
          active: true,
          limit: 1
        });
        
        if (prices.data.length > 0) {
          amount = prices.data[0].unit_amount;
          currency = prices.data[0].currency;
          priceId = prices.data[0].id;
        }
      }
    } catch (error) {
      console.error('Error fetching product price, using default:', error);
    }

    // Create a PaymentIntent using your Stripe product price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      receipt_email: email,
      metadata: {
        product: 'Floater Window',
        email: email,
        product_id: process.env.STRIPE_PRODUCT_ID || 'prod_your_product_id_here',
        price_id: priceId
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
}; 