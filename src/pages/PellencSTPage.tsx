import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const PellencSTPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 4,
    name: t('equipment.equipment4Name'),
    image: '/Images/Equipment/Pellenc%20optical%20sorters/Product%20image_pellenc.JPG',
    description: t('equipment.equipment4Description'),
    features: [
      t('equipment.equipment4Feature1'),
      t('equipment.equipment4Feature2'),
      t('equipment.equipment4Feature3'),
      t('equipment.equipment4Feature4'),
      t('equipment.equipment4Feature5'),
      t('equipment.equipment4Feature6'),
      t('equipment.equipment4Feature7'),
      t('equipment.equipment4Feature8'),
    ],
    specifications: {
      [t('equipment.equipment4Spec1Key')]: t('equipment.equipment4Spec1Value'),
      [t('equipment.equipment4Spec2Key')]: t('equipment.equipment4Spec2Value'),
      [t('equipment.equipment4Spec3Key')]: t('equipment.equipment4Spec3Value'),
      [t('equipment.equipment4Spec4Key')]: t('equipment.equipment4Spec4Value'),
      [t('equipment.equipment4Spec5Key')]: t('equipment.equipment4Spec5Value'),
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' }
    ],
    videos: [
      'https://youtu.be/8Xj4Zwv81uE', // Container Line Featuring Optical Sorting
      'https://youtu.be/FfoIMHZv9CQ', // Container Line Featuring Optical Sorting 2
      'https://youtu.be/_AHxVzUYGxE'  // Clean Up Mixed Paper with Laser Object Detection
    ],
    gallery: [
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%201_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%202_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%203_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%204_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%205_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%206_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%207_pellenc.JPG',
      '/Images/Equipment/Pellenc%20optical%20sorters/Gallery%2013_pellenc.JPG'
    ],
    testimonials: [
      {
        name: 'John Smith',
        company: 'Green Valley Recycling',
        quote: 'The Pellenc ST system has revolutionized our sorting accuracy. We\'ve seen a 40% improvement in material recovery rates.',
        rating: 5
      },
      {
        name: 'Sarah Johnson',
        company: 'EcoTech Materials',
        quote: 'Outstanding technology with minimal maintenance. The AI recognition is incredibly precise and reliable.',
        rating: 5
      },
      {
        name: 'Mike Rodriguez',
        company: 'Sustainable Solutions Inc.',
        quote: 'Best investment we\'ve made. The sorting speed and accuracy have exceeded our expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default PellencSTPage;
