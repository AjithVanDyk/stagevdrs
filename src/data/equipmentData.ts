// Equipment data extracted from Equipment component for better maintainability

export interface Equipment {
  id?: number;
  name: string;
  image: string;
  description?: string;
  features?: string[];
  specifications?: { [key: string]: string | undefined };
  applications?: string[];
}

export const equipmentItems: Equipment[] = [
  {
    id: 1,
    name: 'Bollegraaf Balers',
    image: '/Images/1.jpg',
    description: 'Industry-leading single ram balers with no-shear design for maximum efficiency and density. Single ram uses 1/3 power of two-ram balers and operates automatically without dedicated operator.',
    features: [
      'Single ram uses 1/3 power of two-ram balers',
      'Operates automatically without dedicated operator',
      'Instant material switching capability',
      'Denser, uniform bales with pre-press flap',
      'Production speeds over 35 tph',
      '50% reduction in electricity costs',
      'Low maintenance robust design',
      'No-shear compression technology',
      'Flexible material processing (fiber, cardboard, plastic, steel, aluminum)',
      'Pre-press flap eliminates shearing'
    ],
    specifications: {
      'Production Speed': 'Over 35 tons per hour',
      'Power Efficiency': '50% reduction vs two-ram balers',
      'Bale Density': 'Superior compression with pre-press flap',
      'Operation': 'Fully automated',
      'Maintenance': 'Low maintenance robust design',
      'Material Switching': 'Instant capability',
      'Design': 'Single ram, no-shear',
      'Applications': 'Fiber, cardboard, plastic containers, steel, aluminum',
      'Power Usage': '1/3 of traditional two-ram balers',
      'Technology': 'Pre-press flap compression'
    }
  },
  {
    id: 2,
    name: 'Lubo StarScreen® Technology',
    image: '/Images/2.jpg',
    description: 'Patented StarScreen® technology with non-wrapping ONP screens, elliptical separators, and high-capacity 880 screens. Lubo USA LLC, founded in 1996, is a sister company of Van Dyk Recycling Solutions and exclusive distributor.',
    features: [
      'Patented StarScreen® technology with various star sizes',
      'Non-wrapping ONP screens resist wrapping for entire shifts',
      'Elliptical Separator with ballistic separation for 2D/3D sorting',
      '880 Screen processing up to 50 tons per hour',
      '95% fines diversion capability',
      'OCC Screen with adjustable star/disk spacing',
      'Specially designed stars prevent loading with film',
      'Large diameter stars with virtually no wrapping'
    ],
    specifications: {
      'Processing Capacity': 'Up to 50 tons per hour',
      'Fines Diversion': '95% of materials under 2 inches',
      'Star Diameter': '200-400 mm (large diameter)',
      'Screen Width': '2000-4000 mm (customizable)',
      'Maintenance': 'Minutes to clean, no daily maintenance',
      'Technology': 'Patented StarScreen® non-wrapping',
      'Applications': 'Single stream, C&D, MSW, green waste'
    }
  },
  {
    id: 3,
    name: 'TOMRA Optical Sorting',
    image: '/Images/3.jpg',
    description: 'Worldwide leader in optical sorting with industry-highest NIR resolution BY FAR and patented FLYING BEAM® illumination. Scanner placement up to 5 feet above conveyors (5x distance of competitors) with 95%+ purity rates maintained over long periods.',
    features: [
      'Industry-highest NIR resolution BY FAR - 5x distance capability',
      'FLYING BEAM® illumination with rotating polygon mirror',
      'SHARP EYE™ ultra-high NIR resolution for difficult materials',
      'DEEP LAISER™ laser sensor for black plastics and glass',
      'GAINnext™ Artificial Intelligence with deep-learning',
      'High-resolution metal detection combined with NIR',
      'Scanner placement up to 5 feet above conveyors',
      'AUTOSORT FLAKE technology for simultaneous detection'
    ],
    specifications: {
      'Scanner Height': 'Up to 5 feet above conveyors (5x competition)',
      'NIR Resolution': 'Highest available in optical sorting industry',
      'Purity Rates': '95%+ maintained in dirty MRF environments',
      'Material Recognition': 'PE, PP, PET, HDPE, PS, PVC, black plastics',
      'Performance Proven': '60% increase PET recovery, 15% HDPE',
      'Technology': 'FLYING BEAM® illumination, GAINnext™ AI',
      'Applications': 'Single stream, plastics, mixed waste processing'
    }
  },
  {
    id: 4,
    name: 'Pellenc ST Optical Sorting',
    image: '/Images/4.jpg',
    description: 'AI-powered optical sorting with intelligent material recognition and high-speed processing. Advanced algorithms provide superior material identification and separation accuracy.',
    features: [
      'AI-powered material recognition',
      'High-speed processing capabilities',
      'Intelligent sorting algorithms',
      'Superior material identification',
      'Advanced separation technology',
      'Real-time learning capabilities',
      'High accuracy rates',
      'Flexible material processing'
    ],
    specifications: {
      'Processing Speed': 'High-speed continuous operation',
      'Accuracy': 'Superior material identification',
      'Technology': 'AI-powered optical sorting',
      'Learning': 'Real-time algorithm adaptation',
      'Applications': 'Mixed waste, plastics, recyclables'
    }
  }
];






