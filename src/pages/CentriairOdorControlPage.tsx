import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const CentriairOdorControlPage: React.FC = () => {
  const equipment = {
    id: 8,
    name: 'Centriair Odor Control',
    image: '/Images/centriair-new-1.jpg',
    description: 'Advanced odor control systems for waste processing facilities. Centriair technology effectively eliminates odors while maintaining operational efficiency.',
    features: [
      'Advanced odor elimination technology',
      'Multi-stage filtration system',
      'High-efficiency odor removal',
      'Automated operation',
      'Low maintenance requirements',
      'Energy efficient design',
      'Modular system configuration',
      'Easy installation and setup',
      'Durable construction materials',
      'Comprehensive odor control'
    ],
    specifications: {
      'Air Flow Capacity': 'Up to 50,000 CFM',
      'Odor Removal Efficiency': '99.9%+ elimination',
      'Filtration Stages': 'Multi-stage system',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'Construction': 'Modular design',
      'Materials': 'Corrosion-resistant construction',
      'Installation': 'Easy setup and installation',
      'Control': 'Automated operation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Biogas systems', link: '/solutions/organics-processing' },
      { name: 'Waste water treatment', link: '/solutions/organics-processing' },
      { name: 'Food waste processing', link: '/solutions/organics-processing' },
      { name: 'MSW processing', link: '/solutions/msw-processing' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager (shows odor control in action)
    ],
    gallery: [
      '/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG'
      // Removed missing Screenshot image - file not found
    ],
    testimonials: [
      {
        name: 'Jennifer Chen',
        company: 'Odor Solutions Inc',
        quote: 'Centriair odor control has transformed our facility operations. Exceptional odor elimination.',
        rating: 5
      },
      {
        name: 'Michael Torres',
        company: 'Clean Air Systems',
        quote: 'Outstanding odor control performance with minimal maintenance requirements.',
        rating: 5
      },
      {
        name: 'Lisa Anderson',
        company: 'EcoAir Technologies',
        quote: 'Excellent investment. The odor control system exceeds all expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default CentriairOdorControlPage;
