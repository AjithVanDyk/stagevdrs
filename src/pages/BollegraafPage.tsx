import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const BollegraafPage: React.FC = () => {
  const equipment = {
    id: 1,
    name: 'Bollegraaf Balers',
    image: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg',
    description: 'Industry-leading single ram balers with no-shear design for maximum efficiency and density. Single ram uses 1/3 power of two-ram balers and operates automatically without dedicated operator.',
    features: [
      'Single ram uses 1/3 power of two-ram balers',
      'Operates automatically without dedicated operator',
      'Instant material switching capability',
      'Denser, uniform bales with pre-press flap',
      'Production speeds over 35 tph',
      '50% reduction in electricity costs',
      'Low maintenance robust design',
      'No-shear compression technology',
      'Flexible material processing (fiber, cardboard, plastic, steel, aluminum)',
      'Pre-press flap eliminates shearing'
    ],
    specifications: {
      'Production Speed': 'Over 35 tons per hour',
      'Power Efficiency': '50% reduction vs two-ram balers',
      'Bale Density': 'Superior compression with pre-press flap',
      'Operation': 'Fully automated',
      'Maintenance': 'Low maintenance robust design',
      'Material Switching': 'Instant capability',
      'Design': 'Single ram, no-shear',
      'Materials': 'Fiber, cardboard, plastic, steel, aluminum',
      'Bale Weight': 'Up to 2,200 lbs',
      'Warranty': 'Comprehensive 2-year warranty'
    },
    applications: [
      { name: 'High production balers', link: '/solutions/bollegraaf-balers' },
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/zqbJbMABi-A', // Bollegraaf HBC 140 Baler at Yes Recycling Newark NJ
      'https://youtu.be/m4VQvwWW9yU'  // Single Ram Baler
    ],
    gallery: [
      '/Images/Equipment/Bollegraaf/Gallery%201_WM%20Mesquite%20Creek-6.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%202_WM%20Mesquite%20Creek-7.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%204_VanDyk_jp%20mascaro.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%205_Mazza%20hbc120.png',
      '/Images/Equipment/Bollegraaf/Gallery%206_vandyk_plano229.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%207_p2-van-sanco-144.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%208_USA%20Berlin%202023%20HBC140.png',
      '/Images/Equipment/Bollegraaf/Gallery%209_Plainfield.JPG',
      '/Images/Equipment/Bollegraaf/Gallery%2010_Yes%20hbc140.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-3.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-6.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-7.jpg'
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default BollegraafPage;
