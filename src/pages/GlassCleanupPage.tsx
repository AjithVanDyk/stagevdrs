import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const GlassCleanupPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 11,
    name: t('solutions.solution11Name'),
    image: '/Images/glass-cleanup.jpg',
    description: t('solutions.solution11Description'),
    features: [
      t('solutions.solution11Feature1'),
      t('solutions.solution11Feature2'),
      t('solutions.solution11Feature3'),
      t('solutions.solution11Feature4'),
      t('solutions.solution11Feature5'),
      t('solutions.solution11Feature6'),
      t('solutions.solution11Feature7'),
      t('solutions.solution11Feature8'),
    ],
    specifications: {
      [t('solutions.solution11Spec1Key')]: t('solutions.solution11Spec1Value'),
      [t('solutions.solution11Spec2Key')]: t('solutions.solution11Spec2Value'),
      [t('solutions.solution11Spec3Key')]: t('solutions.solution11Spec3Value'),
      [t('solutions.solution11Spec4Key')]: t('solutions.solution11Spec4Value'),
      [t('solutions.solution11Spec5Key')]: t('solutions.solution11Spec5Value'),
      [t('solutions.solution11Spec6Key')]: t('solutions.solution11Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution11App1') },
      { name: t('solutions.solution11App2') },
      { name: t('solutions.solution11App3') },
      { name: t('solutions.solution11App4') },
      { name: t('solutions.solution11App5') },
    ],
    benefits: [
      t('solutions.solution11Benefit1'),
      t('solutions.solution11Benefit2'),
      t('solutions.solution11Benefit3'),
      t('solutions.solution11Benefit4'),
      t('solutions.solution11Benefit5'),
    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/glass-cleanup.jpg',
      '/Images/glass-cleanup-1.jpg',
      '/Images/glass-cleanup-2.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default GlassCleanupPage;
