import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const SingleStreamRecyclingPage: React.FC = () => {
  const solution = {
    id: 1,
    name: 'Single Stream Recycling',
    image: '/Images/single-stream-recycling.jpg',
    description: 'Comprehensive single stream recycling solutions that process mixed recyclables efficiently. Our advanced technology separates paper, plastic, metal, and glass in one streamlined process.',
    features: [
      'Mixed recyclable processing in one stream',
      'Advanced optical sorting technology',
      'High-efficiency material separation',
      'Automated sorting and baling systems',
      'Real-time quality monitoring',
      'Flexible processing capabilities',
      'Low contamination rates',
      'Energy efficient operation',
      'Modular system design',
      'Comprehensive material recovery'
    ],
    specifications: {
      'Processing Capacity': 'Up to 50 tons per hour',
      'Material Recovery': '95%+ recovery rate',
      'Contamination Level': '<5% contamination',
      'Sorting Accuracy': '99%+ material identification',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Material Types': 'Paper, plastic, metal, glass',
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
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/Qerp8XcGDw0', // A New Way to Sort Single Stream
      'https://youtu.be/M5nmNKVNCBw', // Single Stream Recycling Tour Material Recovery Facility
      'https://youtu.be/QFmP4fvjk6I', // Positive Sorting Next Gen MRF
      'https://youtu.be/9dxwdU9iGOM', // Building a 25 TPH Single Stream Recycling Facility
      'https://youtu.be/QYaqrF9vNbU'  // Norwalk CT Education and Testing Center
    ],
    gallery: [
      '/Images/single-stream-recycling.jpg',
      '/Images/mrf-systems.jpg'
    ],
    testimonials: [
      {
        name: 'Kevin Hanner',
        company: 'Smurfit Westrock',
        quote: 'Todd presented the information in an easy to understand format and was very thorough in his explanations. The small class size gave us the ability to dive deep into technical details.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default SingleStreamRecyclingPage;
