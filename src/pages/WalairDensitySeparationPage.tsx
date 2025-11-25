import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const WalairDensitySeparationPage: React.FC = () => {
  const equipment = {
    id: 5,
    name: 'Walair Density Separation',
    image: '/Images/walair-density-separation.jpg',
    description: 'Advanced density separation technology for efficient material sorting based on specific gravity. Walair systems provide precise separation of materials with different densities.',
    features: [
      'Density-based material separation',
      'High-precision sorting technology',
      'Multiple density separation stages',
      'Automated material handling',
      'Low maintenance design',
      'Energy efficient operation',
      'Modular construction',
      'Easy integration with existing systems',
      'Precise density control',
      'Robust construction materials'
    ],
    specifications: {
      'Separation Accuracy': '99%+ density-based sorting',
      'Throughput': 'Up to 50 tons per hour',
      'Density Range': '0.1 to 8.0 g/cm³',
      'Separation Stages': '1-3 stage configurations',
      'Power Consumption': 'Low energy consumption',
      'Maintenance': 'Minimal maintenance required',
      'Construction': 'Modular design',
      'Integration': 'Easy system integration',
      'Control': 'Automated density control',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      'Material recovery facilities (MRF)',
      'Plastic recycling operations',
      'Metal recovery facilities',
      'Glass processing plants',
      'Mixed waste sorting',
      'Industrial waste management',
      'Municipal recycling centers',
      'Commercial waste processing',
      'Construction waste management',
      'Electronic waste processing'
    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/walair-density-separation.jpg'
    ],
    testimonials: [
      {
        name: 'Jennifer Chen',
        company: 'Density Solutions Inc',
        quote: 'Walair density separation technology has transformed our material sorting accuracy.',
        rating: 5
      },
      {
        name: 'Michael Torres',
        company: 'Precision Recycling',
        quote: 'Outstanding density separation performance with minimal maintenance requirements.',
        rating: 5
      },
      {
        name: 'Lisa Anderson',
        company: 'EcoSort Technologies',
        quote: 'Excellent investment. The density separation accuracy exceeds all expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default WalairDensitySeparationPage;
