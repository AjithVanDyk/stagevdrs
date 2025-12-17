/**
 * @fileoverview Image loading utilities to prevent Cumulative Layout Shift (CLS)
 * and improve user experience with proper image loading states.
 * @author Van Dyk Recycling Solutions
 * @module utils/imageLoader
 */

/**
 * Preloads an image and returns a promise that resolves when the image is loaded.
 * This helps prevent layout shifts by ensuring images are loaded before display.
 * 
 * @param {string} src - The image source URL to preload
 * @returns {Promise<HTMLImageElement>} Promise that resolves with the loaded Image element
 * @throws {Error} Rejects if the image fails to load
 * 
 * @example
 * ```typescript
 * try {
 *   const img = await preloadImage('/Images/equipment/baler.jpg');
 *   // Image is now loaded and ready to use
 * } catch (error) {
 *   console.error('Failed to preload image:', error);
 * }
 * ```
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Sets up fallback handling for an image element. Adds a 'loaded' class when the image
 * successfully loads, and handles fallback image or hiding on error.
 * 
 * @param {HTMLImageElement} img - The image element to configure
 * @param {string} [fallbackSrc] - Optional fallback image source if primary image fails
 * 
 * @example
 * ```typescript
 * const imgElement = document.querySelector('img');
 * loadImageWithFallback(imgElement, '/Images/fallback.jpg');
 * ```
 */
export const loadImageWithFallback = (img: HTMLImageElement, fallbackSrc?: string) => {
  const originalSrc = img.src;
  
  img.onload = () => {
    img.classList.add('loaded');
  };
  
  img.onerror = () => {
    if (fallbackSrc && img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    } else {
      img.style.display = 'none';
    }
  };
  
  // If image is already loaded
  if (img.complete) {
    img.classList.add('loaded');
  }
};

/**
 * Initializes image loading for all images on the page. Adds 'loaded' class to images
 * that are already loaded, and sets up fallback handling for images that haven't loaded yet.
 * This should be called after the DOM is ready to improve CLS scores.
 * 
 * @example
 * ```typescript
 * // In your main component or app initialization
 * useEffect(() => {
 *   initializeImageLoading();
 * }, []);
 * ```
 */
export const initializeImageLoading = () => {
  // Add loaded class to images that are already loaded
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      loadImageWithFallback(img);
    }
  });
};




