const { get } = require('@vercel/blob');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, blobUrl } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Download token required' });
  }

  try {
    // Verify download token (you can implement your own token verification)
    // For now, we'll use a simple check
    if (!isValidDownloadToken(token)) {
      return res.status(401).json({ error: 'Invalid or expired download token' });
    }

    let downloadUrl;

    if (blobUrl) {
      // Use Vercel Blob storage
      try {
        const blob = await get(blobUrl);
        downloadUrl = blob.url;
      } catch (error) {
        console.error('Error accessing blob:', error);
        return res.status(404).json({ error: 'File not found in blob storage' });
      }
    } else {
      // Use direct file URL
      downloadUrl = process.env.DOWNLOAD_URL;
    }

    if (!downloadUrl) {
      return res.status(404).json({ error: 'Download URL not configured' });
    }

    // Log the download for analytics
    console.log('Download requested:', {
      token: token.substring(0, 8) + '...',
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent']
    });

    // Redirect to the actual file
    res.redirect(downloadUrl);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
};

// Simple token validation (you can enhance this)
function isValidDownloadToken(token) {
  // For now, just check if token exists and has reasonable length
  return token && token.length > 10;
} 