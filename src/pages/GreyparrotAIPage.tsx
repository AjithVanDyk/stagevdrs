import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const GreyparrotAIPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 9,
    name: t('equipment.equipment9Name'),
    image: '/Images/greyparrot-ai-new.jpg',
    description: t('equipment.equipment9Description'),
    features: [
      t('equipment.equipment9Feature1'),
      t('equipment.equipment9Feature2'),
      t('equipment.equipment9Feature3'),
      t('equipment.equipment9Feature4'),
      t('equipment.equipment9Feature5'),
      t('equipment.equipment9Feature6'),
    ],
    specifications: {
      [t('equipment.equipment9Spec1Key')]: t('equipment.equipment9Spec1Value'),
      [t('equipment.equipment9Spec2Key')]: t('equipment.equipment9Spec2Value'),
      [t('equipment.equipment9Spec3Key')]: t('equipment.equipment9Spec3Value'),
      [t('equipment.equipment9Spec4Key')]: t('equipment.equipment9Spec4Value'),
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'AI-based waste analytics', link: '/solutions/ai-waste-analysis' }
    ],
    videos: [
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png',
      '/Images/Equipment/Greyparrot%20AI/_DSF3561%20copy.jpg',
      '/Images/Equipment/Greyparrot%20AI/_DSF3580%20copy.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'AI Waste Solutions',
        quote: 'Greyparrot AI has revolutionized our waste analytics. Exceptional accuracy and insights.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'Smart Waste Systems',
        quote: 'Outstanding AI technology with real-time analytics capabilities.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'EcoAnalytics Corp',
        quote: 'Best AI waste analytics system we\'ve implemented. Highly accurate and reliable.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default GreyparrotAIPage;
