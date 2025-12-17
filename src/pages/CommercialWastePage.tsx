import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CommercialWastePage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 6,
    name: t('solutions.solution6Name'),
    image: '/Images/commercial-waste-processing.jpg',
    description: t('solutions.solution6Description'),
    features: [
      t('solutions.solution6Feature1'),
      t('solutions.solution6Feature2'),
      t('solutions.solution6Feature3'),
      t('solutions.solution6Feature4'),
      t('solutions.solution6Feature5'),
      t('solutions.solution6Feature6'),
      t('solutions.solution6Feature7'),
      t('solutions.solution6Feature8'),
    ],
    specifications: {
      [t('solutions.solution6Spec1Key')]: t('solutions.solution6Spec1Value'),
      [t('solutions.solution6Spec2Key')]: t('solutions.solution6Spec2Value'),
      [t('solutions.solution6Spec3Key')]: t('solutions.solution6Spec3Value'),
      [t('solutions.solution6Spec4Key')]: t('solutions.solution6Spec4Value'),
      [t('solutions.solution6Spec5Key')]: t('solutions.solution6Spec5Value'),
      [t('solutions.solution6Spec6Key')]: t('solutions.solution6Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution6App1') },
      { name: t('solutions.solution6App2') },
      { name: t('solutions.solution6App3') },
      { name: t('solutions.solution6App4') },
      { name: t('solutions.solution6App5') },
    ],
    benefits: [
      t('solutions.solution6Benefit1'),
      t('solutions.solution6Benefit2'),
      t('solutions.solution6Benefit3'),
      t('solutions.solution6Benefit4'),
      t('solutions.solution6Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/8Xj4Zwv81uE', // Container Line Featuring Optical Sorting
      'https://youtu.be/FfoIMHZv9CQ', // Container Line Featuring Optical Sorting 2
      'https://youtu.be/lTQ4xEe7WOg'  // Lubo StarScreen Sorting MSW
    ],
    gallery: [
      '/Images/commercial-waste-processing.jpg',
      '/Images/mrf-systems.jpg'
    ],
    testimonials: [
      {
        name: 'David Kim',
        company: 'Commercial Waste Solutions',
        quote: 'Commercial waste processing has transformed our operations. Exceptional recovery rates.',
        rating: 5
      },
      {
        name: 'Maria Garcia',
        company: 'EcoCommercial Systems',
        quote: 'Outstanding processing technology with excellent material recovery capabilities.',
        rating: 5
      },
      {
        name: 'James Wilson',
        company: 'Green Business Solutions',
        quote: 'Best commercial waste system we\'ve used. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default CommercialWastePage;
