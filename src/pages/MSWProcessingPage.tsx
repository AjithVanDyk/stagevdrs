import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const MSWProcessingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 5,
    name: t('solutions.solution5Name'),
    image: '/Images/msw-processing.jpg',
    description: t('solutions.solution5Description'),
    features: [
      t('solutions.solution5Feature1'),
      t('solutions.solution5Feature2'),
      t('solutions.solution5Feature3'),
      t('solutions.solution5Feature4'),
      t('solutions.solution5Feature5'),
      t('solutions.solution5Feature6'),
      t('solutions.solution5Feature7'),
      t('solutions.solution5Feature8'),
    ],
    specifications: {
      [t('solutions.solution5Spec1Key')]: t('solutions.solution5Spec1Value'),
      [t('solutions.solution5Spec2Key')]: t('solutions.solution5Spec2Value'),
      [t('solutions.solution5Spec3Key')]: t('solutions.solution5Spec3Value'),
      [t('solutions.solution5Spec4Key')]: t('solutions.solution5Spec4Value'),
      [t('solutions.solution5Spec5Key')]: t('solutions.solution5Spec5Value'),
      [t('solutions.solution5Spec6Key')]: t('solutions.solution5Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution5App1') },
      { name: t('solutions.solution5App2') },
      { name: t('solutions.solution5App3') },
      { name: t('solutions.solution5App4') },
      { name: t('solutions.solution5App5') },
    ],
    benefits: [
      t('solutions.solution5Benefit1'),
      t('solutions.solution5Benefit2'),
      t('solutions.solution5Benefit3'),
      t('solutions.solution5Benefit4'),
      t('solutions.solution5Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/2fkjMGj8ozs', // Mexico First MRF MSW Processing
      'https://youtu.be/lTQ4xEe7WOg'  // Lubo StarScreen Sorting MSW
    ],
    gallery: [
      '/Images/msw-processing.jpg',
      '/Images/mrf-systems.jpg'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'City Waste Management',
        quote: 'MSW processing has transformed our waste management operations. Recovery rates are exceptional.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'Metro Environmental Services',
        quote: 'Outstanding technology with excellent material recovery capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Waste Solutions',
        quote: 'Best MSW processing system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default MSWProcessingPage;
