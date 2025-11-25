import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const FoodWasteDepackagingPage: React.FC = () => {
  const solution = {
    id: 1,
    name: 'Food Waste Depackaging',
    image: '/Images/smicon-food-depackaging.jpg',
    description: 'Advanced food waste depackaging solutions for efficient separation of organic materials from packaging. Our systems maximize organic recovery while minimizing contamination for optimal composting and anaerobic digestion.',
    features: [
      'Advanced depackaging technology',
      'High-efficiency organic separation',
      'Minimal contamination output',
      'Automated processing systems',
      'Flexible packaging handling',
      'Odor control integration',
      'Quality control monitoring',
      'Modular system design',
      'Easy maintenance access',
      'Comprehensive food waste processing'
    ],
    specifications: {
      'Processing Capacity': 'Up to 20 tons per hour',
      'Organic Recovery': '95%+ organic material recovery',
      'Contamination Level': '<5% contamination',
      'Packaging Types': 'Plastic, cardboard, metal containers',
      'Processing Efficiency': '90%+ efficiency rate',
      'Technology': 'Advanced depackaging systems',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Residential SSO' },
      { name: 'Commercial SSO' },
      { name: 'Bulk food waste' },
      { name: 'Restaurant waste' },
      { name: 'Mixed supermarket waste' },
      { name: 'Packaged produce' },
      { name: 'Canned foods' },
      { name: 'Beverage cartons and cans' }
    ],
    equipment: [
      { name: 'Smicon', link: '/equipment/smicon-depackager' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/smicon-food-depackaging.jpg',
      '/Images/smicon-depackager.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default FoodWasteDepackagingPage;
