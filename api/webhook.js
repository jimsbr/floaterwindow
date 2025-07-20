const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      
      // Here you can add logic to:
      // - Send confirmation email
      // - Update your database
      // - Trigger download access
      // - Send analytics data
      
      // Example: Log successful payment details
      console.log('Payment Details:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        email: paymentIntent.receipt_email,
        product: paymentIntent.metadata.product,
        created: new Date(paymentIntent.created * 1000)
      });
      
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('❌ Payment failed:', failedPayment.id);
      
      // Here you can add logic to:
      // - Send failure notification
      // - Update your database
      // - Retry logic if needed
      
      break;
      
    case 'invoice.payment_succeeded':
      console.log('✅ Invoice payment succeeded');
      break;
      
    case 'invoice.payment_failed':
      console.log('❌ Invoice payment failed');
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}; 