import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const BollegraafBalersSolutionPage: React.FC = () => {
  const { t } = useTranslation();
  const solution = {
    id: 13,
    name: t('solutions.solution13Name'),
    image: '/Images/bollegraaf-new-1.jpg',
    description: t('solutions.solution13Description'),
    features: [
      t('solutions.solution13Feature1'),
      t('solutions.solution13Feature2'),
      t('solutions.solution13Feature3'),
      t('solutions.solution13Feature4'),
      t('solutions.solution13Feature5'),
      t('solutions.solution13Feature6'),
      t('solutions.solution13Feature7'),
      t('solutions.solution13Feature8'),
    ],
    specifications: {
      [t('solutions.solution13Spec1Key')]: t('solutions.solution13Spec1Value'),
      [t('solutions.solution13Spec2Key')]: t('solutions.solution13Spec2Value'),
      [t('solutions.solution13Spec3Key')]: t('solutions.solution13Spec3Value'),
      [t('solutions.solution13Spec4Key')]: t('solutions.solution13Spec4Value'),
      [t('solutions.solution13Spec5Key')]: t('solutions.solution13Spec5Value'),
      [t('solutions.solution13Spec6Key')]: t('solutions.solution13Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution13App1') },
      { name: t('solutions.solution13App2') },
      { name: t('solutions.solution13App3') },
      { name: t('solutions.solution13App4') },
      { name: t('solutions.solution13App5') },
    ],
    benefits: [
      t('solutions.solution13Benefit1'),
      t('solutions.solution13Benefit2'),
      t('solutions.solution13Benefit3'),
      t('solutions.solution13Benefit4'),
      t('solutions.solution13Benefit5'),
    ],
    videos: [
      'https://youtu.be/zqbJbMABi-A', // Bollegraaf HBC 140 Baler at Yes Recycling Newark NJ
      'https://youtu.be/m4VQvwWW9yU'  // Single Ram Baler
    ],
    gallery: [
      '/Images/bollegraaf-new-1.jpg',
      '/Images/bollegraaf-products.jpg',
      '/Images/bollegraaf-baler.jpg'
    ],
    testimonials: [
      {
        name: 'John Smith',
        company: 'Recycling Solutions Inc',
        quote: 'Bollegraaf balers have transformed our operations. The single ram design saves us 50% on electricity costs.',
        rating: 5
      },
      {
        name: 'Sarah Johnson',
        company: 'EcoMaterials Processing',
        quote: 'Outstanding productivity with over 35 tph production speed. The pre-press flap eliminates shearing completely.',
        rating: 5
      },
      {
        name: 'Mike Rodriguez',
        company: 'Green Valley Recycling',
        quote: 'Best baler investment we\'ve made. Automated operation with no dedicated operator needed.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default BollegraafBalersSolutionPage;
