import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CDRecyclingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 7,
    name: t('solutions.solution7Name'),
    image: '/Images/cd-recycling.jpg',
    description: t('solutions.solution7Description'),
    features: [
      t('solutions.solution7Feature1'),
      t('solutions.solution7Feature2'),
      t('solutions.solution7Feature3'),
      t('solutions.solution7Feature4'),
      t('solutions.solution7Feature5'),
      t('solutions.solution7Feature6'),
      t('solutions.solution7Feature7'),
      t('solutions.solution7Feature8'),
    ],
    specifications: {
      [t('solutions.solution7Spec1Key')]: t('solutions.solution7Spec1Value'),
      [t('solutions.solution7Spec2Key')]: t('solutions.solution7Spec2Value'),
      [t('solutions.solution7Spec3Key')]: t('solutions.solution7Spec3Value'),
      [t('solutions.solution7Spec4Key')]: t('solutions.solution7Spec4Value'),
      [t('solutions.solution7Spec5Key')]: t('solutions.solution7Spec5Value'),
      [t('solutions.solution7Spec6Key')]: t('solutions.solution7Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution7App1') },
      { name: t('solutions.solution7App2') },
      { name: t('solutions.solution7App3') },
      { name: t('solutions.solution7App4') },
      { name: t('solutions.solution7App5') },
    ],
    benefits: [
      t('solutions.solution7Benefit1'),
      t('solutions.solution7Benefit2'),
      t('solutions.solution7Benefit3'),
      t('solutions.solution7Benefit4'),
      t('solutions.solution7Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/MOjFp3y7mEw', // Construction and Demolition Waste Sorting System
      'https://youtu.be/Lt-ZYSw6p3w'  // Lubo Neptune AWS StarScreen Sorting C&D Waste
    ],
    gallery: [
      '/Images/cd-recycling.jpg',
      '/Images/cdrecycle.jpg'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'C&D Recycling Solutions',
        quote: 'C&D recycling has revolutionized our construction waste management. Exceptional recovery rates.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'EcoConstruction Systems',
        quote: 'Outstanding C&D processing technology with excellent material recovery capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Building Solutions',
        quote: 'Best C&D waste system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default CDRecyclingPage;
