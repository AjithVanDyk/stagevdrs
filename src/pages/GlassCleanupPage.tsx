import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const GlassCleanupPage: React.FC = () => {
  const solution = {
    id: 11,
    name: 'Glass Cleanup',
    image: '/Images/glass-cleanup.jpg',
    description: 'Specialized glass cleanup and processing solutions for contaminated glass streams. Our advanced technology purifies glass materials and prepares them for market-ready applications.',
    features: [
      'Contaminated glass processing',
      'Advanced cleaning technology',
      'Market-ready glass production',
      'Contamination removal systems',
      'Quality control monitoring',
      'Automated processing',
      'Energy efficient operation',
      'Modular system design',
      'Flexible processing capabilities',
      'High-purity glass output'
    ],
    specifications: {
      'Processing Capacity': 'Up to 25 tons per hour',
      'Glass Purity': '99%+ contamination removal',
      'Processing Efficiency': '95%+ glass recovery',
      'Contamination Removal': 'Advanced cleaning technology',
      'Glass Types': 'Mixed glass streams',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/glass-cleanup.jpg',
      '/Images/glass-cleanup-1.jpg',
      '/Images/glass-cleanup-2.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default GlassCleanupPage;
