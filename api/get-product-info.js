const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const productId = process.env.STRIPE_PRODUCT_ID;
    
    if (!productId) {
      // Fallback to hardcoded values if no product ID
      return res.status(200).json({
        name: 'Floater Window',
        price: 500, // $5.00 in cents
        currency: 'usd',
        formattedPrice: '$5.00',
        description: 'A YouTube player that floats above your other windows'
      });
    }

    // Fetch product and price from Stripe
    const product = await stripe.products.retrieve(productId);
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1
    });

    if (prices.data.length === 0) {
      throw new Error('No active price found for product');
    }

    const price = prices.data[0];
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency.toUpperCase()
    }).format(price.unit_amount / 100);

    res.status(200).json({
      name: product.name,
      price: price.unit_amount,
      currency: price.currency,
      formattedPrice: formattedPrice,
      description: product.description || 'The future of floating video on Mac'
    });

  } catch (error) {
    console.error('Error fetching product info:', error);
    
    // Fallback response
    res.status(200).json({
      name: 'Floater Window',
      price: 500,
      currency: 'usd',
      formattedPrice: '$5.00',
      description: 'A YouTube player that floats above your other windows'
    });
  }
}; 