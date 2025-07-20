// This script helps you set up Vercel Blob for hosting your .dmg file
// You'll need to install the Vercel Blob package first

console.log('🚀 Setting up Vercel Blob for file hosting...\n');

console.log('Step 1: Install Vercel Blob package');
console.log('npm install @vercel/blob\n');

console.log('Step 2: Create a new API endpoint for file upload');
console.log('Create file: api/upload-file.js\n');

console.log('Step 3: Update your download endpoint');
console.log('The download URL will be: https://your-domain.vercel.app/api/download\n');

console.log('Step 4: Add environment variable');
console.log('BLOB_READ_WRITE_TOKEN=your_blob_token_here\n');

console.log('📝 Instructions:');
console.log('1. Run: npm install @vercel/blob');
console.log('2. Go to Vercel Dashboard → Storage → Create Blob Store');
console.log('3. Copy the BLOB_READ_WRITE_TOKEN');
console.log('4. Add it to your environment variables');
console.log('5. Upload your .dmg file using the upload endpoint');
console.log('6. Set DOWNLOAD_URL=https://your-domain.vercel.app/api/download\n');

console.log('💡 Alternative: You can also use the public folder for simple hosting');
console.log('Just put your .dmg file in the public/ folder and reference it directly'); 