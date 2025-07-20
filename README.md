# 🪟 Floater Window - Secure Download System

A secure payment and download system for Floater Window, featuring Stripe payment integration and Cloudflare R2 file hosting.

## ✨ Features

- 🔒 **Secure Payment Processing** - Stripe integration with live payments
- 🛡️ **Download Protection** - Token-based access control with one-time use tokens
- ☁️ **Cloud Storage** - Cloudflare R2 for fast, global file distribution
- 🔐 **Signed URLs** - Time-limited secure download links
- 📱 **Responsive Design** - Beautiful, modern UI that works on all devices
- ⚡ **Fast Performance** - Optimized for speed and reliability

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd floater-window-website

# Install dependencies
npm install

# Run setup script
./setup-deployment.sh

# Start development server
node server.js

# Visit http://localhost:3000
```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
floater-window-website/
├── public/
│   ├── index.html          # Main website with payment UI
│   ├── floaterwindow.mp4   # Demo video
│   └── README.md
├── api/
│   └── secure-download.js  # R2 download handler
├── server.js               # Express server with API endpoints
├── package.json            # Dependencies and scripts
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore rules
├── DEPLOYMENT.md          # Deployment guide
├── production-config.js   # Production credentials (DO NOT COMMIT)
└── setup-deployment.sh    # Setup script
```

## 🔧 Configuration

### Environment Variables
The following environment variables are required for production:

```bash
# Cloudflare R2 Configuration
R2_ENDPOINT=https://975367a7e793daa1d0c5da8013652e49.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=077904e18fcc89c5d869645df8b71b90
R2_SECRET_ACCESS_KEY=prod_SiB6HMniwDcQYb
R2_BUCKET_NAME=floater-window-downloads

# Stripe Production Keys
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51Mx80sDJ7rG9FLpHTFdY5sRL5uIUkFkXFdQ1P6syUOqVC7GMRwgIUQymPT1uE2x0DsEJwsokonOu1zTuDqTJc9TP00rnJ3UnBX
```

## 🔒 Security Features

- **Token-based Access Control** - One-time use download tokens
- **Signed URLs** - Time-limited access to files (1 hour expiration)
- **Payment Verification** - Only paid users get download access
- **Environment Variable Protection** - No secrets in code
- **CORS Protection** - Proper headers for cross-origin requests

## 🧪 Testing

### Test Payment Flow
1. Visit the website
2. Click "Buy Now" 
3. Complete payment with test card: `4242 4242 4242 4242`
4. Verify download token generation
5. Test secure download flow

### API Endpoints
- `GET /api/get-stripe-config` - Returns Stripe publishable key
- `GET /api/get-product-info` - Returns product information
- `POST /api/create-payment-intent` - Creates Stripe payment intent
- `GET /api/download` - Validates download token
- `GET /api/secure-download` - Generates signed download URL

## 📊 Monitoring

### Stripe Dashboard
- Monitor payments: https://dashboard.stripe.com/payments
- View webhook events for payment confirmations

### Cloudflare R2 Dashboard
- Monitor file access: https://dash.cloudflare.com/
- Check bandwidth and storage usage

## 🚨 Important Notes

1. **File Upload**: The .dmg file must be uploaded to your Cloudflare R2 bucket
2. **Domain Setup**: Configure your custom domain in your deployment platform
3. **SSL**: Ensure HTTPS is enabled (automatic on Vercel/Railway/Render)
4. **Backup**: Keep a backup of your environment variables

## 🆘 Troubleshooting

### Common Issues:
1. **"NoSuchKey" error**: File not uploaded to R2 bucket
2. **Payment fails**: Check Stripe webhook configuration
3. **Download fails**: Verify R2 credentials and bucket permissions
4. **CORS errors**: Check environment variable configuration

## 📈 Deployment Options

- **Vercel** (Recommended) - Easy deployment with automatic HTTPS
- **Railway** - Simple container deployment
- **Render** - Free tier available with automatic deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

---

**⚠️ Security Notice**: Never commit the `.env` file or `production-config.js` to Git. These contain sensitive credentials! 