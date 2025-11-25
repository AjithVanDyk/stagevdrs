/**
 * Image Path Encoder
 * Encodes image paths to handle spaces and special characters for Vercel deployment
 * Vercel (Linux) is case-sensitive and requires URL encoding for spaces
 */

/**
 * Encodes an image path to handle spaces and special characters
 * @param path - The image path (e.g., '/Images/VAN DYK-logo-WHITE.png')
 * @returns Encoded path safe for Vercel (e.g., '/Images/VAN%20DYK-logo-WHITE.png')
 */
export const encodeImagePath = (path: string): string => {
  if (!path) return path;
  
  // Split path into parts
  const parts = path.split('/');
  
  // Encode each part (especially filenames with spaces)
  const encodedParts = parts.map(part => {
    // Don't encode empty parts or already encoded parts
    if (!part || part.includes('%')) return part;
    
    // Encode spaces and special characters
    return encodeURIComponent(part);
  });
  
  return encodedParts.join('/');
};

/**
 * Helper to encode image paths in an object recursively
 */
export const encodeImagePaths = (obj: any): any => {
  if (typeof obj === 'string' && obj.startsWith('/Images/')) {
    return encodeImagePath(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => encodeImagePaths(item));
  }
  
  if (obj && typeof obj === 'object') {
    const encoded: any = {};
    for (const key in obj) {
      encoded[key] = encodeImagePaths(obj[key]);
    }
    return encoded;
  }
  
  return obj;
};

