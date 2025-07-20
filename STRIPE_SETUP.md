# Stripe Setup Guide - Get Paid for Floater Window

## 🚀 Quick Start (5 minutes)

### Step 1: Set Your Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

### Step 2: Create Your Product
Run this command to automatically create your Stripe product:

```bash
# Set your Stripe secret key
export STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Run the setup script
node setup-stripe-product.js
```

### Step 3: Add Environment Variables to Vercel
1. Go to your Vercel dashboard
2. Find your project → Settings → Environment Variables
3. Add these variables:

```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_PRODUCT_ID=prod_xxxxxxxxxxxxx (from setup script)
STRIPE_PRICE_ID=price_xxxxxxxxxxxxx (from setup script)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx (from setup script)
DOWNLOAD_URL=https://your-download-url.com/floater-window.dmg
```

### Step 4: Deploy and Test
```bash
./deploy.sh
```

## 📊 Payment Analytics

Once set up, you can view your payment analytics at:
- `/api/payment-analytics` - Get payment statistics
- `/api/payment-analytics?days=7` - Last 7 days
- `/api/payment-analytics?days=90` - Last 90 days

## 🔧 Advanced Configuration

### Custom Product Details
Edit `setup-stripe-product.js` to customize:
- Product name and description
- Price amount (currently $4.99)
- Currency (currently USD)
- Metadata for tracking

### Webhook Events
The webhook handler (`api/webhook.js`) processes:
- `payment_intent.succeeded` - Successful payments
- `payment_intent.payment_failed` - Failed payments
- `invoice.payment_succeeded` - Subscription payments
- `invoice.payment_failed` - Failed subscriptions

### Payment Flow
1. User clicks "Download for Apple Silicon - $4.99"
2. Payment modal opens with Stripe Elements
3. User enters card details and email
4. Payment is processed through Stripe
5. On success, user gets download access
6. Webhook logs the successful payment

## 💰 Revenue Tracking

### What Gets Tracked
- Total revenue
- Number of payments
- Average order value
- Daily revenue breakdown
- Recent payment details

### Access Analytics
```javascript
// Get analytics data
const response = await fetch('/api/payment-analytics?days=30');
const analytics = await response.json();

console.log('Total Revenue:', analytics.summary.totalRevenue);
console.log('Total Payments:', analytics.summary.totalPayments);
console.log('Average Order:', analytics.summary.averageOrderValue);
```

## 🧪 Testing

### Test Cards
Use these Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Test the Flow
1. Visit your deployed website
2. Click the download button
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any 3-digit CVC
6. Check your Stripe dashboard for the payment

## 🔒 Security Features

### What's Protected
- Stripe keys stored in environment variables
- Webhook signature verification
- Secure payment processing
- Download token validation

### Best Practices
- Never commit Stripe keys to git
- Use test keys for development
- Switch to live keys for production
- Monitor webhook events
- Keep dependencies updated

## 📈 Going Live

### Switch to Live Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Live Publishable Key** (starts with `pk_live_`)
3. Copy your **Live Secret Key** (starts with `sk_live_`)
4. Update environment variables in Vercel
5. Update webhook URL to your live domain
6. Test with a small amount first

### Production Checklist
- [ ] Live Stripe keys configured
- [ ] Webhook endpoint updated
- [ ] Download URL points to real file
- [ ] Analytics tracking working
- [ ] Payment flow tested
- [ ] Error handling verified

## 🆘 Troubleshooting

### Payment Not Working?
- Check Stripe keys are correct
- Verify environment variables are set
- Check browser console for errors
- Test with Stripe test cards

### Webhook Issues?
- Verify webhook secret is correct
- Check webhook URL is accessible
- Monitor Vercel function logs
- Test webhook endpoint manually

### Analytics Not Showing?
- Check payment intent creation
- Verify webhook events are firing
- Check API endpoint permissions
- Review server logs

## 📞 Support

- **Stripe Issues**: [Stripe Support](https://support.stripe.com/)
- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **This Project**: Check the main README.md

---

**You're all set!** Your Floater Window website is now ready to accept payments and track revenue! 🎉 