const stripe = require('stripe')('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');

async function setupWebhook() {
  try {
    console.log('🔗 Setting up webhook for live payments...\n');

    // Replace with your actual domain when deployed
    const webhookUrl = 'https://your-domain.vercel.app/api/webhook';
    
    console.log('⚠️  IMPORTANT: Update the webhook URL to your actual domain');
    console.log(`   Current URL: ${webhookUrl}\n`);

    // Create webhook endpoint
    const webhook = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: [
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'invoice.payment_succeeded',
        'invoice.payment_failed'
      ],
      metadata: {
        app: 'floater-window'
      }
    });

    console.log('✅ Webhook endpoint created:');
    console.log(`   Webhook ID: ${webhook.id}`);
    console.log(`   URL: ${webhook.url}`);
    console.log(`   Secret: ${webhook.secret}\n`);

    console.log('🎉 Webhook setup complete!');
    console.log('==================================================');
    console.log('Add this to your Vercel environment variables:');
    console.log(`STRIPE_WEBHOOK_SECRET=${webhook.secret}`);
    console.log('==================================================\n');

    console.log('📝 Next steps:');
    console.log('1. Update the webhook URL to your actual domain');
    console.log('2. Add the webhook secret to Vercel environment variables');
    console.log('3. Test a payment to verify webhook is working');

  } catch (error) {
    console.error('❌ Error setting up webhook:', error.message);
    if (error.type === 'StripeInvalidRequestError') {
      console.log('💡 Make sure you have the correct Stripe keys');
    }
  }
}

setupWebhook(); 