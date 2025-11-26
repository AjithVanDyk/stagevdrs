import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const CentriairOdorControlPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 8,
    name: t('equipment.equipment8Name'),
    image: '/Images/centriair-new-1.jpg',
    description: t('equipment.equipment8Description'),
    features: [
      t('equipment.equipment8Feature1'),
      t('equipment.equipment8Feature2'),
      t('equipment.equipment8Feature3'),
      t('equipment.equipment8Feature4'),
      t('equipment.equipment8Feature5'),
      t('equipment.equipment8Feature6'),
    ],
    specifications: {
      [t('equipment.equipment8Spec1Key')]: t('equipment.equipment8Spec1Value'),
      [t('equipment.equipment8Spec2Key')]: t('equipment.equipment8Spec2Value'),
      [t('equipment.equipment8Spec3Key')]: t('equipment.equipment8Spec3Value'),
      [t('equipment.equipment8Spec4Key')]: t('equipment.equipment8Spec4Value'),
    },
    applications: [
      { name: 'Biogas systems', link: '/solutions/organics-processing' },
      { name: 'Waste water treatment', link: '/solutions/organics-processing' },
      { name: 'Food waste processing', link: '/solutions/organics-processing' },
      { name: 'MSW processing', link: '/solutions/msw-processing' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/ircipzTwJRM' // VDRS Smimo Depackager (shows odor control in action)
    ],
    gallery: [
      '/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG'
      // Removed missing Screenshot image - file not found
    ],
    testimonials: [
      {
        name: 'Jennifer Chen',
        company: 'Odor Solutions Inc',
        quote: 'Centriair odor control has transformed our facility operations. Exceptional odor elimination.',
        rating: 5
      },
      {
        name: 'Michael Torres',
        company: 'Clean Air Systems',
        quote: 'Outstanding odor control performance with minimal maintenance requirements.',
        rating: 5
      },
      {
        name: 'Lisa Anderson',
        company: 'EcoAir Technologies',
        quote: 'Excellent investment. The odor control system exceeds all expectations.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default CentriairOdorControlPage;
