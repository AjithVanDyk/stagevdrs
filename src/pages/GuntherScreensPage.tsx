import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const GuntherScreensPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 7,
    name: t('equipment.equipment7Name'),
    image: '/Images/gunther-screens-new.jpg',
    description: t('equipment.equipment7Description'),
    features: [
      t('equipment.equipment7Feature1'),
      t('equipment.equipment7Feature2'),
      t('equipment.equipment7Feature3'),
      t('equipment.equipment7Feature4'),
      t('equipment.equipment7Feature5'),
      t('equipment.equipment7Feature6'),
    ],
    specifications: {
      [t('equipment.equipment7Spec1Key')]: t('equipment.equipment7Spec1Value'),
      [t('equipment.equipment7Spec2Key')]: t('equipment.equipment7Spec2Value'),
      [t('equipment.equipment7Spec3Key')]: t('equipment.equipment7Spec3Value'),
      [t('equipment.equipment7Spec4Key')]: t('equipment.equipment7Spec4Value'),
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Green waste and compost', link: '/solutions/organics-processing' },
      { name: 'Industrial waste' },
      { name: 'Waste wood' },
      { name: 'Metals' },
      { name: 'Clay and stones' }
    ],
    videos: [
      'https://youtu.be/y--l35L8EzI', // Elliptical Screen
      'https://youtu.be/uz4r_gb1Wjs'  // Sizing Screen
    ],
    gallery: [
      '/Images/Equipment/Gunther%20screens/IMG_6160.JPG',
      '/Images/Equipment/Gunther%20screens/IMG_8615.jpg',
      '/Images/Equipment/Gunther%20screens/IMG_8616.jpg',
      '/Images/Equipment/Gunther%20screens/IMG_8617.jpg'
    ],
    testimonials: [
      {
        name: 'Robert Kim',
        company: 'Advanced Screening Solutions',
        quote: 'GÜNTHER screens have revolutionized our screening efficiency. Outstanding performance.',
        rating: 5
      },
      {
        name: 'Susan Lee',
        company: 'EcoMaterials Processing',
        quote: 'Excellent screening technology with minimal maintenance. Highly recommended.',
        rating: 5
      },
      {
        name: 'David Park',
        company: 'Green Valley Recycling',
        quote: 'Superior material separation and sizing capabilities. Best investment we\'ve made.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default GuntherScreensPage;
