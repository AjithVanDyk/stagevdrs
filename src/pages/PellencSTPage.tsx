import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const PellencSTPage: React.FC = () => {
  const equipment = {
    id: 4,
    name: 'Pellenc ST Optical Sorting',
    image: '/Images/Equipment/Pellenc optical sorters/Product image_pellenc.JPG',
    description: 'Advanced AI-powered optical sorting systems for precise material identification and separation. Pellenc ST technology delivers exceptional accuracy and efficiency in waste processing operations.',
    features: [
      'AI-powered material recognition technology',
      'High-speed sorting capabilities up to 15 tph',
      'Multi-material detection and separation',
      'Advanced near-infrared (NIR) spectroscopy',
      'Real-time quality control and monitoring',
      'Modular design for easy integration',
      'Low maintenance and energy efficient',
      'Precise ejection system for accurate sorting',
      'Compatible with various material streams',
      'Advanced data analytics and reporting'
    ],
    specifications: {
      'Sorting Speed': 'Up to 15 tons per hour',
      'Detection Accuracy': '99.5% material identification',
      'Technology': 'Near-infrared (NIR) spectroscopy',
      'Ejection Precision': '99.8% accuracy',
      'Power Consumption': 'Low energy efficient design',
      'Maintenance': 'Minimal maintenance required',
      'Integration': 'Modular design for easy installation',
      'Data Analytics': 'Real-time monitoring and reporting',
      'Material Types': 'Plastics, paper, cardboard, metals',
      'Operating Temperature': '-10°C to +50°C'
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' }
    ],
    videos: [
      'https://youtu.be/8Xj4Zwv81uE', // Container Line Featuring Optical Sorting
      'https://youtu.be/FfoIMHZv9CQ', // Container Line Featuring Optical Sorting 2
      'https://youtu.be/_AHxVzUYGxE'  // Clean Up Mixed Paper with Laser Object Detection
    ],
    gallery: [
      '/Images/Equipment/Pellenc optical sorters/Gallery 1_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 2_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 3_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 4_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 5_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 6_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 7_pellenc.JPG',
      '/Images/Equipment/Pellenc optical sorters/Gallery 13_pellenc.JPG'
    ],
    testimonials: [
      {
        name: 'John Smith',
        company: 'Green Valley Recycling',
        quote: 'The Pellenc ST system has revolutionized our sorting accuracy. We\'ve seen a 40% improvement in material recovery rates.',
        rating: 5
      },
      {
        name: 'Sarah Johnson',
        company: 'EcoTech Materials',
        quote: 'Outstanding technology with minimal maintenance. The AI recognition is incredibly precise and reliable.',
        rating: 5
      },
      {
        name: 'Mike Rodriguez',
        company: 'Sustainable Solutions Inc.',
        quote: 'Best investment we\'ve made. The sorting speed and accuracy have exceeded our expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default PellencSTPage;
