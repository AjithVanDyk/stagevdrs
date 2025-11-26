import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const MultiMRFSystemsPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 8,
    name: t('solutions.solution8Name'),
    image: '/Images/mrf-systems.jpg',
    description: t('solutions.solution8Description'),
    features: [
      t('solutions.solution8Feature1'),
      t('solutions.solution8Feature2'),
      t('solutions.solution8Feature3'),
      t('solutions.solution8Feature4'),
      t('solutions.solution8Feature5'),
      t('solutions.solution8Feature6'),
      t('solutions.solution8Feature7'),
      t('solutions.solution8Feature8'),
    ],
    specifications: {
      [t('solutions.solution8Spec1Key')]: t('solutions.solution8Spec1Value'),
      [t('solutions.solution8Spec2Key')]: t('solutions.solution8Spec2Value'),
      [t('solutions.solution8Spec3Key')]: t('solutions.solution8Spec3Value'),
      [t('solutions.solution8Spec4Key')]: t('solutions.solution8Spec4Value'),
      [t('solutions.solution8Spec5Key')]: t('solutions.solution8Spec5Value'),
      [t('solutions.solution8Spec6Key')]: t('solutions.solution8Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution8App1') },
      { name: t('solutions.solution8App2') },
      { name: t('solutions.solution8App3') },
      { name: t('solutions.solution8App4') },
      { name: t('solutions.solution8App5') },
    ],
    benefits: [
      t('solutions.solution8Benefit1'),
      t('solutions.solution8Benefit2'),
      t('solutions.solution8Benefit3'),
      t('solutions.solution8Benefit4'),
      t('solutions.solution8Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/Qerp8XcGDw0', // A New Way to Sort Single Stream
      'https://youtu.be/M5nmNKVNCBw', // Single Stream Recycling Tour Material Recovery Facility
      'https://youtu.be/QFmP4fvjk6I', // Positive Sorting Next Gen MRF
      'https://youtu.be/9dxwdU9iGOM'  // Building a 25 TPH Single Stream Recycling Facility
    ],
    gallery: [
      '/Images/mrf-systems.jpg',
      '/Images/single-stream-recycling.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default MultiMRFSystemsPage;
