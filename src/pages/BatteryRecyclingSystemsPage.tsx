import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const BatteryRecyclingSystemsPage: React.FC = () => {
  const solution = {
    id: 2,
    name: 'Battery Recycling Systems',
    image: '/Images/battery-recycling.jpg',
    description: 'Advanced battery recycling solutions for lithium-ion, lead-acid, and other battery types. Safe handling and processing of batteries with maximum material recovery.',
    features: [
      'Lithium-ion battery processing',
      'Lead-acid battery recycling',
      'Safe handling protocols',
      'Material recovery systems',
      'Environmental compliance',
      'Automated sorting technology',
      'Hazardous material management',
      'Resource optimization',
      'Automated processing systems',
      'Comprehensive battery recovery'
    ],
    specifications: {
      'Battery Types': 'Li-ion, Lead-acid, NiMH, NiCd',
      'Processing Capacity': 'Up to 5 tons per hour',
      'Recovery Rate': '90%+ material recovery',
      'Safety': 'DOT and EPA compliant',
      'Technology': 'Automated sorting and processing',
      'Certification': 'ISO 14001 certified',
      'Metal Recovery': 'Precious metal extraction',
      'Hazardous Handling': 'Safe disposal protocols',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [],
    equipment: [
      { name: 'Reckelberg', link: '/equipment/reckelberg-environmental' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/battery-recycling.jpg'
    ],
    testimonials: [
      {
        name: 'David Chen',
        company: 'Battery Solutions Inc',
        quote: 'Battery recycling systems have revolutionized our battery processing. Exceptional safety and recovery.',
        rating: 5
      },
      {
        name: 'Lisa Thompson',
        company: 'EcoBattery Recycling',
        quote: 'Outstanding battery processing with excellent material recovery rates.',
        rating: 5
      },
      {
        name: 'Robert Wilson',
        company: 'Green Battery Systems',
        quote: 'Best battery recycling system we\'ve used. Highly safe and efficient.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default BatteryRecyclingSystemsPage;
