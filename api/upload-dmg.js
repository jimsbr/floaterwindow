import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Path to your .dmg file (you'll need to add this to your project)
    const dmgPath = join(process.cwd(), 'public', 'FloaterWindow.dmg');
    
    // Read the file
    const fileBuffer = readFileSync(dmgPath);
    
    // Upload to Vercel Blob
    const blob = await put('FloaterWindow.dmg', fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('File uploaded to Vercel Blob:', blob.url);
    
    res.json({
      success: true,
      url: blob.url,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload file'
    });
  }
} 