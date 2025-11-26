import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const OrganicsProcessingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 3,
    name: t('solutions.solution3Name'),
    image: '/Images/organics-processing.jpg',
    description: t('solutions.solution3Description'),
    features: [
      t('solutions.solution3Feature1'),
      t('solutions.solution3Feature2'),
      t('solutions.solution3Feature3'),
      t('solutions.solution3Feature4'),
      t('solutions.solution3Feature5'),
      t('solutions.solution3Feature6'),
      t('solutions.solution3Feature7'),
      t('solutions.solution3Feature8'),
    ],
    specifications: {
      [t('solutions.solution3Spec1Key')]: t('solutions.solution3Spec1Value'),
      [t('solutions.solution3Spec2Key')]: t('solutions.solution3Spec2Value'),
      [t('solutions.solution3Spec3Key')]: t('solutions.solution3Spec3Value'),
      [t('solutions.solution3Spec4Key')]: t('solutions.solution3Spec4Value'),
      [t('solutions.solution3Spec5Key')]: t('solutions.solution3Spec5Value'),
      [t('solutions.solution3Spec6Key')]: t('solutions.solution3Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution3App1') },
      { name: t('solutions.solution3App2') },
      { name: t('solutions.solution3App3') },
      { name: t('solutions.solution3App4') },
      { name: t('solutions.solution3App5') },
    ],
    benefits: [
      t('solutions.solution3Benefit1'),
      t('solutions.solution3Benefit2'),
      t('solutions.solution3Benefit3'),
      t('solutions.solution3Benefit4'),
      t('solutions.solution3Benefit5'),
    ],
    equipment: [
      { name: 'Gunther Screen', link: '/equipment/gunther-screens' },
      { name: 'Smicon', link: '/equipment/smicon-depackager' },
      { name: 'Densimetric table', link: '/equipment/densimetric-table' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' }
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw', // New Densimetric Table
      'https://youtu.be/ircipzTwJRM'  // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/organics-processing.jpg',
      '/Images/composting.jpg'
    ],
    testimonials: [
      {
        name: 'Mark Johnson',
        company: 'Green Compost Solutions',
        quote: 'Organics processing has transformed our waste management. High-quality compost production.',
        rating: 5
      },
      {
        name: 'Sarah Davis',
        company: 'EcoOrganics Inc',
        quote: 'Outstanding technology with excellent odor control and pathogen reduction.',
        rating: 5
      },
      {
        name: 'Michael Brown',
        company: 'Sustainable Composting',
        quote: 'Best organics processing system we\'ve used. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default OrganicsProcessingPage;
