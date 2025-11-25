// Solutions data extracted from Solutions component for better maintainability

export interface Solution {
  id?: number;
  title: string;
  image: string;
  description?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  applications?: string[];
  benefits?: string[];
}

export const solutionTypes: Solution[] = [
  {
    id: 1,
    title: 'Single Stream Recycling',
    image: '/Images/image-1749759453479.png',
    description: 'Complete single stream recycling solutions for residential and commercial waste processing. Our systems efficiently separate mixed recyclables into clean, marketable materials.',
    features: [
      'Automated material separation',
      'High-purity output streams',
      'Flexible processing capacity',
      'Advanced sorting technology',
      'Comprehensive material recovery',
      'Efficient contamination removal'
    ],
    specifications: {
      'Processing Capacity': 'Up to 50 tons per hour',
      'Material Recovery': '95%+ recovery rate',
      'Purity Levels': '90%+ for all streams',
      'Technology': 'Multi-stage sorting system',
      'Applications': 'Residential, commercial, municipal'
    },
    applications: [
      'Residential recycling programs',
      'Commercial waste processing',
      'Municipal recycling facilities',
      'Mixed waste processing'
    ],
    benefits: [
      'Increased recycling rates',
      'Reduced contamination',
      'Higher material value',
      'Lower processing costs'
    ]
  },
  {
    id: 2,
    title: 'Commercial & Industrial (C&I)',
    image: '/Images/image-1749759453479.png',
    description: 'Specialized solutions for commercial and industrial waste streams. Designed to handle high-volume, diverse material types with maximum efficiency.',
    features: [
      'High-volume processing',
      'Diverse material handling',
      'Customized sorting systems',
      'Industrial-grade equipment',
      'Automated operations',
      'Quality control systems'
    ],
    specifications: {
      'Processing Capacity': 'Up to 100 tons per hour',
      'Material Types': 'Mixed commercial waste',
      'Technology': 'Advanced sorting and separation',
      'Applications': 'Manufacturing, retail, offices'
    },
    applications: [
      'Manufacturing facilities',
      'Retail operations',
      'Office buildings',
      'Distribution centers'
    ],
    benefits: [
      'Reduced disposal costs',
      'Improved sustainability',
      'Regulatory compliance',
      'Enhanced brand reputation'
    ]
  },
  {
    id: 3,
    title: 'Construction & Demolition (C&D)',
    image: '/Images/image-1749759453479.png',
    description: 'Comprehensive C&D waste processing solutions for construction sites and demolition projects. Efficiently recover valuable materials from construction debris.',
    features: [
      'Heavy-duty processing',
      'Material recovery systems',
      'Contamination removal',
      'Size reduction technology',
      'Automated sorting',
      'Quality assurance'
    ],
    specifications: {
      'Processing Capacity': 'Up to 75 tons per hour',
      'Material Recovery': 'Concrete, wood, metal, drywall',
      'Technology': 'Multi-stage processing',
      'Applications': 'Construction sites, demolition'
    },
    applications: [
      'Construction sites',
      'Demolition projects',
      'Renovation projects',
      'Infrastructure development'
    ],
    benefits: [
      'Material recovery',
      'Cost savings',
      'Environmental compliance',
      'Waste diversion'
    ]
  },
  {
    id: 4,
    title: 'Plastics Recycling',
    image: '/Images/image-1749759453479.png',
    description: 'Advanced plastics recycling solutions for various polymer types. Our systems provide high-purity plastic streams for manufacturing and reprocessing.',
    features: [
      'Polymer identification',
      'Color sorting technology',
      'Contamination removal',
      'Size reduction systems',
      'Quality control',
      'Market-ready output'
    ],
    specifications: {
      'Processing Capacity': 'Up to 30 tons per hour',
      'Polymer Types': 'PET, HDPE, PP, PS, PVC',
      'Technology': 'Optical sorting, NIR detection',
      'Applications': 'Bottles, containers, packaging'
    },
    applications: [
      'Bottle processing',
      'Container recycling',
      'Packaging materials',
      'Industrial plastics'
    ],
    benefits: [
      'High-purity output',
      'Market value optimization',
      'Environmental impact',
      'Circular economy support'
    ]
  }
];






