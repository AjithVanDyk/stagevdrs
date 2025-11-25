// Image loading utility to prevent CLS
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

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




