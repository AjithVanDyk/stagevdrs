import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const BollegraafPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 1,
    name: t('equipment.equipment1Name'),
    image: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg',
    description: t('equipment.equipment1Description'),
    features: [
      t('equipment.equipment1Feature1'),
      t('equipment.equipment1Feature2'),
      t('equipment.equipment1Feature3'),
      t('equipment.equipment1Feature4'),
      t('equipment.equipment1Feature5'),
      t('equipment.equipment1Feature6'),
      t('equipment.equipment1Feature7'),
      t('equipment.equipment1Feature8'),
      t('equipment.equipment1Feature9'),
      t('equipment.equipment1Feature10'),
    ],
    specifications: {
      [t('equipment.equipment1Spec1Key')]: t('equipment.equipment1Spec1Value'),
      [t('equipment.equipment1Spec2Key')]: t('equipment.equipment1Spec2Value'),
      [t('equipment.equipment1Spec3Key')]: t('equipment.equipment1Spec3Value'),
      [t('equipment.equipment1Spec4Key')]: t('equipment.equipment1Spec4Value'),
      [t('equipment.equipment1Spec5Key')]: t('equipment.equipment1Spec5Value'),
      [t('equipment.equipment1Spec6Key')]: t('equipment.equipment1Spec6Value'),
      [t('equipment.equipment1Spec7Key')]: t('equipment.equipment1Spec7Value'),
      [t('equipment.equipment1Spec8Key')]: t('equipment.equipment1Spec8Value'),
      [t('equipment.equipment1Spec9Key')]: t('equipment.equipment1Spec9Value'),
      [t('equipment.equipment1Spec10Key')]: t('equipment.equipment1Spec10Value'),
    },
    applications: [
      { name: 'High production balers', link: '/solutions/bollegraaf-balers' },
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'C&D recycling', link: '/solutions/cd-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' },
      { name: 'Waste to Energy', link: '/solutions/waste-to-energy' }
    ],
    videos: [
      'https://youtu.be/zqbJbMABi-A', // Bollegraaf HBC 140 Baler at Yes Recycling Newark NJ
      'https://youtu.be/m4VQvwWW9yU'  // Single Ram Baler
    ],
    gallery: [
      '/Images/Equipment/Bollegraaf/Gallery%201_WM%20Mesquite%20Creek-6.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%202_WM%20Mesquite%20Creek-7.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%204_VanDyk_jp%20mascaro.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%205_Mazza%20hbc120.png',
      '/Images/Equipment/Bollegraaf/Gallery%206_vandyk_plano229.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%207_p2-van-sanco-144.jpg',
      '/Images/Equipment/Bollegraaf/Gallery%208_USA%20Berlin%202023%20HBC140.png',
      '/Images/Equipment/Bollegraaf/Gallery%209_Plainfield.JPG',
      '/Images/Equipment/Bollegraaf/Gallery%2010_Yes%20hbc140.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-3.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-6.jpg',
      '/Images/Equipment/Bollegraaf/WM%20Mesquite%20Creek-7.jpg'
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default BollegraafPage;
