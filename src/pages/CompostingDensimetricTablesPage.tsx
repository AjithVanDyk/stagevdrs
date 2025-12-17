import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CompostingDensimetricTablesPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 12,
    name: t('solutions.solution12Name'),
    image: '/Images/densimetric-table-new.jpg',
    description: t('solutions.solution12Description'),
    features: [
      t('solutions.solution12Feature1'),
      t('solutions.solution12Feature2'),
      t('solutions.solution12Feature3'),
      t('solutions.solution12Feature4'),
      t('solutions.solution12Feature5'),
      t('solutions.solution12Feature6'),
      t('solutions.solution12Feature7'),
      t('solutions.solution12Feature8'),
    ],
    specifications: {
      [t('solutions.solution12Spec1Key')]: t('solutions.solution12Spec1Value'),
      [t('solutions.solution12Spec2Key')]: t('solutions.solution12Spec2Value'),
      [t('solutions.solution12Spec3Key')]: t('solutions.solution12Spec3Value'),
      [t('solutions.solution12Spec4Key')]: t('solutions.solution12Spec4Value'),
      [t('solutions.solution12Spec5Key')]: t('solutions.solution12Spec5Value'),
      [t('solutions.solution12Spec6Key')]: t('solutions.solution12Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution12App1') },
      { name: t('solutions.solution12App2') },
      { name: t('solutions.solution12App3') },
      { name: t('solutions.solution12App4') },
      { name: t('solutions.solution12App5') },
    ],
    benefits: [
      t('solutions.solution12Benefit1'),
      t('solutions.solution12Benefit2'),
      t('solutions.solution12Benefit3'),
      t('solutions.solution12Benefit4'),
      t('solutions.solution12Benefit5'),
    ],
    equipment: [
      { name: 'Densimetric table', link: '/equipment/densimetric-table' }
    ],
    gallery: [
      '/Images/densimetric-table-new.jpg',
      '/Images/composting.jpg'
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw'  // New Densimetric Table
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default CompostingDensimetricTablesPage;
