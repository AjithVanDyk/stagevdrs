import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const SingleStreamRecyclingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 1,
    name: t('solutions.solution1Name'),
    image: '/Images/single-stream-recycling.jpg',
    description: t('solutions.solution1Description'),
    features: [
      t('solutions.solution1Feature1'),
      t('solutions.solution1Feature2'),
      t('solutions.solution1Feature3'),
      t('solutions.solution1Feature4'),
      t('solutions.solution1Feature5'),
      t('solutions.solution1Feature6'),
      t('solutions.solution1Feature7'),
      t('solutions.solution1Feature8'),
    ],
    specifications: {
      [t('solutions.solution1Spec1Key')]: t('solutions.solution1Spec1Value'),
      [t('solutions.solution1Spec2Key')]: t('solutions.solution1Spec2Value'),
      [t('solutions.solution1Spec3Key')]: t('solutions.solution1Spec3Value'),
      [t('solutions.solution1Spec4Key')]: t('solutions.solution1Spec4Value'),
      [t('solutions.solution1Spec5Key')]: t('solutions.solution1Spec5Value'),
      [t('solutions.solution1Spec6Key')]: t('solutions.solution1Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution1App1') },
      { name: t('solutions.solution1App2') },
      { name: t('solutions.solution1App3') },
      { name: t('solutions.solution1App4') },
      { name: t('solutions.solution1App5') },
    ],
    benefits: [
      t('solutions.solution1Benefit1'),
      t('solutions.solution1Benefit2'),
      t('solutions.solution1Benefit3'),
      t('solutions.solution1Benefit4'),
      t('solutions.solution1Benefit5'),
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
      'https://youtu.be/Qerp8XcGDw0', // A New Way to Sort Single Stream
      'https://youtu.be/M5nmNKVNCBw', // Single Stream Recycling Tour Material Recovery Facility
      'https://youtu.be/QFmP4fvjk6I', // Positive Sorting Next Gen MRF
      'https://youtu.be/9dxwdU9iGOM', // Building a 25 TPH Single Stream Recycling Facility
      'https://youtu.be/QYaqrF9vNbU'  // Norwalk CT Education and Testing Center
    ],
    gallery: [
      '/Images/single-stream-recycling.jpg',
      '/Images/mrf-systems.jpg'
    ],
    testimonials: [
      {
        name: 'Kevin Hanner',
        company: 'Smurfit Westrock',
        quote: 'Todd presented the information in an easy to understand format and was very thorough in his explanations. The small class size gave us the ability to dive deep into technical details.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default SingleStreamRecyclingPage;
