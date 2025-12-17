import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const FoodWasteDepackagingPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 4,
    name: t('solutions.solution4Name'),
    image: '/Images/smicon-food-depackaging.jpg',
    description: t('solutions.solution4Description'),
    features: [
      t('solutions.solution4Feature1'),
      t('solutions.solution4Feature2'),
      t('solutions.solution4Feature3'),
      t('solutions.solution4Feature4'),
      t('solutions.solution4Feature5'),
      t('solutions.solution4Feature6'),
      t('solutions.solution4Feature7'),
      t('solutions.solution4Feature8'),
    ],
    specifications: {
      [t('solutions.solution4Spec1Key')]: t('solutions.solution4Spec1Value'),
      [t('solutions.solution4Spec2Key')]: t('solutions.solution4Spec2Value'),
      [t('solutions.solution4Spec3Key')]: t('solutions.solution4Spec3Value'),
      [t('solutions.solution4Spec4Key')]: t('solutions.solution4Spec4Value'),
      [t('solutions.solution4Spec5Key')]: t('solutions.solution4Spec5Value'),
      [t('solutions.solution4Spec6Key')]: t('solutions.solution4Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution4App1') },
      { name: t('solutions.solution4App2') },
      { name: t('solutions.solution4App3') },
      { name: t('solutions.solution4App4') },
      { name: t('solutions.solution4App5') },
    ],
    benefits: [
      t('solutions.solution4Benefit1'),
      t('solutions.solution4Benefit2'),
      t('solutions.solution4Benefit3'),
      t('solutions.solution4Benefit4'),
      t('solutions.solution4Benefit5'),
    ],
    equipment: [
      { name: 'Smicon', link: '/equipment/smicon-depackager' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/smicon-food-depackaging.jpg',
      '/Images/smicon-depackager.jpg'
    ],
    testimonials: []
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default FoodWasteDepackagingPage;
