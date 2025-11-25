import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const LuboScreeningPage: React.FC = () => {
  const equipment = {
    id: 2,
    name: 'Lubo StarScreen® Technology',
    image: '/Images/Equipment/Lubo Screens/Product image_lubo screens.jpg',
    description: 'Advanced screening technology with StarScreen® design for efficient material separation and sizing. Lubo screens deliver superior performance in waste processing operations.',
    features: [
      'StarScreen® patented design',
      'High-efficiency material separation',
      'Multiple screen deck configurations',
      'Self-cleaning screen technology',
      'Low maintenance requirements',
      'Energy efficient operation',
      'Modular construction',
      'Easy installation and setup',
      'Durable construction materials',
      'Precise sizing capabilities'
    ],
    specifications: {
      'Screen Area': 'Up to 200 sq ft per deck',
      'Throughput': 'Up to 100 tons per hour',
      'Screen Decks': '1-4 deck configurations',
      'Aperture Size': '0.5mm to 200mm',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'Construction': 'Modular design',
      'Materials': 'High-grade steel construction',
      'Installation': 'Easy setup and installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/jZnfLHXHWAQ', // Non-Wrapping 440 Screen
      'https://youtu.be/lTQ4xEe7WOg', // Lubo StarScreen Sorting MSW
      'https://youtu.be/Lt-ZYSw6p3w', // Lubo Neptune AWS StarScreen Sorting C&D Waste
      'https://youtu.be/y--l35L8EzI', // Elliptical Screen
      'https://youtu.be/uz4r_gb1Wjs'  // Sizing Screen
    ],
    gallery: [
      '/Images/Equipment/Lubo Screens/Gallery 1_onp.JPG',
      '/Images/Equipment/Lubo Screens/Gallery 2_onp.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 3_sbc.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 4_880 stars.JPG',
      '/Images/Equipment/Lubo Screens/Gallery 5_sbc.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 6_OCC.JPG',
      '/Images/Equipment/Lubo Screens/Gallery 7_onp.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 8_elliptical.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 9_elliptical.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 10_op.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 11_onp.jpg',
      '/Images/Equipment/Lubo Screens/Gallery 12_sizing screens.JPG'
    ],
    testimonials: [
      {
        name: 'Robert Kim',
        company: 'Advanced Screening Solutions',
        quote: 'The Lubo StarScreen technology has revolutionized our screening efficiency. Outstanding performance.',
        rating: 5
      },
      {
        name: 'Susan Lee',
        company: 'EcoMaterials Processing',
        quote: 'Excellent screening technology with minimal maintenance. Highly recommended.',
        rating: 5
      },
      {
        name: 'David Park',
        company: 'Green Valley Recycling',
        quote: 'Superior material separation and sizing capabilities. Best investment we\'ve made.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default LuboScreeningPage;
