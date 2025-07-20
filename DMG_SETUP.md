# Floater Window .dmg Setup Guide

## 🚀 **Secure Download System Setup**

This guide will help you set up secure .dmg file hosting with Vercel Blob and download protection.

## 📋 **Prerequisites**

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** - Install with `npm i -g vercel`
3. **FloaterWindow.dmg** - Your Mac app installer file

## 🔧 **Setup Steps**

### 1. **Login to Vercel**
```bash
vercel login
```

### 2. **Add Your .dmg File**
Place your `FloaterWindow.dmg` file in the `public/` directory:
```
floater-window-website/
├── public/
│   ├── index.html
│   ├── FloaterWindow.dmg  ← Add your file here
│   └── ...
```

### 3. **Upload to Vercel Blob**
Run the upload script:
```bash
node upload-dmg.js
```

This will:
- ✅ Upload your .dmg to Vercel Blob
- ✅ Generate a secure URL
- ✅ Save configuration to `dmg-config.json`

### 4. **Deploy to Vercel**
```bash
vercel --prod
```

## 🔒 **Security Features**

### **Download Protection:**
- ✅ **Token-based access** - Each download requires a unique token
- ✅ **One-time use** - Tokens are invalidated after download
- ✅ **Secure hosting** - File stored in Vercel Blob with CDN
- ✅ **No direct access** - Files can't be accessed without valid token

### **Payment Flow:**
1. **User pays** with Stripe or Lightning
2. **Token generated** on successful payment
3. **Download link** appears with secure token
4. **File downloads** directly from Vercel Blob
5. **Token invalidated** after download

## 🧪 **Testing**

### **Local Testing:**
```bash
node server.js
```
Visit: `http://localhost:3000`

### **Production Testing:**
1. Deploy to Vercel
2. Test payment flow
3. Verify .dmg download works
4. Check token invalidation

## 📁 **File Structure**

```
floater-window-website/
├── api/
│   ├── secure-download.js    ← Secure download endpoint
│   └── upload-dmg.js         ← Upload endpoint
├── public/
│   ├── FloaterWindow.dmg     ← Your app installer
│   └── index.html
├── upload-dmg.js             ← Upload script
├── dmg-config.json           ← Generated config
└── server.js                 ← Updated server
```

## 🔧 **Configuration**

The system automatically generates `dmg-config.json`:
```json
{
  "dmgUrl": "https://blob.vercel-storage.com/...",
  "uploadedAt": "2025-01-19T23:30:00.000Z",
  "size": 52428800
}
```

## 🚨 **Important Notes**

- **File size limit**: Vercel Blob has limits (check current limits)
- **Token expiration**: Consider adding time-based expiration
- **Database storage**: For production, use a database for tokens
- **CDN caching**: Vercel Blob provides global CDN distribution

## 🆘 **Troubleshooting**

### **Upload Fails:**
- Check Vercel login: `vercel login`
- Verify file exists: `ls public/FloaterWindow.dmg`
- Check file size limits

### **Download Fails:**
- Verify token generation
- Check API endpoint logs
- Ensure .dmg file is uploaded

### **Payment Issues:**
- Test with Stripe test cards
- Check server logs
- Verify API endpoints

## 🎉 **Success!**

Once setup is complete:
1. ✅ **Secure file hosting** on Vercel Blob
2. ✅ **Protected downloads** with token validation
3. ✅ **Direct .dmg downloads** after payment
4. ✅ **Global CDN distribution** for fast downloads 