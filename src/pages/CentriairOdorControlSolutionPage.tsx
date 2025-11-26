import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CentriairOdorControlSolutionPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 15,
    name: t('solutions.solution15Name'),
    image: '/Images/centriair-new-1.jpg',
    description: t('solutions.solution15Description'),
    features: [
      t('solutions.solution15Feature1'),
      t('solutions.solution15Feature2'),
      t('solutions.solution15Feature3'),
      t('solutions.solution15Feature4'),
      t('solutions.solution15Feature5'),
      t('solutions.solution15Feature6'),
      t('solutions.solution15Feature7'),
      t('solutions.solution15Feature8'),
    ],
    specifications: {
      [t('solutions.solution15Spec1Key')]: t('solutions.solution15Spec1Value'),
      [t('solutions.solution15Spec2Key')]: t('solutions.solution15Spec2Value'),
      [t('solutions.solution15Spec3Key')]: t('solutions.solution15Spec3Value'),
      [t('solutions.solution15Spec4Key')]: t('solutions.solution15Spec4Value'),
      [t('solutions.solution15Spec5Key')]: t('solutions.solution15Spec5Value'),
      [t('solutions.solution15Spec6Key')]: t('solutions.solution15Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution15App1') },
      { name: t('solutions.solution15App2') },
      { name: t('solutions.solution15App3') },
      { name: t('solutions.solution15App4') },
      { name: t('solutions.solution15App5') },
    ],
    benefits: [
      t('solutions.solution15Benefit1'),
      t('solutions.solution15Benefit2'),
      t('solutions.solution15Benefit3'),
      t('solutions.solution15Benefit4'),
      t('solutions.solution15Benefit5'),
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
