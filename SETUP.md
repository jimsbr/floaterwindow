# Quick Setup Guide

## 🚀 Get Your Floater Window Website Live in 10 Minutes

### Step 1: Get Your Stripe Keys & Product ID
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)
4. Go to [Products](https://dashboard.stripe.com/products) and copy your **Product ID** (starts with `prod_`)

### Step 2: Update the Website (Optional)
**Note**: The website now automatically gets your Stripe keys from environment variables, so you don't need to edit the HTML file anymore!

If you want to hardcode the publishable key instead:
1. Open `public/index.html`
2. Find the fallback section in the `initializeStripe()` function
3. Uncomment and update the publishable key line

### Step 3: Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `./deploy.sh`
3. Follow the prompts to connect your GitHub account

### Step 4: Set Environment Variables
1. Go to your Vercel dashboard
2. Find your project and go to Settings → Environment Variables
3. Add these variables:
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key
   - `STRIPE_PRODUCT_ID` = your Stripe product ID (optional, but recommended)
   - `DOWNLOAD_URL` = URL to your .dmg file

### Step 5: Test the Payment Flow
1. Visit your deployed website
2. Click "Download for Apple Silicon - $4.99"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date and any 3-digit CVC

## 📁 File Hosting Options

### Option A: GitHub Releases (Recommended)
1. Create a GitHub repository
2. Upload your .dmg file as a release
3. Copy the download URL and set it as `DOWNLOAD_URL`

### Option B: Direct URL
If your .dmg is hosted elsewhere, just use that URL as `DOWNLOAD_URL`

## 🔧 Troubleshooting

### Payment Not Working?
- Check your Stripe keys are correct
- Make sure you're using test keys for testing
- Verify the publishable key is updated in the HTML file

### Download Not Working?
- Check the `DOWNLOAD_URL` environment variable
- Make sure the URL is accessible
- Test the URL in your browser

### Deployment Issues?
- Make sure you have Node.js 18+ installed
- Check that all files are committed to git
- Try running `vercel --debug` for more info

## 🎯 Next Steps

1. **Test thoroughly** with Stripe test cards
2. **Switch to live keys** when ready for production
3. **Update the download URL** to your actual .dmg file
4. **Customize the design** if needed
5. **Add analytics** to track conversions

## 📞 Support

- **Stripe Issues**: [Stripe Support](https://support.stripe.com/)
- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **This Project**: Check the README.md for detailed documentation

---

**That's it!** Your Floater Window website is now live with working payments! 🎉 