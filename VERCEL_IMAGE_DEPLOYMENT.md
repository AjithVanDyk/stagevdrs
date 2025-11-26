# Vercel Image Deployment Guide

## Current Status

✅ **Images are being copied correctly** - All 252 images are present in `dist/Images` after build.

## What We've Fixed

### 1. Enhanced `vercel.json` Configuration
- Added explicit rewrites for `/Images/*` paths
- Added rewrites for static file extensions (jpg, png, etc.)
- Ensured proper routing order (static files before SPA fallback)

### 2. Post-Build Verification
- Created `scripts/post-build-verify.js` to verify images after build
- Integrated into `build:vercel` command
- Checks for critical images and counts total images

### 3. Image Path Verification
- Created `scripts/verify-images.js` to check all image references
- Verifies that all referenced images exist in `public/Images`

## Deployment Checklist

Before deploying to Vercel:

1. ✅ **Verify images are in git:**
   ```bash
   git ls-files public/Images | wc -l
   # Should show 252+ files
   ```

2. ✅ **Run build verification:**
   ```bash
   npm run build:vercel
   # This will build and verify images are copied
   ```

3. ✅ **Check dist/Images exists:**
   ```bash
   ls -la dist/Images
   # Should show all image files
   ```

## Troubleshooting Images on Vercel

### Issue: Images return 404

**Solution 1: Check Vercel Build Logs**
- Go to Vercel Dashboard → Your Project → Deployments
- Check the build logs for any errors
- Verify that `dist/Images` is present in the build output

**Solution 2: Verify Image Paths**
- All image paths with spaces must be URL-encoded
- Example: `Product image.jpg` → `Product%20image.jpg`
- Check browser console for exact 404 paths

**Solution 3: Check Case Sensitivity**
- Vercel uses Linux (case-sensitive)
- Ensure file names match exactly (including case)
- Example: `Logo.png` ≠ `logo.png`

**Solution 4: Verify Rewrite Rules**
- Check `vercel.json` rewrite rules
- Ensure `/Images/:path*` rewrite is before the catch-all
- Static file extension rewrite should catch image files

### Issue: Images load locally but not on Vercel

**Possible Causes:**
1. Images not committed to git
2. Case sensitivity mismatch
3. URL encoding issues
4. Rewrite rules not working

**Debug Steps:**
1. Check Vercel build logs
2. Inspect network tab in browser (check actual URLs)
3. Verify image exists in Vercel deployment:
   - Go to: `https://your-site.vercel.app/Images/filename.jpg`
   - If 404, check exact filename and case

## Alternative Solutions

### Option 1: Use Vercel Image Optimization
If images still don't work, consider using Vercel's Image Optimization API:

```tsx
import Image from 'next/image'; // For Next.js
// Or use Vercel's image optimization directly
<img src={`/_vercel/image?url=${encodeURIComponent('/Images/image.jpg')}`} />
```

### Option 2: Use External CDN
Upload images to:
- Cloudinary
- AWS S3 + CloudFront
- Imgix
- Then update image paths in code

### Option 3: Base64 Encode Small Images
For small images (< 10KB), embed as base64:
```tsx
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRg..." />
```

### Option 4: Use Vite's Public Assets
Ensure images are in `public/Images/` (not `src/`)
- Vite automatically copies `public/` to `dist/`
- Reference as `/Images/filename.jpg` (absolute path)

## Current Configuration

### vercel.json
```json
{
  "rewrites": [
    { "source": "/Images/:path*", "destination": "/Images/:path*" },
    { "source": "/(.*\\.(jpg|jpeg|png|gif|svg|webp))", "destination": "/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Process
1. `npm run build` - Builds the project
2. Vite copies `public/Images/` → `dist/Images/`
3. `post-build-verify.js` - Verifies images are present
4. Vercel deploys `dist/` directory

## Verification Commands

```bash
# Verify images in git
git ls-files public/Images | wc -l

# Verify images after build
npm run build:vercel

# Check specific image
ls -la dist/Images/first.jpg

# Count all images
find dist/Images -type f | wc -l
```

## Next Steps if Issues Persist

1. **Check Vercel Deployment Logs**
   - Look for any errors during build
   - Check if `dist/Images` is being uploaded

2. **Test Image URLs Directly**
   - Visit: `https://your-site.vercel.app/Images/first.jpg`
   - If 404, check exact filename and case

3. **Enable Vercel Debug Mode**
   - Add `?debug=1` to URL
   - Check network requests in browser

4. **Contact Vercel Support**
   - If all else fails, contact Vercel with:
     - Build logs
     - Example failing image URL
     - vercel.json configuration

## Success Indicators

✅ Build completes without errors
✅ `dist/Images` contains 252+ images
✅ Post-build verification passes
✅ Images accessible at `/Images/filename.jpg`
✅ No 404 errors in browser console

---

**Last Updated:** After fixing image deployment issues
**Status:** Ready for Vercel deployment

