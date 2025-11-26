import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const ReckelbergEnvironmentalPage: React.FC = () => {
  const equipment = {
    id: 12,
    name: 'Reckelberg Environmental Technologies',
    image: '/Images/reckelberg-impact-reactor-new.jpg',
    description: 'Advanced environmental technology solutions including impact reactors and processing systems. Reckelberg Environmental Technologies provides innovative solutions for waste processing and environmental protection.',
    features: [
      'Impact reactor technology',
      'Advanced processing systems',
      'Environmental protection solutions',
      'High-efficiency processing',
      'Automated operation',
      'Low maintenance requirements',
      'Energy efficient design',
      'Modular system configuration',
      'Durable construction materials',
      'Comprehensive environmental solutions'
    ],
    specifications: {
      'Processing Capacity': 'Up to 60 tons per hour',
      'Processing Efficiency': '95%+ efficiency',
      'Technology': 'Impact reactor system',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'Construction': 'Modular design',
      'Materials': 'High-grade steel construction',
      'Installation': 'Easy setup and installation',
      'Control': 'Automated operation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Battery recycling', link: '/solutions/battery-recycling-systems' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp',
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/Dryer.webp',
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/Discharge.webp'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'Environmental Solutions Inc',
        quote: 'Reckelberg technology has revolutionized our environmental processing. Exceptional performance.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'EcoTech Environmental',
        quote: 'Outstanding environmental technology with excellent processing capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Environmental Systems',
        quote: 'Best environmental processing system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default ReckelbergEnvironmentalPage;
