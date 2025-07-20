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
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    
    console.log('Stripe config request - publishable key exists:', !!publishableKey);
    
    if (!publishableKey) {
      console.error('STRIPE_PUBLISHABLE_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Stripe publishable key not configured',
        debug: 'Environment variable STRIPE_PUBLISHABLE_KEY is missing'
      });
    }
    
    // Return only the publishable key (safe to share)
    res.status(200).json({
      publishableKey: publishableKey
    });
  } catch (error) {
    console.error('Error getting Stripe config:', error);
    res.status(500).json({ error: 'Failed to get Stripe configuration' });
  }
}; 