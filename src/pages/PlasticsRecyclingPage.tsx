import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const PlasticsRecyclingPage: React.FC = () => {
  const solution = {
    id: 2,
    name: 'Plastics Recycling',
    image: '/Images/plastics-recycling.jpg',
    description: 'Advanced plastics recycling solutions for efficient processing and recovery of various plastic materials. Our technology maximizes plastic recovery while minimizing contamination.',
    features: [
      'Multi-plastic type processing',
      'Advanced optical sorting technology',
      'High-purity plastic recovery',
      'Automated sorting and baling',
      'Contamination reduction systems',
      'Flexible processing capabilities',
      'Energy efficient operation',
      'Modular system design',
      'Real-time quality monitoring',
      'Comprehensive plastic recovery'
    ],
    specifications: {
      'Processing Capacity': 'Up to 30 tons per hour',
      'Plastic Recovery': '98%+ recovery rate',
      'Contamination Level': '<2% contamination',
      'Sorting Accuracy': '99.5%+ material identification',
      'Plastic Types': 'PET, HDPE, PP, PS, PVC',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
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
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/8Xj4Zwv81uE', // Container Line Featuring Optical Sorting
      'https://youtu.be/FfoIMHZv9CQ', // Container Line Featuring Optical Sorting 2
      'https://youtu.be/r6qxQsl7ABU'  // Cardboard and Paper Separation Purifying Fiber Lines
    ],
    localVideos: [
      '/Images/plastics-recycling-white-bg.mp4'
    ],
    gallery: [
      '/Images/plastics-recycling.jpg',
      '/Images/7-Plastics-Recycling-c.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default PlasticsRecyclingPage;
