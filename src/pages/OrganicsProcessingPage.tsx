import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const OrganicsProcessingPage: React.FC = () => {
  const solution = {
    id: 3,
    name: 'Organics Processing',
    image: '/Images/organics-processing.jpg',
    description: 'Advanced organics processing solutions for efficient handling of food waste, yard waste, and other organic materials. Our technology maximizes organic recovery and produces valuable compost.',
    features: [
      'Food waste processing',
      'Yard waste handling',
      'Compost production',
      'Odor control systems',
      'Pathogen reduction',
      'Nutrient recovery',
      'Automated processing',
      'Environmental compliance',
      'Modular system design',
      'Quality control monitoring'
    ],
    specifications: {
      'Processing Capacity': 'Up to 75 tons per day',
      'Compost Production': 'High-quality compost output',
      'Pathogen Reduction': '99.9%+ pathogen elimination',
      'Odor Control': 'Advanced odor management',
      'Processing Time': '14-21 day cycle',
      'Nutrient Recovery': 'Optimal nutrient retention',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Food waste processing', link: '/solutions/organics-processing' },
      { name: 'Compost refining', link: '/solutions/composting-densimetric-tables' },
      { name: 'Odor control', link: '/equipment/centriair-odor-control' },
      { name: 'Yard waste' },
      { name: 'Green waste' }
    ],
    equipment: [
      { name: 'Gunther Screen', link: '/equipment/gunther-screens' },
      { name: 'Smicon', link: '/equipment/smicon-depackager' },
      { name: 'Densimetric table', link: '/equipment/densimetric-table' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' }
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw', // New Densimetric Table
      'https://youtu.be/ircipzTwJRM'  // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/organics-processing.jpg',
      '/Images/composting.jpg'
    ],
    testimonials: [
      {
        name: 'Mark Johnson',
        company: 'Green Compost Solutions',
        quote: 'Organics processing has transformed our waste management. High-quality compost production.',
        rating: 5
      },
      {
        name: 'Sarah Davis',
        company: 'EcoOrganics Inc',
        quote: 'Outstanding technology with excellent odor control and pathogen reduction.',
        rating: 5
      },
      {
        name: 'Michael Brown',
        company: 'Sustainable Composting',
        quote: 'Best organics processing system we\'ve used. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default OrganicsProcessingPage;
