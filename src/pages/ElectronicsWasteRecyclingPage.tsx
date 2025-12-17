import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const ElectronicsWasteRecyclingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 10,
    name: t('solutions.solution10Name'),
    image: '/Images/electronics-recycling.jpg',
    description: t('solutions.solution10Description'),
    features: [
      t('solutions.solution10Feature1'),
      t('solutions.solution10Feature2'),
      t('solutions.solution10Feature3'),
      t('solutions.solution10Feature4'),
      t('solutions.solution10Feature5'),
      t('solutions.solution10Feature6'),
      t('solutions.solution10Feature7'),
      t('solutions.solution10Feature8'),
    ],
    specifications: {
      [t('solutions.solution10Spec1Key')]: t('solutions.solution10Spec1Value'),
      [t('solutions.solution10Spec2Key')]: t('solutions.solution10Spec2Value'),
      [t('solutions.solution10Spec3Key')]: t('solutions.solution10Spec3Value'),
      [t('solutions.solution10Spec4Key')]: t('solutions.solution10Spec4Value'),
      [t('solutions.solution10Spec5Key')]: t('solutions.solution10Spec5Value'),
      [t('solutions.solution10Spec6Key')]: t('solutions.solution10Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution10App1') },
      { name: t('solutions.solution10App2') },
      { name: t('solutions.solution10App3') },
      { name: t('solutions.solution10App4') },
      { name: t('solutions.solution10App5') },
    ],
    benefits: [
      t('solutions.solution10Benefit1'),
      t('solutions.solution10Benefit2'),
      t('solutions.solution10Benefit3'),
      t('solutions.solution10Benefit4'),
      t('solutions.solution10Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Beefoam', link: '/equipment/beefoam-dust-suppression' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4', // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
      'https://youtu.be/bnpoNRYk7_I'  // E-Scrap Recycling Processing with Tomra Optical Sorter at Premier Surplus Dawsonville GA
    ],
    gallery: [
      '/Images/electronics-recycling.jpg',
      '/Images/cd-recycling.jpg',
      '/Images/cdrecycle.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default ElectronicsWasteRecyclingPage;
