import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const ReckelbergEnvironmentalPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 12,
    name: t('equipment.equipment12Name'),
    image: '/Images/reckelberg-impact-reactor-new.jpg',
    description: t('equipment.equipment12Description'),
    features: [
      t('equipment.equipment12Feature1'),
      t('equipment.equipment12Feature2'),
      t('equipment.equipment12Feature3'),
      t('equipment.equipment12Feature4'),
      t('equipment.equipment12Feature5'),
      t('equipment.equipment12Feature6'),
    ],
    specifications: {
      [t('equipment.equipment12Spec1Key')]: t('equipment.equipment12Spec1Value'),
      [t('equipment.equipment12Spec2Key')]: t('equipment.equipment12Spec2Value'),
      [t('equipment.equipment12Spec3Key')]: t('equipment.equipment12Spec3Value'),
    },
    applications: [
      { name: 'Battery recycling', link: '/solutions/battery-recycling-systems' }
    ],
    videos: [
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp',
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/Dryer.webp',
      '/Images/Equipment/Reckelberg%20Environmental%20Technologies/Discharge.webp'
    ],
    testimonials: [
      {
        name: 'Robert Thompson',
        company: 'Environmental Solutions Inc',
        quote: 'Reckelberg technology has revolutionized our environmental processing. Exceptional performance.',
        rating: 5
      },
      {
        name: 'Jennifer Lee',
        company: 'EcoTech Environmental',
        quote: 'Outstanding environmental technology with excellent processing capabilities.',
        rating: 5
      },
      {
        name: 'Carlos Martinez',
        company: 'Green Environmental Systems',
        quote: 'Best environmental processing system we\'ve implemented. Highly efficient and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default ReckelbergEnvironmentalPage;
