import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const DensimetricTablePage: React.FC = () => {
  const equipment = {
    id: 10,
    name: 'Densimetric Table',
    image: '/Images/densimetric-table-new.jpg',
    description: 'Advanced densimetric separation technology for efficient material sorting based on density differences. Our densimetric tables provide precise separation of materials with varying densities.',
    features: [
      'Density-based material separation',
      'High-precision sorting technology',
      'Multiple density separation stages',
      'Automated material handling',
      'Low maintenance design',
      'Energy efficient operation',
      'Modular construction',
      'Easy integration capabilities',
      'Precise density control',
      'Robust construction materials'
    ],
    specifications: {
      'Separation Accuracy': '99%+ density-based sorting',
      'Throughput': 'Up to 40 tons per hour',
      'Density Range': '0.1 to 6.0 g/cm³',
      'Separation Stages': '1-2 stage configurations',
      'Power Consumption': 'Low energy consumption',
      'Maintenance': 'Minimal maintenance required',
      'Construction': 'Modular design',
      'Integration': 'Easy system integration',
      'Control': 'Automated density control',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Compost refining', link: '/solutions/composting-densimetric-tables' },
      { name: 'Organics processing', link: '/solutions/organics-processing' }
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw'  // New Densimetric Table
    ],
    gallery: [
      '/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg',
      '/Images/Equipment/Densimetric%20table/Dtable_Clean%20compost%20pic.JPG',
      '/Images/Equipment/Densimetric%20table/Dtable_Dirty%20Compost%20Infeed.JPG',
      '/Images/Equipment/Densimetric%20table/Dtable_Heavy%20contamination.JPG'
    ],
    testimonials: []
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default DensimetricTablePage;
