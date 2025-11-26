import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';

const SmiconDepackagerPage: React.FC = () => {
  const equipment = {
    id: 6,
    name: 'Smicon Food Waste Depackagers',
    image: '/Images/smicon-depackager-new.jpg',
    description: 'Advanced food waste depackaging systems designed to efficiently separate organic materials from packaging. Smicon technology maximizes organic recovery while minimizing contamination.',
    features: [
      'High-efficiency depackaging technology',
      'Gentle separation of organic materials',
      'Minimal packaging contamination',
      'Robust construction for heavy-duty use',
      'Easy maintenance and cleaning',
      'Flexible processing capabilities',
      'Low energy consumption',
      'Automated operation with minimal supervision',
      'Compatible with various packaging types',
      'Advanced material handling systems'
    ],
    specifications: {
      'Processing Capacity': 'Up to 25 tons per hour',
      'Organic Recovery': '95%+ organic material recovery',
      'Contamination Level': '<5% packaging contamination',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'Operation': 'Fully automated operation',
      'Packaging Types': 'Plastic, cardboard, metal containers',
      'Material Handling': 'Gentle processing technology',
      'Installation': 'Modular design for easy installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Food waste depackaging', link: '/solutions/food-waste-depackaging' },
      { name: 'Residential SSO' },
      { name: 'Commercial SSO' },
      { name: 'Bulk food waste' },
      { name: 'Restaurant waste' },
      { name: 'Mixed supermarket waste' },
      { name: 'Packaged produce' },
      { name: 'Canned foods' },
      { name: 'Beverage cartons and cans' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20input%20material.jpg',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20expelled%20packaging.png',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20slurry.png'
    ],
    testimonials: [
      {
        name: 'David Chen',
        company: 'Organic Solutions LLC',
        quote: 'The Smicon depackager has transformed our food waste processing. Recovery rates are exceptional.',
        rating: 5
      },
      {
        name: 'Lisa Thompson',
        company: 'Green Compost Co.',
        quote: 'Reliable, efficient, and easy to maintain. Perfect for our composting operation.',
        rating: 5
      },
      {
        name: 'Robert Wilson',
        company: 'EcoWaste Management',
        quote: 'Outstanding performance with minimal contamination. Highly recommended for food waste processing.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default SmiconDepackagerPage;
