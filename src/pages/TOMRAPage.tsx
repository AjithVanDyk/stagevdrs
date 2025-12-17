import React from 'react';
import EquipmentPageTemplate from '../components/EquipmentPageTemplate';
import { useTranslation } from '../hooks/useTranslation';

const TOMRAPage: React.FC = () => {
  const { t } = useTranslation();
  const equipment = {
    id: 3,
    name: t('equipment.equipment3Name'),
    image: '/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg',
    description: t('equipment.equipment3Description'),
    features: [
      t('equipment.equipment3Feature1'),
      t('equipment.equipment3Feature2'),
      t('equipment.equipment3Feature3'),
      t('equipment.equipment3Feature4'),
      t('equipment.equipment3Feature5'),
      t('equipment.equipment3Feature6'),
      t('equipment.equipment3Feature7'),
      t('equipment.equipment3Feature8'),
    ],
    specifications: {
      [t('equipment.equipment3Spec1Key')]: t('equipment.equipment3Spec1Value'),
      [t('equipment.equipment3Spec2Key')]: t('equipment.equipment3Spec2Value'),
      [t('equipment.equipment3Spec3Key')]: t('equipment.equipment3Spec3Value'),
      [t('equipment.equipment3Spec4Key')]: t('equipment.equipment3Spec4Value'),
      [t('equipment.equipment3Spec5Key')]: t('equipment.equipment3Spec5Value'),
      [t('equipment.equipment3Spec6Key')]: t('equipment.equipment3Spec6Value'),
      [t('equipment.equipment3Spec7Key')]: t('equipment.equipment3Spec7Value'),
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
      'https://youtu.be/_AHxVzUYGxE',  // Clean Up Mixed Paper with Laser Object Detection
      'https://youtu.be/OSOB0JfqPTY', // E-Scrap Processing with Tomra Autosort Fines Optical Sorter
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4', // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
      'https://youtu.be/bnpoNRYk7_I'  // E-Scrap Recycling Processing with Tomra Optical Sorter at Premier Surplus Dawsonville GA
    ],
    gallery: [
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%201_tomra.jpg',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%202_tomra.png',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%203_tomra.png',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%204_tomra.jpeg',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%205_tomra.jpg',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%206_tomra.jpeg',
      '/Images/Equipment/Tomra%20Optical%20sorters/Gallery%207_tomra.png'
    ],
    testimonials: [
      {
        name: 'Kevin Hanner',
        company: 'Smurfit Westrock',
        quote: 'Todd presented the information in an easy to understand format and was very thorough in his explanations. The small class size gave us the ability to dive deep into technical details of classifier builds, geometry, and sensors.',
        rating: 5
      },
      {
        name: 'Ronak Pored',
        company: 'GFL',
        quote: 'Todd is very knowledgeable and gave very good information. The troubleshooting tasks were very helpful and helped me broaden my optical knowledge.',
        rating: 5
      },
      {
        name: 'An Kruan',
        company: 'WM Germantown',
        quote: 'OUTSTANDING. Well versed and personable. Much more in-depth than other training programs. Very beneficial for knowledgeable maintenance staff.',
        rating: 5
      }
    ]
  };

  return <EquipmentPageTemplate equipment={equipment} />;
};

export default TOMRAPage;
