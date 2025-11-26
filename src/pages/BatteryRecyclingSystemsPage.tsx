import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const BatteryRecyclingSystemsPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 16,
    name: t('solutions.solution16Name'),
    image: '/Images/battery-recycling.jpg',
    description: t('solutions.solution16Description'),
    features: [
      t('solutions.solution16Feature1'),
      t('solutions.solution16Feature2'),
      t('solutions.solution16Feature3'),
      t('solutions.solution16Feature4'),
      t('solutions.solution16Feature5'),
      t('solutions.solution16Feature6'),
      t('solutions.solution16Feature7'),
      t('solutions.solution16Feature8'),
    ],
    specifications: {
      [t('solutions.solution16Spec1Key')]: t('solutions.solution16Spec1Value'),
      [t('solutions.solution16Spec2Key')]: t('solutions.solution16Spec2Value'),
      [t('solutions.solution16Spec3Key')]: t('solutions.solution16Spec3Value'),
      [t('solutions.solution16Spec4Key')]: t('solutions.solution16Spec4Value'),
      [t('solutions.solution16Spec5Key')]: t('solutions.solution16Spec5Value'),
      [t('solutions.solution16Spec6Key')]: t('solutions.solution16Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution16App1') },
      { name: t('solutions.solution16App2') },
      { name: t('solutions.solution16App3') },
      { name: t('solutions.solution16App4') },
      { name: t('solutions.solution16App5') },
    ],
    benefits: [
      t('solutions.solution16Benefit1'),
      t('solutions.solution16Benefit2'),
      t('solutions.solution16Benefit3'),
      t('solutions.solution16Benefit4'),
      t('solutions.solution16Benefit5'),
    ],
    equipment: [
      { name: 'Reckelberg', link: '/equipment/reckelberg-environmental' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/battery-recycling.jpg'
    ],
    testimonials: [
      {
        name: 'David Chen',
        company: 'Battery Solutions Inc',
        quote: 'Battery recycling systems have revolutionized our battery processing. Exceptional safety and recovery.',
        rating: 5
      },
      {
        name: 'Lisa Thompson',
        company: 'EcoBattery Recycling',
        quote: 'Outstanding battery processing with excellent material recovery rates.',
        rating: 5
      },
      {
        name: 'Robert Wilson',
        company: 'Green Battery Systems',
        quote: 'Best battery recycling system we\'ve used. Highly safe and efficient.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default BatteryRecyclingSystemsPage;
