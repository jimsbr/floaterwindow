# 🚀 Floater Window - Deployment Guide

## 📋 Overview
This is a secure download system for Floater Window with Stripe payment integration and Cloudflare R2 file hosting.

## 🔐 Security Notes
- **NEVER commit sensitive credentials to Git**
- The `STRIPE_SECRET_KEY` is server-side only and safe to use in environment variables
- The `STRIPE_PUBLISHABLE_KEY` is safe for frontend use (it's designed to be public)

## 🛠️ Deployment Options

### Option 1: Vercel (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Set Environment Variables
In your Vercel dashboard or via CLI:
```bash
vercel env add R2_ENDPOINT
vercel env add R2_ACCESS_KEY_ID
vercel env add R2_SECRET_ACCESS_KEY
vercel env add R2_BUCKET_NAME
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
```

**Environment Variables to Set:**
```
R2_ENDPOINT=https://975367a7e793daa1d0c5da8013652e49.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=077904e18fcc89c5d869645df8b71b90
R2_SECRET_ACCESS_KEY=prod_SiB6HMniwDcQYb
R2_BUCKET_NAME=floater-window-downloads
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51Mx80sDJ7rG9FLpHTFdY5sRL5uIUkFkXFdQ1P6syUOqVC7GMRwgIUQymPT1uE2x0DsEJwsokonOu1zTuDqTJc9TP00rnJ3UnBX
```

#### 3. Deploy
```bash
vercel --prod
```

### Option 2: Railway

#### 1. Connect Repository
- Connect your GitHub repo to Railway
- Railway will auto-detect the Node.js project

#### 2. Set Environment Variables
In Railway dashboard, add the same environment variables listed above.

#### 3. Deploy
Railway will automatically deploy on push to main branch.

### Option 3: Render

#### 1. Create Web Service
- Connect your GitHub repository
- Set build command: `npm install`
- Set start command: `node server.js`

#### 2. Set Environment Variables
Add the same environment variables in Render dashboard.

## 📁 File Structure
```
floater-window-website/
├── public/
│   ├── index.html          # Main website
│   ├── floaterwindow.mp4   # Demo video
│   └── README.md
├── api/
│   └── secure-download.js  # R2 download handler
├── server.js               # Main Express server
├── package.json
├── vercel.json            # Vercel configuration
└── DEPLOYMENT.md          # This file
```

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

## 🧪 Testing

### Local Testing
```bash
# Install dependencies
npm install

# Set environment variables (copy from production-config.js)
cp production-config.js .env

# Start server
node server.js

# Test at http://localhost:3000
```

### Production Testing
1. Complete a test payment with Stripe test mode first
2. Verify download token generation
3. Test secure download flow
4. Check Cloudflare R2 file access

## 🔒 Security Features

- ✅ **Token-based download protection** - One-time use tokens
- ✅ **Signed URLs** - Time-limited access to files
- ✅ **Payment verification** - Only paid users get download access
- ✅ **Environment variable protection** - No secrets in code
- ✅ **CORS protection** - Proper headers for cross-origin requests

## 📊 Monitoring

### Stripe Dashboard
- Monitor payments at: https://dashboard.stripe.com/payments
- View webhook events for payment confirmations

### Cloudflare R2 Dashboard
- Monitor file access at: https://dash.cloudflare.com/
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

### Support:
- Check server logs in your deployment platform
- Verify all environment variables are set correctly
- Test locally first before deploying

## 📈 Next Steps

1. **Deploy to production**
2. **Set up custom domain**
3. **Configure Stripe webhooks** (optional, for advanced features)
4. **Set up monitoring and analytics**
5. **Test complete payment flow**
6. **Go live!** 🎉

---

**Remember**: Never commit the `.env` file or `production-config.js` to Git. These contain sensitive credentials! 