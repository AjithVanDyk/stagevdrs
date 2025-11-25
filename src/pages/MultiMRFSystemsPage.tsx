import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const MultiMRFSystemsPage: React.FC = () => {
  const solution = {
    id: 4,
    name: 'Multi-MRF™ Systems',
    image: '/Images/mrf-systems.jpg',
    description: 'Advanced Multi-Material Recovery Facility (MRF) systems for comprehensive waste processing and material recovery. Our Multi-MRF™ technology provides integrated solutions for multiple waste streams with maximum efficiency and recovery rates.',
    features: [
      'Multi-material processing capability',
      'Integrated MRF technology',
      'High-efficiency material recovery',
      'Automated sorting systems',
      'Flexible waste stream handling',
      'Advanced control systems',
      'Modular system design',
      'Easy maintenance access',
      'Environmental compliance',
      'Comprehensive MRF solutions'
    ],
    specifications: {
      'Processing Capacity': 'Up to 200 tons per hour',
      'Material Recovery': '90%+ recovery rate',
      'Waste Streams': 'Multiple material types',
      'Processing Efficiency': '95%+ efficiency rate',
      'Technology': 'Advanced MRF systems',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Compliance': 'Environmental regulations',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/Qerp8XcGDw0', // A New Way to Sort Single Stream
      'https://youtu.be/M5nmNKVNCBw', // Single Stream Recycling Tour Material Recovery Facility
      'https://youtu.be/QFmP4fvjk6I', // Positive Sorting Next Gen MRF
      'https://youtu.be/9dxwdU9iGOM'  // Building a 25 TPH Single Stream Recycling Facility
    ],
    gallery: [
      '/Images/mrf-systems.jpg',
      '/Images/single-stream-recycling.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default MultiMRFSystemsPage;
