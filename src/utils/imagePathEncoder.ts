/**
 * @fileoverview Image Path Encoder
 * Encodes image paths to handle spaces and special characters for Vercel deployment.
 * Vercel (Linux) is case-sensitive and requires URL encoding for spaces.
 * @author Van Dyk Recycling Solutions
 * @module utils/imagePathEncoder
 */

/**
 * Encodes an image path to handle spaces and special characters for Vercel compatibility.
 * This is critical because Vercel's Linux-based file system is case-sensitive and requires
 * URL encoding for spaces in filenames.
 * 
 * @param {string} path - The image path to encode (e.g., '/Images/VAN DYK-logo-WHITE.png')
 * @returns {string} Encoded path safe for Vercel (e.g., '/Images/VAN%20DYK-logo-WHITE.png')
 * 
 * @example
 * ```typescript
 * const encoded = encodeImagePath('/Images/Product image_baler.jpg');
 * // Returns: '/Images/Product%20image_baler.jpg'
 * ```
 */
export const encodeImagePath = (path: string): string => {
  if (!path) return path;
  
  // Split path into directory parts to preserve structure
  // Example: '/Images/Product image.jpg' → ['', 'Images', 'Product image.jpg']
  const parts = path.split('/');
  
  // Encode each part individually (especially filenames with spaces)
  // This preserves directory structure while encoding only filenames
  const encodedParts = parts.map(part => {
    // Don't encode empty parts (root '/') or already URL-encoded parts
    // This prevents double-encoding issues
    if (!part || part.includes('%')) return part;
    
    // Encode spaces and special characters (critical for Vercel's case-sensitive Linux filesystem)
    // encodeURIComponent handles: spaces → %20, special chars → encoded equivalents
    return encodeURIComponent(part);
  });
  
  // Rejoin parts with '/' separator to reconstruct path
  return encodedParts.join('/');
};

/**
 * Type for values that can contain image paths.
 */
type ImagePathValue = string | number | boolean | null | undefined | ImagePathValue[] | Record<string, ImagePathValue>;

/**
 * Recursively encodes all image paths in an object or array structure.
 * Useful for encoding image paths in configuration objects or data structures.
 * 
 * @template T - The type of the input value
 * @param {T} obj - The object, array, or value to process
 * @returns {T} Object with all image paths encoded (strings starting with '/Images/')
 * 
 * @example
 * ```typescript
 * const config = {
 *   hero: '/Images/Hero image.jpg',
 *   gallery: ['/Images/Image 1.jpg', '/Images/Image 2.jpg']
 * };
 * const encoded = encodeImagePaths(config);
 * // Returns: { hero: '/Images/Hero%20image.jpg', gallery: [...] }
 * ```
 */
export const encodeImagePaths = <T extends ImagePathValue>(obj: T): T => {
  if (typeof obj === 'string' && obj.startsWith('/Images/')) {
    return encodeImagePath(obj) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => encodeImagePaths(item)) as T;
  }
  
  if (obj && typeof obj === 'object' && obj !== null) {
    const encoded: Record<string, ImagePathValue> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        encoded[key] = encodeImagePaths((obj as Record<string, ImagePathValue>)[key]);
      }
    }
    return encoded as T;
  }
  
  return obj;
};










