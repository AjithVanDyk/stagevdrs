// Centralized Image Configuration
// This file manages all image assignments across the website to ensure no repetition
// Note: All paths with spaces are URL-encoded for Vercel compatibility (case-sensitive Linux server)

export const IMAGE_ASSIGNMENTS = {
  // HOMEPAGE IMAGES
  homepage: {
    hero: '/Images/image-1749759459073.png',
    heroFallback: '/Images/first.jpg',
    services: {
      singleStream: '/Images/single-stream-recycling.jpg',
      bollegraaf: '/Images/bollegraaf-new-1.jpg',
      expertConsulting: '/Images/van-dyk-direct-logo.png',
      globalSupport: '/Images/van-dyk-university.jpg'
    },
    training: '/Images/Logos/Van%20Dyk%20University%20logo.png',
    orderParts: '/Images/van-dyk-direct.jpg',
    orderPartsFallback: '/Images/image-1749759453479.png'
  },

  // ABOUT PAGE IMAGES
  about: {
    slideshow: [
      '/Images/bollegraaf-new-1.jpg',
      '/Images/tomra-optical-sorting-new.jpg',
      '/Images/glass-cleanup-1.jpg',
      '/Images/smicon-depackager-new.jpg',
      '/Images/lubo-screening-new.jpg',
      '/Images/greyparrot-ai-new.jpg',
      '/Images/centriair-new-1.jpg',
      '/Images/pellenc-optical-new.jpg',
      '/Images/gunther-screens-new.jpg'
    ],
    leadership: {
      chrisBova: '/Images/leadership-chris-bova.jpg',
      evd: '/Images/leadership-evd.jpg',
      markNeitzey: '/Images/leadership-mark-neitzey.jpg',
      pvd: '/Images/leadership-pvd.jpg',
      maarten: '/Images/leadership-maarten.jpg'
    }
  },

  // EQUIPMENT PAGE IMAGES
  equipment: {
    hero: '/Images/equipment-hero.jpg',
    categories: {
      bollegraaf: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg',
      tomra: '/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg',
      pellenc: '/Images/Equipment/Pellenc%20optical%20sorters/Product%20image_pellenc.JPG',
      lubo: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg',
      gunther: '/Images/Equipment/Gunther%20screens/IMG_8615.jpg',
      smicon: '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg',
      centriair: '/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG',
      greyparrot: '/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png',
      densimetric: '/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg',
      beefoam: '/Images/Equipment/Beefoam%20dust%20suppression/after%20beefoam.JPG',
      reckelberg: '/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp',
      walair: '/Images/walair-density-separation.jpg',
      certified: '/Images/Equipment/Certified%20Pre-owned%20Equipment/rebuilt%20baler.png'
    }
  },

  // SOLUTIONS PAGE IMAGES
  solutions: {
    hero: '/Images/image-1749759459073.png',
    categories: {
      singleStream: '/Images/image-1749759490576.png',
      plastics: '/Images/plastics-recycling.jpg',
      electronics: '/Images/electronics-recycling.jpg',
      battery: '/Images/battery-recycling.jpg',
      glass: '/Images/glass-cleanup-2.jpg',
      composting: '/Images/composting.jpg',
      bollegraafBalers: '/Images/bollegraaf-baler.jpg',
      aiAnalytics: '/Images/greyparrot-ai-recognition.jpg',
      multiMrf: '/Images/image-1749759495211.png',
      msw: '/Images/msw-processing.jpg',
      commercial: '/Images/commercial-waste-processing.jpg',
      cd: '/Images/cd-recycling.jpg',
      organics: '/Images/organics-processing.jpg',
      foodWaste: '/Images/smicon-food-depackaging.jpg',
      wasteToEnergy: '/Images/waste-to-energy.jpg'
    }
  },

  // CAREERS PAGE IMAGES
  careers: {
    hero: '/Images/careers-hero.jpg',
    slideshow: [
      '/Images/careers-front-lobby.jpg',
      '/Images/careers-new-york-board-room.jpg',
      '/Images/careers-cafe-1.jpg',
      '/Images/careers-exterior-2.jpg',
      '/Images/careers-gym.jpg',
      '/Images/careers-living-wall-2.jpg',
      '/Images/careers-lounge-1.jpg'
    ]
  },

  // CONTACT PAGE IMAGES
  contact: {
    hero: '/Images/contact-img-6050.jpg',
    gallery: [
      '/Images/contact-1-01619.jpg',
      '/Images/contact-1-01725.jpg',
      '/Images/contact-1-01741.jpg',
      '/Images/contact-1-01749.jpg',
      '/Images/contact-img-2299.jpg',
      '/Images/contact-wm-mesquite-10.jpg',
      '/Images/contact-wm-mesquite-19.jpg',
      '/Images/contact-wm-mesquite-5.jpg'
    ]
  },

  // SERVICES & SUPPORT PAGE IMAGES
  servicesSupport: {
    hero: '/Images/test-center-hero.jpg',
    stats: [
      '/Images/image-1749759467073.png',
      '/Images/image-1749759472678.png',
      '/Images/image-1749759476027.png',
      '/Images/image-1749759479881.png'
    ]
  },

  // NEWS & MEDIA PAGE IMAGES
  newsMedia: {
    hero: '/Images/Equipment/Header%20image%20for%20Equipment%20grid.jpg',
    featured: [
      '/Images/image-1749759487003.png',
      '/Images/image-1749759499434.png',
      '/Images/image-1749759502636.png',
      '/Images/image-1749759506179.png'
    ]
  },

  // LOGOS AND BRANDING
  branding: {
    mainLogo: '/Images/van-dyk-direct-logo.png',
    whiteLogo: '/Images/van-dyk-direct-logo.png',
    directLogo: '/Images/van-dyk-direct.jpg',
    favicon: '/Images/van-dyk-direct-logo.png'
  },

  // FALLBACK IMAGES
  fallbacks: {
    default: '/Images/image-1749759453479.png',
    equipment: '/Images/bollegraaf-baler.jpg',
    solution: '/Images/single-stream-recycling.jpg',
    service: '/Images/van-dyk-university.jpg'
  }
};

// Helper function to get random image from array
export const getRandomImage = (imageArray: string[]): string => {
  return imageArray[Math.floor(Math.random() * imageArray.length)];
};

// Helper function to get image with fallback
export const getImageWithFallback = (primaryImage: string, fallbackImage: string): string => {
  return primaryImage || fallbackImage;
};

// Image categories for easy access
export const IMAGE_CATEGORIES = {
  EQUIPMENT: 'equipment',
  SOLUTIONS: 'solutions',
  CAREERS: 'careers',
  CONTACT: 'contact',
  SERVICES: 'servicesSupport',
  NEWS: 'newsMedia',
  BRANDING: 'branding'
} as const;


