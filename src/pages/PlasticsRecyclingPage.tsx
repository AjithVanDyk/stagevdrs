import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const PlasticsRecyclingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 2,
    name: t('solutions.solution2Name'),
    image: '/Images/plastics-recycling.jpg',
    description: t('solutions.solution2Description'),
    features: [
      t('solutions.solution2Feature1'),
      t('solutions.solution2Feature2'),
      t('solutions.solution2Feature3'),
      t('solutions.solution2Feature4'),
      t('solutions.solution2Feature5'),
      t('solutions.solution2Feature6'),
      t('solutions.solution2Feature7'),
      t('solutions.solution2Feature8'),
    ],
    specifications: {
      [t('solutions.solution2Spec1Key')]: t('solutions.solution2Spec1Value'),
      [t('solutions.solution2Spec2Key')]: t('solutions.solution2Spec2Value'),
      [t('solutions.solution2Spec3Key')]: t('solutions.solution2Spec3Value'),
      [t('solutions.solution2Spec4Key')]: t('solutions.solution2Spec4Value'),
      [t('solutions.solution2Spec5Key')]: t('solutions.solution2Spec5Value'),
      [t('solutions.solution2Spec6Key')]: t('solutions.solution2Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution2App1') },
      { name: t('solutions.solution2App2') },
      { name: t('solutions.solution2App3') },
      { name: t('solutions.solution2App4') },
      { name: t('solutions.solution2App5') },
    ],
    benefits: [
      t('solutions.solution2Benefit1'),
      t('solutions.solution2Benefit2'),
      t('solutions.solution2Benefit3'),
      t('solutions.solution2Benefit4'),
      t('solutions.solution2Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/8Xj4Zwv81uE', // Container Line Featuring Optical Sorting
      'https://youtu.be/FfoIMHZv9CQ', // Container Line Featuring Optical Sorting 2
      'https://youtu.be/r6qxQsl7ABU'  // Cardboard and Paper Separation Purifying Fiber Lines
    ],
    localVideos: [
      // Removed missing .mp4 file - use YouTube videos instead
    ],
    gallery: [
      '/Images/plastics-recycling.jpg',
      '/Images/7-Plastics-Recycling-c.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default PlasticsRecyclingPage;
