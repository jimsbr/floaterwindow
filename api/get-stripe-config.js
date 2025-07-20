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
    // Use test publishable key for development
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51RmnPXRjYW8SYgrskmHt60HhTkmUZ3zroLxkvg0wW3dvZv8486jixrdNATMg2kvUKSEKwFYQMq5XHYU8WuXRBfWL007tbgrDQe';
    
    console.log('Stripe config request - publishable key exists:', !!publishableKey);
    
    if (!publishableKey || publishableKey === 'pk_test_51RmnPXRjYW8SYgrskmHt60HhTkmUZ3zroLxkvg0wW3dvZv8486jixrdNATMg2kvUKSEKwFYQMq5XHYU8WuXRBfWL007tbgrDQe') {
      console.error('Please replace the test publishable key with your actual test key');
      return res.status(500).json({ 
        error: 'Stripe publishable key not configured',
        debug: 'Please update the test key in api/get-stripe-config.js'
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