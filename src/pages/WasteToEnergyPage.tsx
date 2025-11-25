import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const WasteToEnergyPage: React.FC = () => {
  const solution = {
    id: 9,
    name: 'Waste to Energy Recycling',
    image: '/Images/waste-to-energy.jpg',
    description: 'Advanced waste-to-energy solutions that convert non-recyclable waste into clean, renewable energy. Our technology maximizes energy recovery while minimizing environmental impact.',
    features: [
      'Non-recyclable waste conversion',
      'Clean energy generation',
      'Advanced combustion technology',
      'Emission control systems',
      'Energy recovery optimization',
      'Automated waste processing',
      'Environmental compliance',
      'Modular system design',
      'Real-time monitoring',
      'Sustainable energy production'
    ],
    specifications: {
      'Processing Capacity': 'Up to 200 tons per day',
      'Energy Generation': 'Up to 50 MW per facility',
      'Efficiency': '85%+ energy recovery',
      'Emission Control': '99.9%+ pollutant removal',
      'Waste Types': 'Non-recyclable municipal waste',
      'Power Output': 'Clean electricity generation',
      'Maintenance': 'Low maintenance requirements',
      'System Design': 'Modular and scalable',
      'Installation': 'Turnkey installation',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Smicon', link: '/equipment/smicon-depackager' }
    ],
    videos: [
      'https://youtu.be/jJ0G65ako44' // MRFs in Crisis 2019
    ],
    gallery: [
      '/Images/waste-to-energy.jpg',
      '/Images/wasttoenergy.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'Clean Energy Solutions',
        quote: 'Waste-to-energy technology has revolutionized our energy production. Clean and efficient.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'EcoPower Systems',
        quote: 'Outstanding energy recovery rates with minimal environmental impact.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'Sustainable Energy Corp',
        quote: 'Best waste-to-energy system we\'ve implemented. Highly reliable and efficient.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default WasteToEnergyPage;
