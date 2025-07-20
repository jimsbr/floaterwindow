const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadDMG() {
  try {
    // Path to your .dmg file
    const dmgPath = path.join(__dirname, 'public', 'FloaterWindow.dmg');
    
    // Check if file exists
    if (!fs.existsSync(dmgPath)) {
      console.error('❌ FloaterWindow.dmg not found in public/ directory');
      console.log('📁 Please place your FloaterWindow.dmg file in the public/ directory');
      return;
    }
    
    console.log('📤 Uploading FloaterWindow.dmg to Vercel Blob...');
    
    // Read the file
    const fileBuffer = fs.readFileSync(dmgPath);
    
    // Upload to Vercel Blob
    const blob = await put('FloaterWindow.dmg', fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('✅ File uploaded successfully!');
    console.log('🔗 Blob URL:', blob.url);
    console.log('📦 Blob Size:', blob.size, 'bytes');
    
    // Save the URL to a config file for the server to use
    const config = {
      dmgUrl: blob.url,
      uploadedAt: new Date().toISOString(),
      size: blob.size
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'dmg-config.json'), 
      JSON.stringify(config, null, 2)
    );
    
    console.log('💾 Configuration saved to dmg-config.json');
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

uploadDMG(); 