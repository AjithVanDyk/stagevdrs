import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const MSWProcessingPage: React.FC = () => {
  const solution = {
    id: 5,
    name: 'MSW Processing',
    image: '/Images/msw-processing.jpg',
    description: 'Comprehensive Municipal Solid Waste (MSW) processing solutions for efficient waste management and material recovery. Our advanced systems maximize resource recovery while minimizing environmental impact.',
    features: [
      'Mixed waste processing capabilities',
      'Advanced material separation technology',
      'High-efficiency resource recovery',
      'Automated sorting and processing',
      'Contamination reduction systems',
      'Flexible processing configurations',
      'Energy efficient operation',
      'Modular system design',
      'Real-time monitoring and control',
      'Comprehensive waste management'
    ],
    specifications: {
      'Processing Capacity': 'Up to 100 tons per hour',
      'Material Recovery': '90%+ recovery rate',
      'Contamination Level': '<10% contamination',
      'Sorting Accuracy': '98%+ material identification',
      'Waste Types': 'Mixed municipal solid waste',
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
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/2fkjMGj8ozs', // Mexico First MRF MSW Processing
      'https://youtu.be/lTQ4xEe7WOg'  // Lubo StarScreen Sorting MSW
    ],
    gallery: [
      '/Images/msw-processing.jpg',
      '/Images/mrf-systems.jpg'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'City Waste Management',
        quote: 'MSW processing has transformed our waste management operations. Recovery rates are exceptional.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'Metro Environmental Services',
        quote: 'Outstanding technology with excellent material recovery capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Waste Solutions',
        quote: 'Best MSW processing system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default MSWProcessingPage;
