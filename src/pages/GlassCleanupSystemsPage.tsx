import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const GlassCleanupSystemsPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 11,
    name: t('equipment.equipment11Name'),
    image: '/Images/glass-cleanup.jpg',
    description: t('equipment.equipment11Description'),
    features: [
      t('equipment.equipment11Feature1'),
      t('equipment.equipment11Feature2'),
      t('equipment.equipment11Feature3'),
      t('equipment.equipment11Feature4'),
      t('equipment.equipment11Feature5'),
      t('equipment.equipment11Feature6'),
    ],
    specifications: {
      [t('equipment.equipment11Spec1Key')]: t('equipment.equipment11Spec1Value'),
      [t('equipment.equipment11Spec2Key')]: t('equipment.equipment11Spec2Value'),
      [t('equipment.equipment11Spec3Key')]: t('equipment.equipment11Spec3Value'),
      [t('equipment.equipment11Spec4Key')]: t('equipment.equipment11Spec4Value'),
    },
    applications: [
      { name: t('equipment.equipment11App1') },
      { name: t('equipment.equipment11App2') },
      { name: t('equipment.equipment11App3') },
      { name: t('equipment.equipment11App4') },
      { name: t('equipment.equipment11App5') },
    ],
    videos: [
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/glass-cleanup.jpg',
      '/Images/glass-cleanup-1.jpg',
      '/Images/glass-cleanup-2.jpg'
    ],
    testimonials: [
      {
        name: 'Lisa Chen',
        company: 'Glass Solutions Inc',
        quote: 'Glass cleanup technology has revolutionized our glass processing. Exceptional purity rates.',
        rating: 5
      },
      {
        name: 'David Park',
        company: 'Crystal Clear Recycling',
        quote: 'Outstanding contamination removal with market-ready glass output.',
        rating: 5
      },
      {
        name: 'Maria Rodriguez',
        company: 'Pure Glass Systems',
        quote: 'Best glass cleanup system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default GlassCleanupSystemsPage;
