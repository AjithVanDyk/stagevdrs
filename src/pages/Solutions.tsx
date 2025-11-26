import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import { useTranslation } from '../hooks/useTranslation';
import { animationConfig } from '../utils/animations';

interface Solution {
	id?: number;
	name: string;
	image: string;
	description?: string;
	features?: string[];
	specifications?: { [key: string]: string | undefined };
	applications?: string[];
	benefits?: string[];
}

// Old hardcoded array removed - now using translations inside component

const Solutions = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
	const [showSolutionModal, setShowSolutionModal] = useState(false);
	const [showQuoteForm, setShowQuoteForm] = useState(false);
	
	// Solution items with translations - moved inside component to access t()
	const solutionItems: Solution[] = [
		{
			id: 1,
			name: t('solutions.solution1Name'),
			image: IMAGE_ASSIGNMENTS.solutions.categories.singleStream,
			description: t('solutions.solution1Description'),
			features: [
				t('solutions.solution1Feature1'),
				t('solutions.solution1Feature2'),
				t('solutions.solution1Feature3'),
				t('solutions.solution1Feature4'),
				t('solutions.solution1Feature5'),
				t('solutions.solution1Feature6'),
				t('solutions.solution1Feature7'),
				t('solutions.solution1Feature8'),
			],
			specifications: {
				[t('solutions.solution1Spec1Key')]: t('solutions.solution1Spec1Value'),
				[t('solutions.solution1Spec2Key')]: t('solutions.solution1Spec2Value'),
				[t('solutions.solution1Spec3Key')]: t('solutions.solution1Spec3Value'),
				[t('solutions.solution1Spec4Key')]: t('solutions.solution1Spec4Value'),
				[t('solutions.solution1Spec5Key')]: t('solutions.solution1Spec5Value'),
				[t('solutions.solution1Spec6Key')]: t('solutions.solution1Spec6Value'),
			},
			applications: [
				t('solutions.solution1App1'),
				t('solutions.solution1App2'),
				t('solutions.solution1App3'),
				t('solutions.solution1App4'),
				t('solutions.solution1App5'),
			],
			benefits: [
				t('solutions.solution1Benefit1'),
				t('solutions.solution1Benefit2'),
				t('solutions.solution1Benefit3'),
				t('solutions.solution1Benefit4'),
				t('solutions.solution1Benefit5'),
			]
		},
		{
			id: 2,
			name: t('solutions.solution2Name'),
			image: IMAGE_ASSIGNMENTS.solutions.categories.plastics,
			description: t('solutions.solution2Description'),
			features: [
				t('solutions.solution2Feature1'),
				t('solutions.solution2Feature2'),
				t('solutions.solution2Feature3'),
				t('solutions.solution2Feature4'),
				t('solutions.solution2Feature5'),
				t('solutions.solution2Feature6'),
				t('solutions.solution2Feature7'),
				t('solutions.solution2Feature8'),
			],
			specifications: {
				[t('solutions.solution2Spec1Key')]: t('solutions.solution2Spec1Value'),
				[t('solutions.solution2Spec2Key')]: t('solutions.solution2Spec2Value'),
				[t('solutions.solution2Spec3Key')]: t('solutions.solution2Spec3Value'),
				[t('solutions.solution2Spec4Key')]: t('solutions.solution2Spec4Value'),
				[t('solutions.solution2Spec5Key')]: t('solutions.solution2Spec5Value'),
				[t('solutions.solution2Spec6Key')]: t('solutions.solution2Spec6Value'),
			},
			applications: [
				t('solutions.solution2App1'),
				t('solutions.solution2App2'),
				t('solutions.solution2App3'),
				t('solutions.solution2App4'),
				t('solutions.solution2App5'),
			],
			benefits: [
				t('solutions.solution2Benefit1'),
				t('solutions.solution2Benefit2'),
				t('solutions.solution2Benefit3'),
				t('solutions.solution2Benefit4'),
				t('solutions.solution2Benefit5'),
			]
		},
		// Solutions 3-16 will be added with full translations
		// For now using fallback to English until translations are added
		{
			id: 3,
			name: t('solutions.solution3Name') || 'Organics Processing',
			image: IMAGE_ASSIGNMENTS.solutions.categories.organics,
			description: t('solutions.solution3Description') || 'Comprehensive organics processing solutions for efficient handling of organic waste materials. Our systems maximize organic recovery and produce high-quality compost.',
			features: [
				t('solutions.solution3Feature1') || 'Organic waste processing',
				t('solutions.solution3Feature2') || 'High-efficiency organic recovery',
				t('solutions.solution3Feature3') || 'Compost production systems',
				t('solutions.solution3Feature4') || 'Odor control integration',
				t('solutions.solution3Feature5') || 'Quality control monitoring',
				t('solutions.solution3Feature6') || 'Modular system design',
				t('solutions.solution3Feature7') || 'Environmental compliance',
				t('solutions.solution3Feature8') || 'Pathogen reduction',
			],
			specifications: {
				[t('solutions.solution3Spec1Key') || 'Processing Capacity']: t('solutions.solution3Spec1Value') || 'Up to 40 tons per day',
				[t('solutions.solution3Spec2Key') || 'Organic Recovery']: t('solutions.solution3Spec2Value') || '90%+ recovery rate',
				[t('solutions.solution3Spec3Key') || 'Compost Quality']: t('solutions.solution3Spec3Value') || 'High-grade output',
				[t('solutions.solution3Spec4Key') || 'Processing Efficiency']: t('solutions.solution3Spec4Value') || '85%+ efficiency rate',
				[t('solutions.solution3Spec5Key') || 'Technology']: t('solutions.solution3Spec5Value') || 'Advanced organic processing',
				[t('solutions.solution3Spec6Key') || 'Maintenance']: t('solutions.solution3Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution3App1') || 'Composting facilities',
				t('solutions.solution3App2') || 'Food waste processing',
				t('solutions.solution3App3') || 'Agricultural waste management',
				t('solutions.solution3App4') || 'Municipal organics programs',
				t('solutions.solution3App5') || 'Commercial food waste',
			],
			benefits: [
				t('solutions.solution3Benefit1') || 'High organic recovery',
				t('solutions.solution3Benefit2') || 'Quality compost production',
				t('solutions.solution3Benefit3') || 'Odor control',
				t('solutions.solution3Benefit4') || 'Environmental compliance',
				t('solutions.solution3Benefit5') || 'Cost-effective processing',
			]
		},
		// Note: Solutions 4-16 translations will be added to translations.ts
		// For now, these use English fallbacks until translations are complete
		{
			id: 4,
			name: t('solutions.solution4Name') || 'Food Waste Depackaging',
			image: IMAGE_ASSIGNMENTS.solutions.categories.foodWaste,
			description: t('solutions.solution4Description') || 'Advanced food waste depackaging solutions for efficient separation of organic materials from packaging.',
			features: [
				t('solutions.solution4Feature1') || 'Advanced depackaging technology',
				t('solutions.solution4Feature2') || 'High-efficiency organic separation',
				t('solutions.solution4Feature3') || 'Minimal contamination output',
				t('solutions.solution4Feature4') || 'Automated processing systems',
				t('solutions.solution4Feature5') || 'Flexible packaging handling',
				t('solutions.solution4Feature6') || 'Odor control integration',
				t('solutions.solution4Feature7') || 'Quality control monitoring',
				t('solutions.solution4Feature8') || 'Modular system design',
			],
			specifications: {
				[t('solutions.solution4Spec1Key') || 'Processing Capacity']: t('solutions.solution4Spec1Value') || 'Up to 20 tons per hour',
				[t('solutions.solution4Spec2Key') || 'Organic Recovery']: t('solutions.solution4Spec2Value') || '95%+ organic material recovery',
				[t('solutions.solution4Spec3Key') || 'Contamination Level']: t('solutions.solution4Spec3Value') || '<5% contamination',
				[t('solutions.solution4Spec4Key') || 'Packaging Types']: t('solutions.solution4Spec4Value') || 'Plastic, cardboard, metal containers',
				[t('solutions.solution4Spec5Key') || 'Processing Efficiency']: t('solutions.solution4Spec5Value') || '90%+ efficiency rate',
				[t('solutions.solution4Spec6Key') || 'Technology']: t('solutions.solution4Spec6Value') || 'Advanced depackaging systems',
			},
			applications: [
				t('solutions.solution4App1') || 'Food processing facilities',
				t('solutions.solution4App2') || 'Restaurant waste management',
				t('solutions.solution4App3') || 'Grocery store waste processing',
				t('solutions.solution4App4') || 'Commercial kitchens',
				t('solutions.solution4App5') || 'Food manufacturing plants',
			],
			benefits: [
				t('solutions.solution4Benefit1') || 'High organic recovery',
				t('solutions.solution4Benefit2') || 'Low contamination',
				t('solutions.solution4Benefit3') || 'Flexible packaging handling',
				t('solutions.solution4Benefit4') || 'Odor control',
				t('solutions.solution4Benefit5') || 'Cost-effective processing',
			]
		},
		{
			id: 5,
			name: t('solutions.solution5Name') || 'MSW Processing',
			image: IMAGE_ASSIGNMENTS.solutions.categories.msw,
			description: t('solutions.solution5Description') || 'Comprehensive Municipal Solid Waste (MSW) processing solutions for efficient handling of mixed waste streams.',
			features: [
				t('solutions.solution5Feature1') || 'Mixed waste processing',
				t('solutions.solution5Feature2') || 'High-efficiency material recovery',
				t('solutions.solution5Feature3') || 'Automated sorting technology',
				t('solutions.solution5Feature4') || 'Flexible waste handling',
				t('solutions.solution5Feature5') || 'Quality control systems',
				t('solutions.solution5Feature6') || 'Modular system design',
				t('solutions.solution5Feature7') || 'Environmental compliance',
				t('solutions.solution5Feature8') || 'Odor control integration',
			],
			specifications: {
				[t('solutions.solution5Spec1Key') || 'Processing Capacity']: t('solutions.solution5Spec1Value') || 'Up to 100 tons per hour',
				[t('solutions.solution5Spec2Key') || 'Material Recovery']: t('solutions.solution5Spec2Value') || '80%+ recovery rate',
				[t('solutions.solution5Spec3Key') || 'Waste Streams']: t('solutions.solution5Spec3Value') || 'Mixed municipal waste',
				[t('solutions.solution5Spec4Key') || 'Processing Efficiency']: t('solutions.solution5Spec4Value') || '85%+ efficiency rate',
				[t('solutions.solution5Spec5Key') || 'Technology']: t('solutions.solution5Spec5Value') || 'Advanced MSW processing',
				[t('solutions.solution5Spec6Key') || 'Maintenance']: t('solutions.solution5Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution5App1') || 'Municipal waste facilities',
				t('solutions.solution5App2') || 'Transfer stations',
				t('solutions.solution5App3') || 'Regional processing centers',
				t('solutions.solution5App4') || 'Commercial waste processing',
				t('solutions.solution5App5') || 'Industrial waste management',
			],
			benefits: [
				t('solutions.solution5Benefit1') || 'High material recovery',
				t('solutions.solution5Benefit2') || 'Reduced landfill waste',
				t('solutions.solution5Benefit3') || 'Environmental compliance',
				t('solutions.solution5Benefit4') || 'Cost-effective processing',
				t('solutions.solution5Benefit5') || 'Flexible waste handling',
			]
		},
		{
			id: 6,
			name: t('solutions.solution6Name') || 'Commercial Waste',
			image: IMAGE_ASSIGNMENTS.solutions.categories.commercial,
			description: t('solutions.solution6Description') || 'Comprehensive commercial waste processing solutions for businesses, offices, and commercial facilities.',
			features: [
				t('solutions.solution6Feature1') || 'Mixed commercial waste processing',
				t('solutions.solution6Feature2') || 'High-efficiency material recovery',
				t('solutions.solution6Feature3') || 'Automated sorting technology',
				t('solutions.solution6Feature4') || 'Flexible waste stream handling',
				t('solutions.solution6Feature5') || 'Odor control systems',
				t('solutions.solution6Feature6') || 'Quality control monitoring',
				t('solutions.solution6Feature7') || 'Modular processing systems',
				t('solutions.solution6Feature8') || 'Environmental compliance',
			],
			specifications: {
				[t('solutions.solution6Spec1Key') || 'Processing Capacity']: t('solutions.solution6Spec1Value') || 'Up to 50 tons per hour',
				[t('solutions.solution6Spec2Key') || 'Material Recovery']: t('solutions.solution6Spec2Value') || '85%+ recovery rate',
				[t('solutions.solution6Spec3Key') || 'Waste Streams']: t('solutions.solution6Spec3Value') || 'Mixed commercial waste',
				[t('solutions.solution6Spec4Key') || 'Processing Efficiency']: t('solutions.solution6Spec4Value') || '90%+ efficiency rate',
				[t('solutions.solution6Spec5Key') || 'Technology']: t('solutions.solution6Spec5Value') || 'Advanced sorting systems',
				[t('solutions.solution6Spec6Key') || 'Maintenance']: t('solutions.solution6Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution6App1') || 'Office buildings',
				t('solutions.solution6App2') || 'Shopping centers',
				t('solutions.solution6App3') || 'Restaurants and cafes',
				t('solutions.solution6App4') || 'Hotels and hospitality',
				t('solutions.solution6App5') || 'Retail stores',
			],
			benefits: [
				t('solutions.solution6Benefit1') || 'High material recovery',
				t('solutions.solution6Benefit2') || 'Flexible waste handling',
				t('solutions.solution6Benefit3') || 'Environmental compliance',
				t('solutions.solution6Benefit4') || 'Cost-effective processing',
				t('solutions.solution6Benefit5') || 'Odor control',
			]
		},
		{
			id: 7,
			name: t('solutions.solution7Name') || 'C&D Recycling',
			image: IMAGE_ASSIGNMENTS.solutions.categories.cd,
			description: t('solutions.solution7Description') || 'Specialized Construction and Demolition (C&D) waste recycling solutions for construction sites, demolition projects, and renovation activities.',
			features: [
				t('solutions.solution7Feature1') || 'C&D waste processing systems',
				t('solutions.solution7Feature2') || 'High-efficiency material recovery',
				t('solutions.solution7Feature3') || 'Heavy-duty processing equipment',
				t('solutions.solution7Feature4') || 'Flexible material handling',
				t('solutions.solution7Feature5') || 'Dust suppression systems',
				t('solutions.solution7Feature6') || 'Quality control monitoring',
				t('solutions.solution7Feature7') || 'Modular processing systems',
				t('solutions.solution7Feature8') || 'Environmental compliance',
			],
			specifications: {
				[t('solutions.solution7Spec1Key') || 'Processing Capacity']: t('solutions.solution7Spec1Value') || 'Up to 100 tons per hour',
				[t('solutions.solution7Spec2Key') || 'Material Recovery']: t('solutions.solution7Spec2Value') || '80%+ recovery rate',
				[t('solutions.solution7Spec3Key') || 'Material Types']: t('solutions.solution7Spec3Value') || 'Concrete, wood, metal, drywall',
				[t('solutions.solution7Spec4Key') || 'Processing Efficiency']: t('solutions.solution7Spec4Value') || '85%+ efficiency rate',
				[t('solutions.solution7Spec5Key') || 'Technology']: t('solutions.solution7Spec5Value') || 'Heavy-duty processing systems',
				[t('solutions.solution7Spec6Key') || 'Maintenance']: t('solutions.solution7Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution7App1') || 'Construction sites',
				t('solutions.solution7App2') || 'Demolition projects',
				t('solutions.solution7App3') || 'Renovation activities',
				t('solutions.solution7App4') || 'Infrastructure projects',
				t('solutions.solution7App5') || 'Commercial construction',
			],
			benefits: [
				t('solutions.solution7Benefit1') || 'High material recovery',
				t('solutions.solution7Benefit2') || 'Heavy-duty processing',
				t('solutions.solution7Benefit3') || 'Dust suppression',
				t('solutions.solution7Benefit4') || 'Environmental compliance',
				t('solutions.solution7Benefit5') || 'Cost-effective processing',
			]
		},
		{
			id: 8,
			name: t('solutions.solution8Name') || 'Multi-MRF™ Systems',
			image: '/Images/mrf-systems.jpg',
			description: t('solutions.solution8Description') || 'Advanced Multi-Material Recovery Facility (MRF) systems for comprehensive waste processing and material recovery.',
			features: [
				t('solutions.solution8Feature1') || 'Multi-material processing capability',
				t('solutions.solution8Feature2') || 'Integrated MRF technology',
				t('solutions.solution8Feature3') || 'High-efficiency material recovery',
				t('solutions.solution8Feature4') || 'Automated sorting systems',
				t('solutions.solution8Feature5') || 'Flexible waste stream handling',
				t('solutions.solution8Feature6') || 'Advanced control systems',
				t('solutions.solution8Feature7') || 'Modular system design',
				t('solutions.solution8Feature8') || 'Environmental compliance',
			],
			specifications: {
				[t('solutions.solution8Spec1Key') || 'Processing Capacity']: t('solutions.solution8Spec1Value') || 'Up to 200 tons per hour',
				[t('solutions.solution8Spec2Key') || 'Material Recovery']: t('solutions.solution8Spec2Value') || '90%+ recovery rate',
				[t('solutions.solution8Spec3Key') || 'Waste Streams']: t('solutions.solution8Spec3Value') || 'Multiple material types',
				[t('solutions.solution8Spec4Key') || 'Processing Efficiency']: t('solutions.solution8Spec4Value') || '95%+ efficiency rate',
				[t('solutions.solution8Spec5Key') || 'Technology']: t('solutions.solution8Spec5Value') || 'Advanced MRF systems',
				[t('solutions.solution8Spec6Key') || 'Maintenance']: t('solutions.solution8Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution8App1') || 'Municipal waste processing',
				t('solutions.solution8App2') || 'Regional recycling centers',
				t('solutions.solution8App3') || 'Large-scale MRF facilities',
				t('solutions.solution8App4') || 'Waste management companies',
				t('solutions.solution8App5') || 'Government facilities',
			],
			benefits: [
				t('solutions.solution8Benefit1') || 'High material recovery',
				t('solutions.solution8Benefit2') || 'Multi-material processing',
				t('solutions.solution8Benefit3') || 'Advanced control systems',
				t('solutions.solution8Benefit4') || 'Environmental compliance',
				t('solutions.solution8Benefit5') || 'Cost-effective processing',
			]
		},
		{
			id: 9,
			name: t('solutions.solution9Name') || 'Waste to Energy Recycling',
			image: '/Images/waste-to-energy.jpg',
			description: t('solutions.solution9Description') || 'Advanced waste-to-energy recycling solutions for converting waste materials into renewable energy.',
			features: [
				t('solutions.solution9Feature1') || 'Waste-to-energy conversion',
				t('solutions.solution9Feature2') || 'High-efficiency energy recovery',
				t('solutions.solution9Feature3') || 'Renewable energy production',
				t('solutions.solution9Feature4') || 'Environmental compliance',
				t('solutions.solution9Feature5') || 'Automated processing systems',
				t('solutions.solution9Feature6') || 'Quality control monitoring',
				t('solutions.solution9Feature7') || 'Modular system design',
				t('solutions.solution9Feature8') || 'Energy optimization',
			],
			specifications: {
				[t('solutions.solution9Spec1Key') || 'Processing Capacity']: t('solutions.solution9Spec1Value') || 'Up to 500 tons per day',
				[t('solutions.solution9Spec2Key') || 'Energy Recovery']: t('solutions.solution9Spec2Value') || '80%+ energy efficiency',
				[t('solutions.solution9Spec3Key') || 'Waste Types']: t('solutions.solution9Spec3Value') || 'Mixed waste streams',
				[t('solutions.solution9Spec4Key') || 'Processing Efficiency']: t('solutions.solution9Spec4Value') || '90%+ efficiency rate',
				[t('solutions.solution9Spec5Key') || 'Technology']: t('solutions.solution9Spec5Value') || 'Advanced WTE systems',
				[t('solutions.solution9Spec6Key') || 'Maintenance']: t('solutions.solution9Spec6Value') || 'Low maintenance requirements',
			},
			applications: [
				t('solutions.solution9App1') || 'Waste-to-energy facilities',
				t('solutions.solution9App2') || 'Municipal waste processing',
				t('solutions.solution9App3') || 'Industrial waste management',
				t('solutions.solution9App4') || 'Regional energy centers',
				t('solutions.solution9App5') || 'Commercial waste processing',
			],
			benefits: [
				t('solutions.solution9Benefit1') || 'Renewable energy production',
				t('solutions.solution9Benefit2') || 'High energy efficiency',
				t('solutions.solution9Benefit3') || 'Environmental compliance',
				t('solutions.solution9Benefit4') || 'Cost-effective processing',
				t('solutions.solution9Benefit5') || 'Reduced landfill waste',
			]
		},
		{
			id: 10,
			name: t('solutions.solution10Name') || 'E-Scrap Recycling',
			image: '/Images/electronics-recycling.jpg',
			description: t('solutions.solution10Description') || 'Complete electronics waste recycling solutions including e-waste processing, material recovery, and environmental compliance.',
			features: [
				t('solutions.solution10Feature1') || 'Complete e-waste processing systems',
				t('solutions.solution10Feature2') || 'Material recovery and separation',
				t('solutions.solution10Feature3') || 'Environmental compliance solutions',
				t('solutions.solution10Feature4') || 'Data destruction services',
				t('solutions.solution10Feature5') || 'Component disassembly',
				t('solutions.solution10Feature6') || 'Precious metal recovery',
				t('solutions.solution10Feature7') || 'Hazardous material handling',
				t('solutions.solution10Feature8') || 'Certified recycling processes',
			],
			specifications: {
				[t('solutions.solution10Spec1Key') || 'Processing Capacity']: t('solutions.solution10Spec1Value') || 'Up to 10 tons per hour',
				[t('solutions.solution10Spec2Key') || 'Material Recovery']: t('solutions.solution10Spec2Value') || '95%+ recovery rate',
				[t('solutions.solution10Spec3Key') || 'Compliance']: t('solutions.solution10Spec3Value') || 'EPA and state regulations',
				[t('solutions.solution10Spec4Key') || 'Certification']: t('solutions.solution10Spec4Value') || 'R2 and e-Stewards certified',
				[t('solutions.solution10Spec5Key') || 'Data Security']: t('solutions.solution10Spec5Value') || 'NAID AAA certified destruction',
				[t('solutions.solution10Spec6Key') || 'Technology']: t('solutions.solution10Spec6Value') || 'Automated disassembly systems',
			},
			applications: [
				t('solutions.solution10App1') || 'Corporate IT equipment',
				t('solutions.solution10App2') || 'Consumer electronics',
				t('solutions.solution10App3') || 'Medical devices',
				t('solutions.solution10App4') || 'Telecommunications equipment',
				t('solutions.solution10App5') || 'Industrial electronics',
			],
			benefits: [
				t('solutions.solution10Benefit1') || 'Environmental compliance',
				t('solutions.solution10Benefit2') || 'Data security assurance',
				t('solutions.solution10Benefit3') || 'Cost-effective disposal',
				t('solutions.solution10Benefit4') || 'Resource recovery',
				t('solutions.solution10Benefit5') || 'Regulatory compliance',
			]
		},
		{
			id: 11,
			name: t('solutions.solution11Name') || 'Glass Cleanup',
			image: '/Images/glass-cleanup.jpg',
			description: t('solutions.solution11Description') || 'Specialized glass cleanup and processing systems for contaminated glass streams.',
			features: [
				t('solutions.solution11Feature1') || 'Contaminated glass processing',
				t('solutions.solution11Feature2') || 'Advanced cleaning technology',
				t('solutions.solution11Feature3') || 'Market-ready glass production',
				t('solutions.solution11Feature4') || 'Contamination removal systems',
				t('solutions.solution11Feature5') || 'Quality control monitoring',
				t('solutions.solution11Feature6') || 'Automated processing',
				t('solutions.solution11Feature7') || 'Energy efficient operation',
				t('solutions.solution11Feature8') || 'Modular system design',
			],
			specifications: {
				[t('solutions.solution11Spec1Key') || 'Processing Capacity']: t('solutions.solution11Spec1Value') || 'Up to 25 tons per hour',
				[t('solutions.solution11Spec2Key') || 'Glass Purity']: t('solutions.solution11Spec2Value') || '99%+ contamination removal',
				[t('solutions.solution11Spec3Key') || 'Processing Efficiency']: t('solutions.solution11Spec3Value') || '95%+ glass recovery',
				[t('solutions.solution11Spec4Key') || 'Contamination Removal']: t('solutions.solution11Spec4Value') || 'Advanced cleaning technology',
				[t('solutions.solution11Spec5Key') || 'Glass Types']: t('solutions.solution11Spec5Value') || 'Mixed glass streams',
				[t('solutions.solution11Spec6Key') || 'Power Consumption']: t('solutions.solution11Spec6Value') || 'Energy efficient design',
			},
			applications: [
				t('solutions.solution11App1') || 'Glass recycling facilities',
				t('solutions.solution11App2') || 'Material recovery facilities (MRF)',
				t('solutions.solution11App3') || 'Single stream recycling',
				t('solutions.solution11App4') || 'Mixed waste processing',
				t('solutions.solution11App5') || 'Commercial recycling centers',
			],
			benefits: [
				t('solutions.solution11Benefit1') || 'High glass purity',
				t('solutions.solution11Benefit2') || 'Contamination removal',
				t('solutions.solution11Benefit3') || 'Market-ready output',
				t('solutions.solution11Benefit4') || 'Energy efficient',
				t('solutions.solution11Benefit5') || 'Cost-effective processing',
			]
		},
		{
			id: 12,
			name: t('solutions.solution12Name') || 'Composting',
			image: '/Images/composting.jpg',
			description: t('solutions.solution12Description') || 'Advanced composting solutions using densimetric table technology for efficient organic material processing and compost production.',
			features: [
				t('solutions.solution12Feature1') || 'Densimetric table technology',
				t('solutions.solution12Feature2') || 'Organic material processing',
				t('solutions.solution12Feature3') || 'High-quality compost production',
				t('solutions.solution12Feature4') || 'Automated processing systems',
				t('solutions.solution12Feature5') || 'Odor control integration',
				t('solutions.solution12Feature6') || 'Pathogen reduction',
				t('solutions.solution12Feature7') || 'Nutrient optimization',
				t('solutions.solution12Feature8') || 'Quality control monitoring',
			],
			specifications: {
				[t('solutions.solution12Spec1Key') || 'Processing Capacity']: t('solutions.solution12Spec1Value') || 'Up to 30 tons per day',
				[t('solutions.solution12Spec2Key') || 'Compost Quality']: t('solutions.solution12Spec2Value') || 'High-grade compost output',
				[t('solutions.solution12Spec3Key') || 'Pathogen Reduction']: t('solutions.solution12Spec3Value') || '99.9%+ elimination',
				[t('solutions.solution12Spec4Key') || 'Odor Control']: t('solutions.solution12Spec4Value') || 'Integrated odor management',
				[t('solutions.solution12Spec5Key') || 'Processing Time']: t('solutions.solution12Spec5Value') || '14-21 day cycle',
				[t('solutions.solution12Spec6Key') || 'Nutrient Recovery']: t('solutions.solution12Spec6Value') || 'Optimal nutrient retention',
			},
			applications: [
				t('solutions.solution12App1') || 'Municipal composting facilities',
				t('solutions.solution12App2') || 'Food waste processing',
				t('solutions.solution12App3') || 'Yard waste management',
				t('solutions.solution12App4') || 'Agricultural waste processing',
				t('solutions.solution12App5') || 'Restaurant waste management',
			],
			benefits: [
				t('solutions.solution12Benefit1') || 'High-quality compost',
				t('solutions.solution12Benefit2') || 'Pathogen reduction',
				t('solutions.solution12Benefit3') || 'Odor control',
				t('solutions.solution12Benefit4') || 'Nutrient optimization',
				t('solutions.solution12Benefit5') || 'Environmental compliance',
			]
		},
		{
			id: 13,
			name: t('solutions.solution13Name') || 'Bollegraaf Balers',
			image: '/Images/bollegraaf-new-1.jpg',
			description: t('solutions.solution13Description') || 'Industry-leading Bollegraaf balers with proven performance in recycling operations.',
			features: [
				t('solutions.solution13Feature1') || 'Single ram design uses 1/3 power of two-ram balers',
				t('solutions.solution13Feature2') || 'Operates automatically without dedicated operator',
				t('solutions.solution13Feature3') || 'Instant material switching capability',
				t('solutions.solution13Feature4') || 'Denser, uniform bales with pre-press flap',
				t('solutions.solution13Feature5') || 'Production speeds over 35 tph',
				t('solutions.solution13Feature6') || '50% reduction in electricity costs',
				t('solutions.solution13Feature7') || 'Low maintenance robust design',
				t('solutions.solution13Feature8') || 'No-shear compression technology',
			],
			specifications: {
				[t('solutions.solution13Spec1Key') || 'Production Speed']: t('solutions.solution13Spec1Value') || 'Over 35 tons per hour',
				[t('solutions.solution13Spec2Key') || 'Power Efficiency']: t('solutions.solution13Spec2Value') || '50% reduction vs two-ram balers',
				[t('solutions.solution13Spec3Key') || 'Bale Density']: t('solutions.solution13Spec3Value') || 'Superior compression with pre-press flap',
				[t('solutions.solution13Spec4Key') || 'Operation']: t('solutions.solution13Spec4Value') || 'Fully automated',
				[t('solutions.solution13Spec5Key') || 'Maintenance']: t('solutions.solution13Spec5Value') || 'Low maintenance robust design',
				[t('solutions.solution13Spec6Key') || 'Material Switching']: t('solutions.solution13Spec6Value') || 'Instant capability',
			},
			applications: [
				t('solutions.solution13App1') || 'Material recovery facilities (MRF)',
				t('solutions.solution13App2') || 'Single stream recycling',
				t('solutions.solution13App3') || 'Cardboard processing',
				t('solutions.solution13App4') || 'Plastic container baling',
				t('solutions.solution13App5') || 'Steel container processing',
			],
			benefits: [
				t('solutions.solution13Benefit1') || 'High production speed',
				t('solutions.solution13Benefit2') || 'Power efficiency',
				t('solutions.solution13Benefit3') || 'Automated operation',
				t('solutions.solution13Benefit4') || 'Low maintenance',
				t('solutions.solution13Benefit5') || 'Flexible material handling',
			]
		},
		{
			id: 14,
			name: t('solutions.solution14Name') || 'AI-Based Waste Analytics',
			image: '/Images/greyparrot-ai-new.jpg',
			description: t('solutions.solution14Description') || 'Advanced AI-powered waste analytics and material recognition technology for comprehensive waste analysis and optimization.',
			features: [
				t('solutions.solution14Feature1') || 'AI-powered material recognition',
				t('solutions.solution14Feature2') || 'Real-time waste analytics',
				t('solutions.solution14Feature3') || 'Advanced computer vision',
				t('solutions.solution14Feature4') || 'Automated material identification',
				t('solutions.solution14Feature5') || 'Performance optimization insights',
				t('solutions.solution14Feature6') || 'Data-driven decision making',
				t('solutions.solution14Feature7') || 'Cloud-based analytics platform',
				t('solutions.solution14Feature8') || 'Predictive analytics capabilities',
			],
			specifications: {
				[t('solutions.solution14Spec1Key') || 'Recognition Accuracy']: t('solutions.solution14Spec1Value') || '99%+ material identification',
				[t('solutions.solution14Spec2Key') || 'Processing Speed']: t('solutions.solution14Spec2Value') || 'Real-time analysis',
				[t('solutions.solution14Spec3Key') || 'AI Technology']: t('solutions.solution14Spec3Value') || 'Advanced computer vision',
				[t('solutions.solution14Spec4Key') || 'Data Analytics']: t('solutions.solution14Spec4Value') || 'Cloud-based platform',
				[t('solutions.solution14Spec5Key') || 'Integration']: t('solutions.solution14Spec5Value') || 'Easy system integration',
				[t('solutions.solution14Spec6Key') || 'Scalability']: t('solutions.solution14Spec6Value') || 'Scalable AI technology',
			},
			applications: [
				t('solutions.solution14App1') || 'Material recovery facilities (MRF)',
				t('solutions.solution14App2') || 'Waste processing optimization',
				t('solutions.solution14App3') || 'Quality control systems',
				t('solutions.solution14App4') || 'Performance monitoring',
				t('solutions.solution14App5') || 'Data analytics platforms',
			],
			benefits: [
				t('solutions.solution14Benefit1') || 'High accuracy recognition',
				t('solutions.solution14Benefit2') || 'Real-time analytics',
				t('solutions.solution14Benefit3') || 'Predictive insights',
				t('solutions.solution14Benefit4') || 'Data-driven decisions',
				t('solutions.solution14Benefit5') || 'Performance optimization',
			]
		},
		{
			id: 15,
			name: t('solutions.solution15Name') || 'Odor Control',
			image: '/Images/centriair-new-1.jpg',
			description: t('solutions.solution15Description') || 'Advanced odor control solutions for waste processing facilities. Centriair technology effectively eliminates odors.',
			features: [
				t('solutions.solution15Feature1') || 'Advanced odor elimination technology',
				t('solutions.solution15Feature2') || 'Multi-stage filtration system',
				t('solutions.solution15Feature3') || 'High-efficiency odor removal',
				t('solutions.solution15Feature4') || 'Automated operation',
				t('solutions.solution15Feature5') || 'Low maintenance requirements',
				t('solutions.solution15Feature6') || 'Energy efficient design',
				t('solutions.solution15Feature7') || 'Modular system configuration',
				t('solutions.solution15Feature8') || 'Environmental compliance',
			],
			specifications: {
				[t('solutions.solution15Spec1Key') || 'Air Flow Capacity']: t('solutions.solution15Spec1Value') || 'Up to 50,000 CFM',
				[t('solutions.solution15Spec2Key') || 'Odor Removal Efficiency']: t('solutions.solution15Spec2Value') || '99.9%+ elimination',
				[t('solutions.solution15Spec3Key') || 'Filtration Stages']: t('solutions.solution15Spec3Value') || 'Multi-stage system',
				[t('solutions.solution15Spec4Key') || 'Power Consumption']: t('solutions.solution15Spec4Value') || 'Energy efficient design',
				[t('solutions.solution15Spec5Key') || 'Maintenance']: t('solutions.solution15Spec5Value') || 'Low maintenance requirements',
				[t('solutions.solution15Spec6Key') || 'Construction']: t('solutions.solution15Spec6Value') || 'Modular design',
			},
			applications: [
				t('solutions.solution15App1') || 'Material recovery facilities (MRF)',
				t('solutions.solution15App2') || 'Composting facilities',
				t('solutions.solution15App3') || 'Food waste processing',
				t('solutions.solution15App4') || 'Municipal waste processing',
				t('solutions.solution15App5') || 'Industrial waste management',
			],
			benefits: [
				t('solutions.solution15Benefit1') || 'High odor elimination',
				t('solutions.solution15Benefit2') || 'Energy efficient',
				t('solutions.solution15Benefit3') || 'Low maintenance',
				t('solutions.solution15Benefit4') || 'Environmental compliance',
				t('solutions.solution15Benefit5') || 'Modular design',
			]
		},
		{
			id: 16,
			name: t('solutions.solution16Name') || 'EV Battery Recycling',
			image: '/Images/battery-recycling.jpg',
			description: t('solutions.solution16Description') || 'Advanced battery recycling solutions for lithium-ion, lead-acid, and other battery types.',
			features: [
				t('solutions.solution16Feature1') || 'Lithium-ion battery processing',
				t('solutions.solution16Feature2') || 'Lead-acid battery recycling',
				t('solutions.solution16Feature3') || 'Safe handling protocols',
				t('solutions.solution16Feature4') || 'Material recovery systems',
				t('solutions.solution16Feature5') || 'Environmental compliance',
				t('solutions.solution16Feature6') || 'Automated sorting technology',
				t('solutions.solution16Feature7') || 'Hazardous material management',
				t('solutions.solution16Feature8') || 'Resource optimization',
			],
			specifications: {
				[t('solutions.solution16Spec1Key') || 'Battery Types']: t('solutions.solution16Spec1Value') || 'Li-ion, Lead-acid, NiMH, NiCd',
				[t('solutions.solution16Spec2Key') || 'Processing Capacity']: t('solutions.solution16Spec2Value') || 'Up to 5 tons per hour',
				[t('solutions.solution16Spec3Key') || 'Recovery Rate']: t('solutions.solution16Spec3Value') || '90%+ material recovery',
				[t('solutions.solution16Spec4Key') || 'Safety']: t('solutions.solution16Spec4Value') || 'DOT and EPA compliant',
				[t('solutions.solution16Spec5Key') || 'Technology']: t('solutions.solution16Spec5Value') || 'Automated sorting and processing',
				[t('solutions.solution16Spec6Key') || 'Certification']: t('solutions.solution16Spec6Value') || 'ISO 14001 certified',
			},
			applications: [
				t('solutions.solution16App1') || 'Electric vehicle batteries',
				t('solutions.solution16App2') || 'Consumer electronics batteries',
				t('solutions.solution16App3') || 'Industrial battery systems',
				t('solutions.solution16App4') || 'Energy storage systems',
				t('solutions.solution16App5') || 'Portable device batteries',
			],
			benefits: [
				t('solutions.solution16Benefit1') || 'Safe battery processing',
				t('solutions.solution16Benefit2') || 'High material recovery',
				t('solutions.solution16Benefit3') || 'Environmental compliance',
				t('solutions.solution16Benefit4') || 'Automated processing',
				t('solutions.solution16Benefit5') || 'Resource optimization',
			]
		},
	];

	const handleLearnMore = (solution: Solution) => {
		// Map solution IDs to their individual page routes (using IDs instead of names for translation independence)
		const solutionRoutes: { [key: number]: string } = {
			1: '/solutions/single-stream-recycling',
			2: '/solutions/plastics-recycling',
			3: '/solutions/organics-processing',
			4: '/solutions/food-waste-depackaging',
			5: '/solutions/msw-processing',
			6: '/solutions/commercial-waste',
			7: '/solutions/cd-recycling',
			8: '/solutions/multi-mrf-systems',
			9: '/solutions/waste-to-energy',
			10: '/solutions/electronics-waste-recycling',
			11: '/solutions/glass-cleanup',
			12: '/solutions/composting-densimetric-tables',
			13: '/solutions/bollegraaf-balers',
			14: '/solutions/ai-waste-analysis',
			15: '/solutions/centriair-odor-control',
			16: '/solutions/battery-recycling-systems'
		};

		const route = solution.id ? solutionRoutes[solution.id] : null;
		if (route) {
			navigate(route);
		} else {
			setSelectedSolution(solution);
			setShowSolutionModal(true);
		}
	};

	const fadeInUp = animationConfig.fadeInUp;
	const staggerChildren = animationConfig.staggerContainer;

	return (
		<div className="min-h-screen bg-gray-50">
		{/* Hero Section with Background Image */}
		<section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
			<div className="absolute inset-0">
				<img
					src={IMAGE_ASSIGNMENTS.solutions.hero}
					alt="Recycling solutions hero"
					className="w-full h-full object-cover object-center scale-105"
					loading="eager"
					fetchPriority="high"
					onError={(e) => {
						e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.heroFallback;
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vd-blue-dark/60" />
			</div>
			<div className="container mx-auto px-4 relative z-10 pt-20">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<motion.div
						initial={fadeInUp.initial}
						animate={fadeInUp.animate}
						transition={fadeInUp.transition}
						className="max-w-3xl w-full"
					>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
							{t('common.recyclingSolutions')}
						</h1>
						<p className="text-xl text-blue-100 mb-8 leading-relaxed">
							{t('common.recyclingSolutionsDesc')}
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/equipment"
								className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center"
							>
								{t('common.exploreEquipment')}
								<ArrowRight className="w-5 h-5 ml-2" />
							</Link>
							<button
								onClick={() => setShowQuoteForm(true)}
								className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center"
							>
								<Quote className="w-5 h-5 mr-2" />
								{t('common.getQuote')}
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>

			{/* Solutions Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						variants={staggerChildren}
						initial="initial"
						animate="animate"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
					>
						{solutionItems.map((solution) => (
							<motion.div
								key={solution.id}
								variants={fadeInUp}
								whileHover={{ 
									scale: 1.03,
									y: -8,
									transition: { duration: 0.3, ease: "easeOut" }
								}}
								whileTap={{ scale: 0.98 }}
								onClick={() => handleLearnMore(solution)}
								className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
							>
									<div className="relative h-48 overflow-hidden">
									<img
										src={solution.image}
										alt={solution.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
								</div>
								
								<div className="p-6">
									<h3 className="text-xl font-bold text-vd-blue-dark mb-3">{solution.name}</h3>
									<p className="text-gray-600 mb-4 line-clamp-3">{solution.description}</p>
									
									<div className="flex flex-wrap gap-2 mb-4">
										{solution.features?.slice(0, 3).map((feature, idx) => (
											<span
												key={idx}
												className="px-2 py-1 bg-vd-blue/10 text-vd-blue text-xs rounded-full"
											>
												{feature}
											</span>
										))}
									</div>
									
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleLearnMore(solution);
										}}
										className="w-full bg-vd-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-vd-blue-dark transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
									>
										{t('common.learnMore')}
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</button>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Quote Form Modal */}
			<AnimatePresence>
				{showQuoteForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
						>
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-2xl font-bold text-vd-blue-dark">{t('common.getAQuote')}</h2>
									<button
										onClick={() => setShowQuoteForm(false)}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors"
									>
										<X className="w-6 h-6" />
									</button>
								</div>
								<QuoteForm />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Solution Modal */}
			<AnimatePresence>
				{showSolutionModal && selectedSolution && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
						>
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-2xl font-bold text-vd-blue-dark">{selectedSolution.name}</h2>
									<button
										onClick={() => setShowSolutionModal(false)}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors"
									>
										<X className="w-6 h-6" />
									</button>
								</div>
								
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
									<div>
										<img
											src={selectedSolution.image}
											alt={selectedSolution.name}
											className="w-full h-64 object-cover rounded-lg mb-6"
										/>
										<p className="text-gray-700 mb-6">{selectedSolution.description}</p>
									</div>
									
									<div className="space-y-6">
										{selectedSolution.features && (
											<div>
												<h3 className="text-lg font-semibold text-vd-blue-dark mb-3">{t('common.keyFeatures')}</h3>
												<ul className="space-y-2">
													{selectedSolution.features.map((feature, index) => (
														<li key={index} className="flex items-start gap-2">
															<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
															<span className="text-gray-700">{feature}</span>
														</li>
													))}
												</ul>
											</div>
										)}
										
										{selectedSolution.specifications && (
											<div>
												<h3 className="text-lg font-semibold text-vd-blue-dark mb-3">{t('common.specifications')}</h3>
												<div className="space-y-2">
													{Object.entries(selectedSolution.specifications).map(([key, value]) => (
														<div key={key} className="flex justify-between">
															<span className="font-medium text-gray-700">{key}:</span>
															<span className="text-gray-600">{value}</span>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
								
								<div className="mt-8 flex gap-4">
									<button
										onClick={() => setShowQuoteForm(true)}
										className="bg-vd-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-vd-blue-dark transition-colors duration-300 flex items-center gap-2"
									>
										<Quote className="w-5 h-5" />
										{t('common.getAQuote')}
									</button>
									<Link
										to="/contact"
										className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
									>
										{t('common.contactUs')}
									</Link>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Solutions;