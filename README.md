# Floater Window Website

A modern landing page for Floater Window with integrated Stripe payments and secure file downloads.

## Features

- 🎨 Modern, responsive design with animated elements
- 💳 Integrated Stripe payment processing
- 🔒 Secure file downloads after payment verification
- ⚡ Lightning-fast deployment on Vercel
- 📱 Mobile-optimized interface

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- Stripe account with API keys
- Your .dmg file hosted somewhere accessible

### 2. Quick Setup (Recommended)

For the fastest setup, follow the [Quick Setup Guide](SETUP.md) which will get you live in 10 minutes.

### 3. Stripe Product Setup

To get paid properly, you need to set up your Stripe product:

1. **Get your Stripe keys** from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **Run the setup script**:
   ```bash
   export STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   node setup-stripe-product.js
   ```
3. **Add environment variables** to Vercel:
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_PRODUCT_ID=prod_xxxxxxxxxxxxx (from setup script)
   STRIPE_PRICE_ID=price_xxxxxxxxxxxxx (from setup script)
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx (from setup script)
   DOWNLOAD_URL=https://your-download-url.com/floater-window.dmg
   ```

### 4. Manual Stripe Configuration (Alternative)

If you prefer to set up manually:
1. Create a product in [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Set the price to $4.99 (or your desired amount)
3. Copy the Product ID and add it to environment variables

### 5. File Hosting

You have several options for hosting your .dmg file:

#### Option A: GitHub Releases (Recommended)
1. Create a GitHub repository
2. Upload your .dmg file as a release
3. Set `DOWNLOAD_URL` to the GitHub release URL

#### Option B: Vercel Blob Storage
1. Use Vercel Blob for file storage
2. Update the download endpoint to serve from Blob

#### Option C: CDN (AWS S3, Cloudflare, etc.)
1. Upload your file to your preferred CDN
2. Set `DOWNLOAD_URL` to the CDN URL

### 6. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 7. Deployment

```bash
# Deploy to Vercel
vercel

# Or deploy to production
vercel --prod
```

## Project Structure

```
floater-window-website/
├── public/
│   └── index.html          # Main landing page
├── admin.html              # Revenue dashboard
├── api/
│   ├── create-payment-intent.js  # Creates Stripe payment intents
│   ├── confirm-payment.js        # Confirms payments and generates download tokens
│   ├── download.js              # Handles secure file downloads
│   ├── get-product-info.js      # Fetches product details from Stripe
│   ├── get-stripe-config.js     # Returns Stripe configuration
│   ├── payment-analytics.js     # Payment analytics and revenue tracking
│   └── webhook.js              # Stripe webhook handler
├── setup-stripe-product.js     # Automated Stripe product setup
├── package.json
├── vercel.json
├── SETUP.md                   # Quick setup guide
├── STRIPE_SETUP.md            # Detailed Stripe configuration
└── README.md
```

## API Endpoints

### POST /api/create-payment-intent
Creates a Stripe payment intent using your configured product price.

**Request:**
```json
{
  "email": "customer@example.com"
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### POST /api/confirm-payment
Confirms payment and generates download token.

**Request:**
```json
{
  "paymentIntentId": "pi_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "downloadToken": "abc123...",
  "expiresAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/download?token=xxx
Downloads the .dmg file after token verification.

### GET /api/payment-analytics?days=30
Returns payment analytics and revenue data.

**Response:**
```json
{
  "summary": {
    "totalRevenue": 149.70,
    "totalPayments": 30,
    "averageOrderValue": 4.99,
    "period": "30 days"
  },
  "recentPayments": [...],
  "dailyRevenue": {...}
}
```

### POST /api/webhook
Handles Stripe webhook events for payment tracking.

## Security Considerations

- Download tokens expire after 24 hours
- All payments are processed through Stripe's secure infrastructure
- CORS is properly configured for API endpoints
- Environment variables keep sensitive data secure

## Customization

### Changing the Price
1. **Recommended**: Update the price in your Stripe Dashboard - the website will automatically reflect the new price
2. **Alternative**: Update the amount in `setup-stripe-product.js` and run the setup script again
3. **Manual**: Update the amount in `api/create-payment-intent.js` (currently 499 cents = $4.99)

### Styling
The website uses CSS custom properties and can be easily customized by modifying the styles in `public/index.html`.

### Adding More Payment Methods
The current implementation supports Stripe cards and has a placeholder for Lightning payments. You can extend this by:

1. Adding more payment method options in the HTML
2. Creating additional API endpoints for other payment processors
3. Updating the frontend JavaScript to handle new payment flows

## Revenue Tracking

### Admin Dashboard
Access your revenue dashboard at `/admin.html` to view:
- Total revenue and payment counts
- Average order value
- Recent payment details
- Daily revenue breakdown

### Analytics API
Use the `/api/payment-analytics` endpoint to integrate analytics into your own dashboard.

## Troubleshooting

### Common Issues

1. **Payment fails**: Check your Stripe API keys and webhook configuration
2. **Download doesn't work**: Verify the `DOWNLOAD_URL` environment variable
3. **CORS errors**: Ensure your domain is properly configured in Vercel
4. **Product not found**: Make sure `STRIPE_PRODUCT_ID` is set correctly
5. **Webhook issues**: Verify `STRIPE_WEBHOOK_SECRET` is configured

### Debug Mode

To enable debug logging, add this to your environment variables:
```bash
DEBUG=true
```

## Support

For issues related to:
- **Stripe**: Check the [Stripe documentation](https://stripe.com/docs)
- **Vercel**: Check the [Vercel documentation](https://vercel.com/docs)
- **This project**: Open an issue in the repository

## License

This project is proprietary software. All rights reserved. 