import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const AIWasteAnalysisPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 14,
    name: t('solutions.solution14Name'),
    image: '/Images/greyparrot-ai-new.jpg',
    description: t('solutions.solution14Description'),
    features: [
      t('solutions.solution14Feature1'),
      t('solutions.solution14Feature2'),
      t('solutions.solution14Feature3'),
      t('solutions.solution14Feature4'),
      t('solutions.solution14Feature5'),
      t('solutions.solution14Feature6'),
      t('solutions.solution14Feature7'),
      t('solutions.solution14Feature8'),
    ],
    specifications: {
      [t('solutions.solution14Spec1Key')]: t('solutions.solution14Spec1Value'),
      [t('solutions.solution14Spec2Key')]: t('solutions.solution14Spec2Value'),
      [t('solutions.solution14Spec3Key')]: t('solutions.solution14Spec3Value'),
      [t('solutions.solution14Spec4Key')]: t('solutions.solution14Spec4Value'),
      [t('solutions.solution14Spec5Key')]: t('solutions.solution14Spec5Value'),
      [t('solutions.solution14Spec6Key')]: t('solutions.solution14Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution14App1') },
      { name: t('solutions.solution14App2') },
      { name: t('solutions.solution14App3') },
      { name: t('solutions.solution14App4') },
      { name: t('solutions.solution14App5') },
    ],
    benefits: [
      t('solutions.solution14Benefit1'),
      t('solutions.solution14Benefit2'),
      t('solutions.solution14Benefit3'),
      t('solutions.solution14Benefit4'),
      t('solutions.solution14Benefit5'),
    ],
    equipment: [
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/greyparrot-ai-new.jpg',
      '/Images/greyparrot-ai-recognition.jpg',
      '/Images/greyparrot-ai.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'AI Waste Solutions',
        quote: 'AI waste analysis has revolutionized our operations. Exceptional accuracy and insights.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'Smart Waste Systems',
        quote: 'Outstanding AI technology with real-time analytics capabilities.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'EcoAnalytics Corp',
        quote: 'Best AI waste analysis system we\'ve implemented. Highly accurate and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default AIWasteAnalysisPage;
