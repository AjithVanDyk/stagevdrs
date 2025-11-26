import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const LuboScreeningPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 2,
    name: t('equipment.equipment2Name'),
    image: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg',
    description: t('equipment.equipment2Description'),
    features: [
      t('equipment.equipment2Feature1'),
      t('equipment.equipment2Feature2'),
      t('equipment.equipment2Feature3'),
      t('equipment.equipment2Feature4'),
      t('equipment.equipment2Feature5'),
      t('equipment.equipment2Feature6'),
      t('equipment.equipment2Feature7'),
      t('equipment.equipment2Feature8'),
    ],
    specifications: {
      [t('equipment.equipment2Spec1Key')]: t('equipment.equipment2Spec1Value'),
      [t('equipment.equipment2Spec2Key')]: t('equipment.equipment2Spec2Value'),
      [t('equipment.equipment2Spec3Key')]: t('equipment.equipment2Spec3Value'),
      [t('equipment.equipment2Spec4Key')]: t('equipment.equipment2Spec4Value'),
      [t('equipment.equipment2Spec5Key')]: t('equipment.equipment2Spec5Value'),
      [t('equipment.equipment2Spec6Key')]: t('equipment.equipment2Spec6Value'),
      [t('equipment.equipment2Spec7Key')]: t('equipment.equipment2Spec7Value'),
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/jZnfLHXHWAQ', // Non-Wrapping 440 Screen
      'https://youtu.be/lTQ4xEe7WOg', // Lubo StarScreen Sorting MSW
      'https://youtu.be/Lt-ZYSw6p3w', // Lubo Neptune AWS StarScreen Sorting C&D Waste
      'https://youtu.be/y--l35L8EzI', // Elliptical Screen
      'https://youtu.be/uz4r_gb1Wjs'  // Sizing Screen
    ],
    gallery: [
      '/Images/Equipment/Lubo%20Screens/Gallery%201_onp.JPG',
      '/Images/Equipment/Lubo%20Screens/Gallery%202_onp.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%203_sbc.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%204_880%20stars.JPG',
      '/Images/Equipment/Lubo%20Screens/Gallery%205_sbc.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%206_OCC.JPG',
      '/Images/Equipment/Lubo%20Screens/Gallery%207_onp.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%208_elliptical.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%209_elliptical.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%2010_op.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%2011_onp.jpg',
      '/Images/Equipment/Lubo%20Screens/Gallery%2012_sizing%20screens.JPG'
    ],
    testimonials: [
      {
        name: 'Robert Kim',
        company: 'Advanced Screening Solutions',
        quote: 'The Lubo StarScreen technology has revolutionized our screening efficiency. Outstanding performance.',
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

export default LuboScreeningPage;
