import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const WalairDensitySeparationPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 10,
    name: t('equipment.equipment10Name'),
    image: '/Images/walair-density-separation.jpg',
    description: t('equipment.equipment10Description'),
    features: [
      t('equipment.equipment10Feature1'),
      t('equipment.equipment10Feature2'),
      t('equipment.equipment10Feature3'),
      t('equipment.equipment10Feature4'),
      t('equipment.equipment10Feature5'),
      t('equipment.equipment10Feature6'),
    ],
    specifications: {
      [t('equipment.equipment10Spec1Key')]: t('equipment.equipment10Spec1Value'),
      [t('equipment.equipment10Spec2Key')]: t('equipment.equipment10Spec2Value'),
      [t('equipment.equipment10Spec3Key')]: t('equipment.equipment10Spec3Value'),
      [t('equipment.equipment10Spec4Key')]: t('equipment.equipment10Spec4Value'),
    },
    applications: [
      { name: t('equipment.equipment10App1') },
      { name: t('equipment.equipment10App2') },
      { name: t('equipment.equipment10App3') },
      { name: t('equipment.equipment10App4') },
    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/walair-density-separation.jpg'
    ],
    testimonials: [
      {
        name: 'Jennifer Chen',
        company: 'Density Solutions Inc',
        quote: 'Walair density separation technology has transformed our material sorting accuracy.',
        rating: 5
      },
      {
        name: 'Michael Torres',
        company: 'Precision Recycling',
        quote: 'Outstanding density separation performance with minimal maintenance requirements.',
        rating: 5
      },
      {
        name: 'Lisa Anderson',
        company: 'EcoSort Technologies',
        quote: 'Excellent investment. The density separation accuracy exceeds all expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default WalairDensitySeparationPage;
