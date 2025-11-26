import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const DensimetricTablePage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 10,
    name: t('equipment.equipment10Name'),
    image: '/Images/densimetric-table-new.jpg',
    description: t('equipment.equipment10Description'),
    features: [
      t('equipment.equipment10Feature1'),
      t('equipment.equipment10Feature2'),
      t('equipment.equipment10Feature3'),
      t('equipment.equipment10Feature4'),
      t('equipment.equipment10Feature5'),
      t('equipment.equipment10Feature6'),
    ],
    specifications: {
      [t('equipment.equipment10Spec1Key')]: t('equipment.equipment10Spec1Value'),
      [t('equipment.equipment10Spec2Key')]: t('equipment.equipment10Spec2Value'),
      [t('equipment.equipment10Spec3Key')]: t('equipment.equipment10Spec3Value'),
      [t('equipment.equipment10Spec4Key')]: t('equipment.equipment10Spec4Value'),
    },
    applications: [
      { name: 'Compost refining', link: '/solutions/composting-densimetric-tables' },
      { name: 'Organics processing', link: '/solutions/organics-processing' }
    ],
    videos: [
      'https://youtu.be/5VvtScst8yI', // Compost Cleaning with an Allgaier Densimetric Table
      'https://youtu.be/uyoDglUAzWw'  // New Densimetric Table
    ],
    gallery: [
      '/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg',
      '/Images/Equipment/Densimetric%20table/Dtable_Clean%20compost%20pic.JPG',
      '/Images/Equipment/Densimetric%20table/Dtable_Dirty%20Compost%20Infeed.JPG',
      '/Images/Equipment/Densimetric%20table/Dtable_Heavy%20contamination.JPG'
    ],
    testimonials: []
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default DensimetricTablePage;
