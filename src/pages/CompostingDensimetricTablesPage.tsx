import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const CompostingDensimetricTablesPage: React.FC = () => {
  const solution = {
    id: 4,
    name: 'Composting Densimetric Tables',
    image: '/Images/densimetric-table-new.jpg',
    description: 'Advanced composting solutions using densimetric table technology for efficient organic material processing and compost production. Our systems maximize organic recovery and produce high-quality compost.',
    features: [
      'Densimetric table technology',
      'Organic material processing',
      'High-quality compost production',
      'Automated processing systems',
      'Odor control integration',
      'Pathogen reduction',
      'Nutrient optimization',
      'Quality control monitoring',
      'Modular system design',
      'Comprehensive composting solutions'
    ],
    specifications: {
      'Processing Capacity': 'Up to 30 tons per day',
      'Compost Quality': 'High-grade compost output',
      'Pathogen Reduction': '99.9%+ elimination',
      'Odor Control': 'Integrated odor management',
      'Processing Time': '14-21 day cycle',
      'Nutrient Recovery': 'Optimal nutrient retention',
      'Technology': 'Densimetric table processing',
      'Maintenance': 'Low maintenance requirements',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Organics processing', link: '/solutions/organics-processing' }
    ],
    equipment: [
      { name: 'Densimetric table', link: '/equipment/densimetric-table' }
    ],
    gallery: [
      '/Images/densimetric-table-new.jpg',
      '/Images/composting.jpg'
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw'  // New Densimetric Table
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default CompostingDensimetricTablesPage;
