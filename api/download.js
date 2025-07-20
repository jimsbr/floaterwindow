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

  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Download token is required' });
    }

    // In a real application, you would verify the token against your database
    // For now, we'll use a simple approach
    // You should implement proper token validation here

    // For demo purposes, we'll redirect to the actual download
    // In production, you might want to serve the file directly or use a CDN
    
    // Replace this URL with your actual .dmg file URL
    const downloadUrl = process.env.DOWNLOAD_URL || 'https://github.com/jimbrend/YouTube-Floater/releases/download/v0.5.0/YouTube.Floater-0.5.0-arm64.dmg';
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="Floater-Window.dmg"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Redirect to the actual file
    res.redirect(downloadUrl);

  } catch (error) {
    console.error('Error handling download:', error);
    res.status(500).json({ error: 'Failed to process download' });
  }
}; 