import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const GreyparrotAIPage: React.FC = () => {
  const equipment = {
    id: 9,
    name: 'Greyparrot AI',
    image: '/Images/greyparrot-ai-new.jpg',
    description: 'Advanced AI-powered waste analytics and material recognition technology. Greyparrot AI provides real-time insights and optimization for waste processing operations.',
    features: [
      'AI-powered material recognition',
      'Real-time waste analytics',
      'Advanced computer vision',
      'Automated material identification',
      'Performance optimization insights',
      'Data-driven decision making',
      'Cloud-based analytics platform',
      'Easy integration capabilities',
      'Scalable AI technology',
      'Comprehensive reporting'
    ],
    specifications: {
      'Recognition Accuracy': '99%+ material identification',
      'Processing Speed': 'Real-time analysis',
      'AI Technology': 'Advanced computer vision',
      'Data Analytics': 'Cloud-based platform',
      'Integration': 'Easy system integration',
      'Scalability': 'Scalable AI technology',
      'Reporting': 'Comprehensive analytics',
      'Maintenance': 'Minimal maintenance required',
      'Installation': 'Easy setup and installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'AI-based waste analytics', link: '/solutions/ai-waste-analysis' }
    ],
    videos: [
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png',
      '/Images/Equipment/Greyparrot%20AI/_DSF3561%20copy.jpg',
      '/Images/Equipment/Greyparrot%20AI/_DSF3580%20copy.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'AI Waste Solutions',
        quote: 'Greyparrot AI has revolutionized our waste analytics. Exceptional accuracy and insights.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'Smart Waste Systems',
        quote: 'Outstanding AI technology with real-time analytics capabilities.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'EcoAnalytics Corp',
        quote: 'Best AI waste analytics system we\'ve implemented. Highly accurate and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default GreyparrotAIPage;
