import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const SmiconDepackagerPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 6,
    name: t('equipment.equipment6Name'),
    image: '/Images/smicon-depackager-new.jpg',
    description: t('equipment.equipment6Description'),
    features: [
      t('equipment.equipment6Feature1'),
      t('equipment.equipment6Feature2'),
      t('equipment.equipment6Feature3'),
      t('equipment.equipment6Feature4'),
      t('equipment.equipment6Feature5'),
      t('equipment.equipment6Feature6'),
    ],
    specifications: {
      [t('equipment.equipment6Spec1Key')]: t('equipment.equipment6Spec1Value'),
      [t('equipment.equipment6Spec2Key')]: t('equipment.equipment6Spec2Value'),
      [t('equipment.equipment6Spec3Key')]: t('equipment.equipment6Spec3Value'),
      [t('equipment.equipment6Spec4Key')]: t('equipment.equipment6Spec4Value'),
    },
    applications: [
      { name: 'Food waste depackaging', link: '/solutions/food-waste-depackaging' },
      { name: 'Residential SSO' },
      { name: 'Commercial SSO' },
      { name: 'Bulk food waste' },
      { name: 'Restaurant waste' },
      { name: 'Mixed supermarket waste' },
      { name: 'Packaged produce' },
      { name: 'Canned foods' },
      { name: 'Beverage cartons and cans' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager
    ],
    gallery: [
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20input%20material.jpg',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20expelled%20packaging.png',
      '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/Sunnyvale%20slurry.png'
    ],
    testimonials: [
      {
        name: 'David Chen',
        company: 'Organic Solutions LLC',
        quote: 'The Smicon depackager has transformed our food waste processing. Recovery rates are exceptional.',
        rating: 5
      },
      {
        name: 'Lisa Thompson',
        company: 'Green Compost Co.',
        quote: 'Reliable, efficient, and easy to maintain. Perfect for our composting operation.',
        rating: 5
      },
      {
        name: 'Robert Wilson',
        company: 'EcoWaste Management',
        quote: 'Outstanding performance with minimal contamination. Highly recommended for food waste processing.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default SmiconDepackagerPage;
