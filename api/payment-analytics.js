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
    const { days = 30 } = req.query;
    const daysAgo = Math.floor(Date.now() / 1000) - (parseInt(days) * 24 * 60 * 60);

    // Get successful payments
    const payments = await stripe.paymentIntents.list({
      created: { gte: daysAgo },
      limit: 100,
    });

    // Filter successful payments
    const successfulPayments = payments.data.filter(payment => 
      payment.status === 'succeeded'
    );

    // Calculate analytics
    const totalRevenue = successfulPayments.reduce((sum, payment) => 
      sum + payment.amount, 0
    );

    const totalPayments = successfulPayments.length;
    const averageOrderValue = totalPayments > 0 ? totalRevenue / totalPayments : 0;

    // Group by date
    const dailyRevenue = {};
    successfulPayments.forEach(payment => {
      const date = new Date(payment.created * 1000).toISOString().split('T')[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + payment.amount;
    });

    // Get recent payment details (last 10)
    const recentPayments = successfulPayments
      .slice(0, 10)
      .map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        email: payment.receipt_email,
        created: payment.created,
        product: payment.metadata.product
      }));

    res.status(200).json({
      summary: {
        totalRevenue: totalRevenue / 100, // Convert from cents to dollars
        totalPayments,
        averageOrderValue: averageOrderValue / 100,
        period: `${days} days`
      },
      dailyRevenue,
      recentPayments,
      currency: 'usd'
    });

  } catch (error) {
    console.error('Error fetching payment analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}; 