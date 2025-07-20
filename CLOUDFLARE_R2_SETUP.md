# 🔒 Cloudflare R2 Secure Download Setup

## 🚀 **Complete Secure Download System**

This guide sets up **Cloudflare R2** with **download protection** for your Floater Window .dmg file.

## 📋 **Why Cloudflare R2?**

- ✅ **No egress fees** (huge cost savings!)
- ✅ **Global CDN** for fast downloads worldwide
- ✅ **S3-compatible** API (easy to use)
- ✅ **Built-in security** with signed URLs
- ✅ **Unlimited file sizes** (perfect for 110MB .dmg)

## 🔧 **Setup Steps**

### **1. Create Cloudflare Account**
1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for a free account
3. Add your domain (optional for R2)

### **2. Create R2 Bucket**
1. Go to **R2 Object Storage** in Cloudflare dashboard
2. Click **"Create bucket"**
3. Name it: `floater-window-downloads`
4. Choose your preferred region

### **3. Create API Token**
1. Go to **My Profile** → **API Tokens**
2. Click **"Create Token"**
3. Choose **"Custom token"**
4. Set permissions:
   - **Account** → **Cloudflare R2** → **Edit**
   - **Zone** → **Zone** → **Edit** (if using custom domain)
5. Save the token

### **4. Get R2 Credentials**
1. Go to **R2 Object Storage** → **Manage R2 API tokens**
2. Click **"Create API token"**
3. Choose **"Custom token"**
4. Set permissions:
   - **Object Read & Write**
   - **Bucket: floater-window-downloads**
5. Save the **Access Key ID** and **Secret Access Key**

### **5. Set Environment Variables**
Create a `.env` file in your project root:

```bash
# Cloudflare R2 Configuration
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=floater-window-downloads

# Stripe Configuration (existing)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### **6. Upload Your .dmg File**
```bash
# Make sure your .dmg file is in public/ directory
ls public/FloaterWindow.dmg

# Upload to Cloudflare R2
node upload-to-r2.js
```

### **7. Test the System**
```bash
# Start your server
node server.js

# Visit: http://localhost:3000
# Complete a test payment
# Verify download works with security
```

## 🔒 **Security Features**

### **Download Protection:**
- ✅ **Signed URLs** with 1-hour expiration
- ✅ **Token-based access** - each download needs a unique token
- ✅ **One-time use tokens** - invalidated after download
- ✅ **No direct file access** - files can't be accessed without valid token
- ✅ **Global CDN** with Cloudflare's security

### **Payment Flow:**
1. **User pays** with Stripe or Lightning
2. **Secure token generated** on successful payment
3. **Token stored** in memory/database
4. **Download request** validates token
5. **Signed URL generated** with expiration
6. **File downloads** from Cloudflare R2
7. **Token invalidated** after use

## 💰 **Cost Breakdown**

### **Cloudflare R2 Pricing:**
- **Storage**: $0.015/GB/month
- **Class A Operations**: $4.50/million
- **Class B Operations**: $0.36/million
- **Egress**: **FREE** (no bandwidth charges!)

### **Your 110MB .dmg file:**
- **Storage cost**: ~$0.00165/month
- **Download cost**: ~$0.0004 per download
- **Total**: **Less than $1/month** for 1000 downloads!

## 🧪 **Testing**

### **Local Testing:**
```bash
node server.js
# Visit: http://localhost:3000
```

### **Production Testing:**
1. Deploy to Vercel/Netlify
2. Set environment variables
3. Test payment flow
4. Verify secure downloads
5. Check token invalidation

## 📁 **File Structure**

```
floater-window-website/
├── api/
│   ├── secure-download.js    ← Secure download endpoint
│   └── upload-to-r2.js       ← R2 upload script
├── public/
│   ├── FloaterWindow.dmg     ← Your app installer
│   └── index.html
├── upload-to-r2.js           ← Upload script
├── r2-config.json            ← Generated config
├── .env                      ← Environment variables
└── server.js                 ← Updated server
```

## 🚨 **Important Notes**

- **Environment variables** must be set for production
- **R2 credentials** should be kept secure
- **Token storage** should use a database in production
- **Signed URLs** expire after 1 hour (configurable)
- **CDN caching** provides global fast downloads

## 🆘 **Troubleshooting**

### **Upload Fails:**
- Check R2 credentials
- Verify bucket exists
- Check file permissions
- Ensure environment variables are set

### **Download Fails:**
- Verify token generation
- Check API endpoint logs
- Ensure .dmg file is uploaded to R2
- Check signed URL expiration

### **Payment Issues:**
- Test with Stripe test cards
- Check server logs
- Verify API endpoints
- Ensure token generation works

## 🎉 **Success!**

Once setup is complete:
1. ✅ **Secure file hosting** on Cloudflare R2
2. ✅ **Protected downloads** with signed URLs
3. ✅ **Token-based access control**
4. ✅ **Global CDN distribution**
5. ✅ **Cost-effective** with no egress fees
6. ✅ **One-time use** download tokens 