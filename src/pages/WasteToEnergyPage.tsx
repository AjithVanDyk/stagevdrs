import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const WasteToEnergyPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 9,
    name: t('solutions.solution9Name'),
    image: '/Images/waste-to-energy.jpg',
    description: t('solutions.solution9Description'),
    features: [
      t('solutions.solution9Feature1'),
      t('solutions.solution9Feature2'),
      t('solutions.solution9Feature3'),
      t('solutions.solution9Feature4'),
      t('solutions.solution9Feature5'),
      t('solutions.solution9Feature6'),
      t('solutions.solution9Feature7'),
      t('solutions.solution9Feature8'),
    ],
    specifications: {
      [t('solutions.solution9Spec1Key')]: t('solutions.solution9Spec1Value'),
      [t('solutions.solution9Spec2Key')]: t('solutions.solution9Spec2Value'),
      [t('solutions.solution9Spec3Key')]: t('solutions.solution9Spec3Value'),
      [t('solutions.solution9Spec4Key')]: t('solutions.solution9Spec4Value'),
      [t('solutions.solution9Spec5Key')]: t('solutions.solution9Spec5Value'),
      [t('solutions.solution9Spec6Key')]: t('solutions.solution9Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution9App1') },
      { name: t('solutions.solution9App2') },
      { name: t('solutions.solution9App3') },
      { name: t('solutions.solution9App4') },
      { name: t('solutions.solution9App5') },
    ],
    benefits: [
      t('solutions.solution9Benefit1'),
      t('solutions.solution9Benefit2'),
      t('solutions.solution9Benefit3'),
      t('solutions.solution9Benefit4'),
      t('solutions.solution9Benefit5'),
    ],
    equipment: [
      { name: 'Bollegraaf', link: '/equipment/bollegraaf' },
      { name: 'Lubo', link: '/equipment/lubo-screening' },
      { name: 'Tomra', link: '/equipment/tomra' },
      { name: 'Pellenc', link: '/equipment/pellenc-st' },
      { name: 'Gunther', link: '/equipment/gunther-screens' },
      { name: 'Centriair', link: '/equipment/centriair-odor-control' },
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' },
      { name: 'Smicon', link: '/equipment/smicon-depackager' }
    ],
    videos: [
      'https://youtu.be/jJ0G65ako44' // MRFs in Crisis 2019
    ],
    gallery: [
      '/Images/waste-to-energy.jpg',
      '/Images/wasttoenergy.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'Clean Energy Solutions',
        quote: 'Waste-to-energy technology has revolutionized our energy production. Clean and efficient.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'EcoPower Systems',
        quote: 'Outstanding energy recovery rates with minimal environmental impact.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'Sustainable Energy Corp',
        quote: 'Best waste-to-energy system we\'ve implemented. Highly reliable and efficient.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default WasteToEnergyPage;
