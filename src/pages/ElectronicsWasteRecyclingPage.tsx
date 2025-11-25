import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const ElectronicsWasteRecyclingPage: React.FC = () => {
  const solution = {
    id: 1,
    name: 'Electronics Waste Recycling',
    image: '/Images/electronics-recycling.jpg',
    description: 'Complete electronics waste recycling solutions including e-waste processing, material recovery, and environmental compliance. Specialized equipment for handling computers, phones, and electronic components.',
    features: [
      'Complete e-waste processing systems',
      'Material recovery and separation',
      'Environmental compliance solutions',
      'Data destruction services',
      'Component disassembly',
      'Precious metal recovery',
      'Hazardous material handling',
      'Certified recycling processes',
      'Automated processing systems',
      'Comprehensive material recovery'
    ],
    specifications: {
      'Processing Capacity': 'Up to 10 tons per hour',
      'Material Recovery': '95%+ recovery rate',
      'Compliance': 'EPA and state regulations',
      'Certification': 'R2 and e-Stewards certified',
      'Data Security': 'NAID AAA certified destruction',
      'Technology': 'Automated disassembly systems',
      'Metal Recovery': 'Precious metal extraction',
      'Hazardous Handling': 'Safe disposal protocols',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4', // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
      'https://youtu.be/bnpoNRYk7_I'  // E-Scrap Recycling Processing with Tomra Optical Sorter at Premier Surplus Dawsonville GA
    ],
    gallery: [
      '/Images/electronics-recycling.jpg',
      '/Images/cd-recycling.jpg',
      '/Images/cdrecycle.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default ElectronicsWasteRecyclingPage;
