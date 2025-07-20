# Public Folder - File Hosting

## 📁 How to Host Your Download File

### Option 1: Simple Public Hosting (Recommended for small files)

1. **Add your .dmg file here**:
   - Put your `Floater-Window.dmg` file in this folder
   - The file will be accessible at: `https://your-domain.vercel.app/Floater-Window.dmg`

2. **Update your environment variable**:
   ```
   DOWNLOAD_URL=https://your-domain.vercel.app/Floater-Window.dmg
   ```

### Option 2: Vercel Blob Storage (For larger files or better performance)

1. Install Vercel Blob: `npm install @vercel/blob`
2. Create a Blob store in Vercel Dashboard
3. Use the upload API to store your file
4. Set `DOWNLOAD_URL=https://your-domain.vercel.app/api/download`

### File Size Limits

- **Public folder**: Good for files under 50MB
- **Vercel Blob**: Better for larger files, up to 500MB
- **External hosting**: Recommended for files over 100MB

### Security Note

Files in the public folder are publicly accessible. The download API endpoint adds security by:
- Verifying payment tokens
- Tracking downloads
- Preventing direct access without payment 