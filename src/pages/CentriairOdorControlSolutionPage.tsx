import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const CentriairOdorControlSolutionPage: React.FC = () => {
  const solution = {
    id: 10,
    name: 'Centriair Odor Control',
    image: '/Images/centriair-new-1.jpg',
    description: 'Advanced odor control solutions for waste processing facilities. Centriair technology effectively eliminates odors while maintaining operational efficiency and environmental compliance.',
    features: [
      'Advanced odor elimination technology',
      'Multi-stage filtration system',
      'High-efficiency odor removal',
      'Automated operation',
      'Low maintenance requirements',
      'Energy efficient design',
      'Modular system configuration',
      'Environmental compliance',
      'Easy installation and setup',
      'Comprehensive odor control solutions'
    ],
    specifications: {
      'Air Flow Capacity': 'Up to 50,000 CFM',
      'Odor Removal Efficiency': '99.9%+ elimination',
      'Filtration Stages': 'Multi-stage system',
      'Power Consumption': 'Energy efficient design',
      'Maintenance': 'Low maintenance requirements',
      'Construction': 'Modular design',
      'Materials': 'Corrosion-resistant construction',
      'Compliance': 'Environmental regulations',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Biogas systems', link: '/solutions/organics-processing' },
      { name: 'Waste water treatment', link: '/solutions/organics-processing' },
      { name: 'Food waste processing', link: '/solutions/organics-processing' },
      { name: 'MSW processing', link: '/solutions/msw-processing' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    equipment: [
      { name: 'Centriair', link: '/equipment/centriair-odor-control' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager (shows odor control in action)
    ],
    gallery: [
      '/Images/centriair-new-1.jpg',
      '/Images/centriair-equipment.jpg',
      '/Images/centriair-installation.jpg'
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

  return <SolutionPageTemplate solution={solution} />;
};

export default CentriairOdorControlSolutionPage;
