const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');

// In-memory token storage (in production, use a database)
const validTokens = new Set();

// Cloudflare R2 configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://your-account-id.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'your-access-key',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'your-secret-key',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'floater-window-downloads';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Download token required' });
  }

  // Validate token (in production, check against database)
  if (!validTokens.has(token)) {
    return res.status(403).json({ error: 'Invalid or expired download token' });
  }

  try {
    // Generate a signed URL for secure download
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'Floater Window-1.0.4-arm64.dmg',
    });

    // Create signed URL with 1-hour expiration
    const signedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600, // 1 hour
    });

    // Remove token after successful URL generation (one-time use)
    validTokens.delete(token);

    // Return the signed URL for download
    res.json({
      success: true,
      downloadUrl: signedUrl,
      expiresIn: 3600,
      message: 'Secure download URL generated'
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
}

// Function to add valid tokens (called when payment is successful)
function addValidToken(token) {
  validTokens.add(token);
}

// Function to generate secure tokens
function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Export functions for use in server.js
module.exports = {
  handler,
  addValidToken,
  generateSecureToken
}; 