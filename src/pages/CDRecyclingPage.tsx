import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const CDRecyclingPage: React.FC = () => {
  const solution = {
    id: 3,
    name: 'C&D Recycling',
    image: '/Images/cd-recycling.jpg',
    description: 'Specialized Construction and Demolition (C&D) waste recycling solutions for construction sites, demolition projects, and renovation activities. Our systems efficiently process C&D materials with maximum recovery and minimal environmental impact.',
    features: [
      'C&D waste processing systems',
      'High-efficiency material recovery',
      'Heavy-duty processing equipment',
      'Flexible material handling',
      'Dust suppression systems',
      'Quality control monitoring',
      'Modular processing systems',
      'Easy maintenance access',
      'Environmental compliance',
      'Comprehensive C&D solutions'
    ],
    specifications: {
      'Processing Capacity': 'Up to 100 tons per hour',
      'Material Recovery': '80%+ recovery rate',
      'Material Types': 'Concrete, wood, metal, drywall',
      'Processing Efficiency': '85%+ efficiency rate',
      'Technology': 'Heavy-duty processing systems',
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
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/MOjFp3y7mEw', // Construction and Demolition Waste Sorting System
      'https://youtu.be/Lt-ZYSw6p3w'  // Lubo Neptune AWS StarScreen Sorting C&D Waste
    ],
    gallery: [
      '/Images/cd-recycling.jpg',
      '/Images/cdrecycle.jpg'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'C&D Recycling Solutions',
        quote: 'C&D recycling has revolutionized our construction waste management. Exceptional recovery rates.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'EcoConstruction Systems',
        quote: 'Outstanding C&D processing technology with excellent material recovery capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Building Solutions',
        quote: 'Best C&D waste system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default CDRecyclingPage;
