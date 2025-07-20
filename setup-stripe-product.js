const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function setupStripeProduct() {
  try {
    console.log('🚀 Setting up your Stripe product...\n');

    // Create the product
    const product = await stripe.products.create({
      name: 'Floater Window',
      description: 'The future of floating video on Mac - A revolutionary app that lets you float any video window on your screen',
      metadata: {
        app_type: 'mac_app',
        platform: 'apple_silicon'
      }
    });

    console.log('✅ Product created:');
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Description: ${product.description}\n`);

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 499, // $4.99 in cents
      currency: 'usd',
      recurring: null, // One-time payment
      metadata: {
        app_version: '1.0.0'
      }
    });

    console.log('✅ Price created:');
    console.log(`   Price ID: ${price.id}`);
    console.log(`   Amount: $${(price.unit_amount / 100).toFixed(2)}`);
    console.log(`   Currency: ${price.currency.toUpperCase()}\n`);

    // Create a webhook endpoint for payment events (optional but recommended)
    const webhook = await stripe.webhookEndpoints.create({
      url: 'https://your-domain.vercel.app/api/webhook',
      enabled_events: [
        'payment_intent.succeeded',
        'payment_intent.payment_failed'
      ],
      metadata: {
        app: 'floater-window'
      }
    });

    console.log('✅ Webhook endpoint created:');
    console.log(`   Webhook ID: ${webhook.id}`);
    console.log(`   URL: ${webhook.url}\n`);

    console.log('🎉 Setup complete! Here are your environment variables:');
    console.log('==================================================');
    console.log(`STRIPE_SECRET_KEY=sk_test_... (your existing secret key)`);
    console.log(`STRIPE_PUBLISHABLE_KEY=pk_test_... (your existing publishable key)`);
    console.log(`STRIPE_PRODUCT_ID=${product.id}`);
    console.log(`STRIPE_PRICE_ID=${price.id}`);
    console.log(`STRIPE_WEBHOOK_SECRET=${webhook.secret}`);
    console.log('==================================================\n');

    console.log('📝 Next steps:');
    console.log('1. Add these environment variables to your Vercel project');
    console.log('2. Update the webhook URL to your actual domain');
    console.log('3. Test the payment flow with Stripe test cards');
    console.log('4. Switch to live keys when ready for production\n');

  } catch (error) {
    console.error('❌ Error setting up Stripe product:', error.message);
    if (error.type === 'StripeInvalidRequestError') {
      console.log('💡 Make sure your STRIPE_SECRET_KEY is set correctly');
    }
  }
}

// Run the setup
if (require.main === module) {
  setupStripeProduct();
}

module.exports = { setupStripeProduct }; 