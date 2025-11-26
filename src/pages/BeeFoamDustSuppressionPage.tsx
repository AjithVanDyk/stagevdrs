import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const BeeFoamDustSuppressionPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 11,
    name: t('equipment.equipment11Name'),
    image: '/Images/beefoam-after-new.jpg',
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
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics recycling', link: '/solutions/plastics-recycling' },
      { name: 'Compost', link: '/solutions/organics-processing' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' },
      { name: 'Sorting lines' },
      { name: 'Metal recycling' },
      { name: 'Wood shredders' },
      { name: 'Stone crushers' },
      { name: 'Coal' },
      { name: 'Cement and concrete' }
    ],
    videos: [
      'https://youtu.be/MOjFp3y7mEw', // Construction and Demolition Waste Sorting System
      'https://youtu.be/Lt-ZYSw6p3w'  // Lubo Neptune AWS StarScreen Sorting C&D Waste
    ],
    gallery: [
      '/Images/Equipment/Beefoam%20dust%20suppression/after%20beefoam.JPG',
      '/Images/Equipment/Beefoam%20dust%20suppression/Beepro%20application.png',
      '/Images/Equipment/Beefoam%20dust%20suppression/before%20beefoam.JPG'
    ],
    testimonials: [
      {
        name: 'David Kim',
        company: 'Dust Control Solutions',
        quote: 'BeeFoam dust suppression has transformed our operations. Exceptional dust control.',
        rating: 5
      },
      {
        name: 'Maria Garcia',
        company: 'Clean Air Systems',
        quote: 'Outstanding dust suppression performance with minimal water usage.',
        rating: 5
      },
      {
        name: 'James Wilson',
        company: 'EcoDust Technologies',
        quote: 'Best dust suppression system we\'ve used. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default BeeFoamDustSuppressionPage;
