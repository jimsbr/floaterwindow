#!/bin/bash

echo "🚀 Floater Window - Deployment Setup"
echo "====================================="

# Check if .env exists
if [ -f ".env" ]; then
    echo "✅ .env file found"
else
    echo "⚠️  .env file not found. Creating from production config..."
    if [ -f "production-config.js" ]; then
        echo "R2_ENDPOINT=https://975367a7e793daa1d0c5da8013652e49.r2.cloudflarestorage.com" > .env
        echo "R2_ACCESS_KEY_ID=077904e18fcc89c5d869645df8b71b90" >> .env
        echo "R2_SECRET_ACCESS_KEY=prod_SiB6HMniwDcQYb" >> .env
        echo "R2_BUCKET_NAME=floater-window-downloads" >> .env
        echo "STRIPE_SECRET_KEY=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" >> .env
        echo "STRIPE_PUBLISHABLE_KEY=pk_live_51Mx80sDJ7rG9FLpHTFdY5sRL5uIUkFkXFdQ1P6syUOqVC7GMRwgIUQymPT1uE2x0DsEJwsokonOu1zTuDqTJc9TP00rnJ3UnBX" >> .env
        echo "✅ .env file created"
    else
        echo "❌ production-config.js not found"
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "✅ server.js found"
else
    echo "❌ server.js not found"
    exit 1
fi

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "❌ vercel.json not found"
    exit 1
fi

# Check if .gitignore exists
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore found"
else
    echo "❌ .gitignore not found"
    exit 1
fi

echo ""
echo "🎉 Setup complete! Your project is ready for deployment."
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub: git add . && git commit -m 'Ready for deployment' && git push"
echo "2. Deploy to Vercel: vercel --prod"
echo "3. Set environment variables in your deployment platform"
echo "4. Test the payment and download flow"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 