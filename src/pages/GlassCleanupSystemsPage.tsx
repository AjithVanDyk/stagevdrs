import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const GlassCleanupSystemsPage: React.FC = () => {
  const equipment = {
    id: 14,
    name: 'Glass Cleanup Systems',
    image: '/Images/glass-cleanup.jpg',
    description: 'Specialized glass cleanup and processing systems for contaminated glass streams. Our advanced technology purifies glass materials and prepares them for market-ready applications.',
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
    applications: [
      'Glass recycling facilities',
      'Material recovery facilities (MRF)',
      'Single stream recycling',
      'Mixed waste processing',
      'Commercial recycling centers',
      'Municipal recycling programs',
      'Industrial waste management',
      'Construction waste processing',
      'Event waste management',
      'Disaster waste processing'
    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/glass-cleanup.jpg',
      '/Images/glass-cleanup-1.jpg',
      '/Images/glass-cleanup-2.jpg'
    ],
    testimonials: [
      {
        name: 'Lisa Chen',
        company: 'Glass Solutions Inc',
        quote: 'Glass cleanup technology has revolutionized our glass processing. Exceptional purity rates.',
        rating: 5
      },
      {
        name: 'David Park',
        company: 'Crystal Clear Recycling',
        quote: 'Outstanding contamination removal with market-ready glass output.',
        rating: 5
      },
      {
        name: 'Maria Rodriguez',
        company: 'Pure Glass Systems',
        quote: 'Best glass cleanup system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default GlassCleanupSystemsPage;
