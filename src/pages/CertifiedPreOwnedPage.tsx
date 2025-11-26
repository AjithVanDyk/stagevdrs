import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CertifiedPreOwnedPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 13,
    name: t('equipment.equipment13Name'),
    image: '/Images/certified-pre-owned.jpg',
    description: t('equipment.equipment13Description'),
    features: [
      t('equipment.equipment13Feature1'),
      t('equipment.equipment13Feature2'),
      t('equipment.equipment13Feature3'),
      t('equipment.equipment13Feature4'),
      t('equipment.equipment13Feature5'),
      t('equipment.equipment13Feature6'),
    ],
    specifications: {
      [t('equipment.equipment13Spec1Key')]: t('equipment.equipment13Spec1Value'),
      [t('equipment.equipment13Spec2Key')]: t('equipment.equipment13Spec2Value'),
      [t('equipment.equipment13Spec3Key')]: t('equipment.equipment13Spec3Value'),
      [t('equipment.equipment13Spec4Key')]: t('equipment.equipment13Spec4Value'),
    },
    applications: [
      { name: 'Bollegraaf balers', link: '/equipment/bollegraaf' },
      { name: 'Optical sorters' },
      { name: 'Conveyors' },
      { name: 'Belts' },
      { name: 'Eddy currents' },
      { name: 'Magnets' },
      { name: 'Screens' }
    ],
    videos: [
      'https://youtu.be/zqbJbMABi-A', // Bollegraaf HBC 140 Baler at Yes Recycling Newark NJ
      'https://youtu.be/m4VQvwWW9yU', // Single Ram Baler
      'https://youtu.be/6QVk7q7OEqo', // Eddy Current
      'https://youtu.be/XyIYg0wBHC4'  // Magnet
    ],
    gallery: [
      '/Images/Equipment/Certified%20Pre-owned%20Equipment/rebuilt%20baler.png'
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'EcoRecycling Solutions',
        quote: 'Certified pre-owned equipment has been a game-changer for our budget. Excellent quality.',
        rating: 5
      },
      {
        name: 'Michael Chen',
        company: 'Green Valley Materials',
        quote: 'Outstanding value with factory-certified quality. Highly recommended.',
        rating: 5
      },
      {
        name: 'Lisa Rodriguez',
        company: 'Sustainable Recycling Inc',
        quote: 'Best investment we\'ve made. Premium equipment at affordable prices.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default CertifiedPreOwnedPage;
