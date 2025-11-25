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

// Comprehensive solutions from original website
const solutionItems = [
	{
		id: 1,
		name: 'Single Stream Recycling',
		image: IMAGE_ASSIGNMENTS.solutions.categories.singleStream,
		description: 'Complete single stream recycling solutions for efficient processing of mixed recyclable materials. Our systems maximize recovery rates while minimizing contamination.',
		features: [
			'Mixed recyclable processing',
			'High-efficiency material recovery',
			'Automated sorting technology',
			'Contamination reduction',
			'Quality control systems',
			'Flexible material handling',
			'Modular system design',
			'Environmental compliance'
		],
		specifications: {
			'Processing Capacity': 'Up to 50 tons per hour',
			'Material Recovery': '90%+ recovery rate',
			'Contamination Level': '<5% contamination',
			'Processing Efficiency': '95%+ efficiency rate',
			'Technology': 'Advanced sorting systems',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Municipal recycling programs',
			'Material recovery facilities',
			'Commercial recycling centers',
			'Residential waste management',
			'Industrial recycling operations'
		],
		benefits: [
			'Increased recovery rates',
			'Reduced contamination',
			'Lower processing costs',
			'Environmental compliance',
			'Improved material quality'
		]
	},
	{
		id: 2,
		name: 'Plastics Recycling',
		image: IMAGE_ASSIGNMENTS.solutions.categories.plastics,
		description: 'Advanced plastics recycling solutions for efficient processing and recovery of various plastic materials. Our systems maximize plastic recovery while maintaining material quality.',
		features: [
			'Multi-plastic processing',
			'High-efficiency plastic recovery',
			'Automated sorting technology',
			'Quality control systems',
			'Flexible plastic handling',
			'Modular system design',
			'Environmental compliance',
			'Material purity optimization'
		],
		specifications: {
			'Processing Capacity': 'Up to 30 tons per hour',
			'Plastic Recovery': '85%+ recovery rate',
			'Material Purity': '95%+ purity',
			'Processing Efficiency': '90%+ efficiency rate',
			'Technology': 'Advanced plastic sorting',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Plastic manufacturing facilities',
			'Material recovery facilities',
			'Commercial recycling centers',
			'Industrial plastic processing',
			'Municipal recycling programs'
		],
		benefits: [
			'High plastic recovery rates',
			'Improved material quality',
			'Reduced environmental impact',
			'Cost-effective processing',
			'Regulatory compliance'
		]
	},
	{
		id: 3,
		name: 'Organics Processing',
		image: IMAGE_ASSIGNMENTS.solutions.categories.organics,
		description: 'Comprehensive organics processing solutions for efficient handling of organic waste materials. Our systems maximize organic recovery and produce high-quality compost.',
		features: [
			'Organic waste processing',
			'High-efficiency organic recovery',
			'Compost production systems',
			'Odor control integration',
			'Quality control monitoring',
			'Modular system design',
			'Environmental compliance',
			'Pathogen reduction'
		],
		specifications: {
			'Processing Capacity': 'Up to 40 tons per day',
			'Organic Recovery': '90%+ recovery rate',
			'Compost Quality': 'High-grade output',
			'Processing Efficiency': '85%+ efficiency rate',
			'Technology': 'Advanced organic processing',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Composting facilities',
			'Food waste processing',
			'Agricultural waste management',
			'Municipal organics programs',
			'Commercial food waste'
		],
		benefits: [
			'High organic recovery',
			'Quality compost production',
			'Odor control',
			'Environmental compliance',
			'Cost-effective processing'
		]
	},
	{
		id: 4,
		name: 'Food Waste Depackaging',
		image: IMAGE_ASSIGNMENTS.solutions.categories.foodWaste,
		description: 'Advanced food waste depackaging solutions for efficient separation of organic materials from packaging. Our systems maximize organic recovery while minimizing contamination.',
		features: [
			'Advanced depackaging technology',
			'High-efficiency organic separation',
			'Minimal contamination output',
			'Automated processing systems',
			'Flexible packaging handling',
			'Odor control integration',
			'Quality control monitoring',
			'Modular system design'
		],
		specifications: {
			'Processing Capacity': 'Up to 20 tons per hour',
			'Organic Recovery': '95%+ organic material recovery',
			'Contamination Level': '<5% contamination',
			'Packaging Types': 'Plastic, cardboard, metal containers',
			'Processing Efficiency': '90%+ efficiency rate',
			'Technology': 'Advanced depackaging systems'
		},
		applications: [
			'Food processing facilities',
			'Restaurant waste management',
			'Grocery store waste processing',
			'Commercial kitchens',
			'Food manufacturing plants'
		],
		benefits: [
			'High organic recovery',
			'Low contamination',
			'Flexible packaging handling',
			'Odor control',
			'Cost-effective processing'
		]
	},
	{
		id: 5,
		name: 'MSW Processing',
		image: IMAGE_ASSIGNMENTS.solutions.categories.msw,
		description: 'Comprehensive Municipal Solid Waste (MSW) processing solutions for efficient handling of mixed waste streams. Our systems maximize material recovery and minimize environmental impact.',
		features: [
			'Mixed waste processing',
			'High-efficiency material recovery',
			'Automated sorting technology',
			'Flexible waste handling',
			'Quality control systems',
			'Modular system design',
			'Environmental compliance',
			'Odor control integration'
		],
		specifications: {
			'Processing Capacity': 'Up to 100 tons per hour',
			'Material Recovery': '80%+ recovery rate',
			'Waste Streams': 'Mixed municipal waste',
			'Processing Efficiency': '85%+ efficiency rate',
			'Technology': 'Advanced MSW processing',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Municipal waste facilities',
			'Transfer stations',
			'Regional processing centers',
			'Commercial waste processing',
			'Industrial waste management'
		],
		benefits: [
			'High material recovery',
			'Reduced landfill waste',
			'Environmental compliance',
			'Cost-effective processing',
			'Flexible waste handling'
		]
	},
	{
		id: 6,
		name: 'Commercial Waste',
		image: IMAGE_ASSIGNMENTS.solutions.categories.commercial,
		description: 'Comprehensive commercial waste processing solutions for businesses, offices, and commercial facilities. Our systems efficiently handle mixed commercial waste streams.',
		features: [
			'Mixed commercial waste processing',
			'High-efficiency material recovery',
			'Automated sorting technology',
			'Flexible waste stream handling',
			'Odor control systems',
			'Quality control monitoring',
			'Modular processing systems',
			'Environmental compliance'
		],
		specifications: {
			'Processing Capacity': 'Up to 50 tons per hour',
			'Material Recovery': '85%+ recovery rate',
			'Waste Streams': 'Mixed commercial waste',
			'Processing Efficiency': '90%+ efficiency rate',
			'Technology': 'Advanced sorting systems',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Office buildings',
			'Shopping centers',
			'Restaurants and cafes',
			'Hotels and hospitality',
			'Retail stores'
		],
		benefits: [
			'High material recovery',
			'Flexible waste handling',
			'Environmental compliance',
			'Cost-effective processing',
			'Odor control'
		]
	},
	{
		id: 7,
		name: 'C&D Recycling',
		image: IMAGE_ASSIGNMENTS.solutions.categories.cd,
		description: 'Specialized Construction and Demolition (C&D) waste recycling solutions for construction sites, demolition projects, and renovation activities.',
		features: [
			'C&D waste processing systems',
			'High-efficiency material recovery',
			'Heavy-duty processing equipment',
			'Flexible material handling',
			'Dust suppression systems',
			'Quality control monitoring',
			'Modular processing systems',
			'Environmental compliance'
		],
		specifications: {
			'Processing Capacity': 'Up to 100 tons per hour',
			'Material Recovery': '80%+ recovery rate',
			'Material Types': 'Concrete, wood, metal, drywall',
			'Processing Efficiency': '85%+ efficiency rate',
			'Technology': 'Heavy-duty processing systems',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Construction sites',
			'Demolition projects',
			'Renovation activities',
			'Infrastructure projects',
			'Commercial construction'
		],
		benefits: [
			'High material recovery',
			'Heavy-duty processing',
			'Dust suppression',
			'Environmental compliance',
			'Cost-effective processing'
		]
	},
	{
		id: 8,
		name: 'Multi-MRF™ Systems',
		image: '/Images/mrf-systems.jpg',
		description: 'Advanced Multi-Material Recovery Facility (MRF) systems for comprehensive waste processing and material recovery. Our Multi-MRF™ technology provides integrated solutions.',
		features: [
			'Multi-material processing capability',
			'Integrated MRF technology',
			'High-efficiency material recovery',
			'Automated sorting systems',
			'Flexible waste stream handling',
			'Advanced control systems',
			'Modular system design',
			'Environmental compliance'
		],
		specifications: {
			'Processing Capacity': 'Up to 200 tons per hour',
			'Material Recovery': '90%+ recovery rate',
			'Waste Streams': 'Multiple material types',
			'Processing Efficiency': '95%+ efficiency rate',
			'Technology': 'Advanced MRF systems',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Municipal waste processing',
			'Regional recycling centers',
			'Large-scale MRF facilities',
			'Waste management companies',
			'Government facilities'
		],
		benefits: [
			'High material recovery',
			'Multi-material processing',
			'Advanced control systems',
			'Environmental compliance',
			'Cost-effective processing'
		]
	},
	{
		id: 9,
		name: 'Waste to Energy Recycling',
		image: '/Images/waste-to-energy.jpg',
		description: 'Advanced waste-to-energy recycling solutions for converting waste materials into renewable energy. Our systems maximize energy recovery while minimizing environmental impact.',
		features: [
			'Waste-to-energy conversion',
			'High-efficiency energy recovery',
			'Renewable energy production',
			'Environmental compliance',
			'Automated processing systems',
			'Quality control monitoring',
			'Modular system design',
			'Energy optimization'
		],
		specifications: {
			'Processing Capacity': 'Up to 500 tons per day',
			'Energy Recovery': '80%+ energy efficiency',
			'Waste Types': 'Mixed waste streams',
			'Processing Efficiency': '90%+ efficiency rate',
			'Technology': 'Advanced WTE systems',
			'Maintenance': 'Low maintenance requirements'
		},
		applications: [
			'Waste-to-energy facilities',
			'Municipal waste processing',
			'Industrial waste management',
			'Regional energy centers',
			'Commercial waste processing'
		],
		benefits: [
			'Renewable energy production',
			'High energy efficiency',
			'Environmental compliance',
			'Cost-effective processing',
			'Reduced landfill waste'
		]
	},
	{
		id: 10,
		name: 'E-Scrap Recycling',
		image: '/Images/electronics-recycling.jpg',
		description: 'Complete electronics waste recycling solutions including e-waste processing, material recovery, and environmental compliance. Specialized equipment for handling computers, phones, and electronic components.',
		features: [
			'Complete e-waste processing systems',
			'Material recovery and separation',
			'Environmental compliance solutions',
			'Data destruction services',
			'Component disassembly',
			'Precious metal recovery',
			'Hazardous material handling',
			'Certified recycling processes'
		],
		specifications: {
			'Processing Capacity': 'Up to 10 tons per hour',
			'Material Recovery': '95%+ recovery rate',
			'Compliance': 'EPA and state regulations',
			'Certification': 'R2 and e-Stewards certified',
			'Data Security': 'NAID AAA certified destruction',
			'Technology': 'Automated disassembly systems'
		},
		applications: [
			'Corporate IT equipment',
			'Consumer electronics',
			'Medical devices',
			'Telecommunications equipment',
			'Industrial electronics'
		],
		benefits: [
			'Environmental compliance',
			'Data security assurance',
			'Cost-effective disposal',
			'Resource recovery',
			'Regulatory compliance'
		]
	},
	{
		id: 11,
		name: 'Glass Cleanup',
		image: '/Images/glass-cleanup.jpg',
		description: 'Specialized glass cleanup and processing systems for contaminated glass streams. Our advanced technology purifies glass materials and prepares them for market-ready applications.',
		features: [
			'Contaminated glass processing',
			'Advanced cleaning technology',
			'Market-ready glass production',
			'Contamination removal systems',
			'Quality control monitoring',
			'Automated processing',
			'Energy efficient operation',
			'Modular system design'
		],
		specifications: {
			'Processing Capacity': 'Up to 25 tons per hour',
			'Glass Purity': '99%+ contamination removal',
			'Processing Efficiency': '95%+ glass recovery',
			'Contamination Removal': 'Advanced cleaning technology',
			'Glass Types': 'Mixed glass streams',
			'Power Consumption': 'Energy efficient design'
		},
		applications: [
			'Glass recycling facilities',
			'Material recovery facilities (MRF)',
			'Single stream recycling',
			'Mixed waste processing',
			'Commercial recycling centers'
		],
		benefits: [
			'High glass purity',
			'Contamination removal',
			'Market-ready output',
			'Energy efficient',
			'Cost-effective processing'
		]
	},
	{
		id: 12,
		name: 'Composting',
		image: '/Images/composting.jpg',
		description: 'Advanced composting solutions using densimetric table technology for efficient organic material processing and compost production. Our systems maximize organic recovery and produce high-quality compost.',
		features: [
			'Densimetric table technology',
			'Organic material processing',
			'High-quality compost production',
			'Automated processing systems',
			'Odor control integration',
			'Pathogen reduction',
			'Nutrient optimization',
			'Quality control monitoring'
		],
		specifications: {
			'Processing Capacity': 'Up to 30 tons per day',
			'Compost Quality': 'High-grade compost output',
			'Pathogen Reduction': '99.9%+ elimination',
			'Odor Control': 'Integrated odor management',
			'Processing Time': '14-21 day cycle',
			'Nutrient Recovery': 'Optimal nutrient retention'
		},
		applications: [
			'Municipal composting facilities',
			'Food waste processing',
			'Yard waste management',
			'Agricultural waste processing',
			'Restaurant waste management'
		],
		benefits: [
			'High-quality compost',
			'Pathogen reduction',
			'Odor control',
			'Nutrient optimization',
			'Environmental compliance'
		]
	},
	{
		id: 13,
		name: 'Bollegraaf Balers',
		image: '/Images/bollegraaf-new-1.jpg',
		description: 'Industry-leading Bollegraaf balers with proven performance in recycling operations. Single ram design uses 1/3 power of two-ram balers and operates automatically without dedicated operator.',
		features: [
			'Single ram design uses 1/3 power of two-ram balers',
			'Operates automatically without dedicated operator',
			'Instant material switching capability',
			'Denser, uniform bales with pre-press flap',
			'Production speeds over 35 tph',
			'50% reduction in electricity costs',
			'Low maintenance robust design',
			'No-shear compression technology'
		],
		specifications: {
			'Production Speed': 'Over 35 tons per hour',
			'Power Efficiency': '50% reduction vs two-ram balers',
			'Bale Density': 'Superior compression with pre-press flap',
			'Operation': 'Fully automated',
			'Maintenance': 'Low maintenance robust design',
			'Material Switching': 'Instant capability'
		},
		applications: [
			'Material recovery facilities (MRF)',
			'Single stream recycling',
			'Cardboard processing',
			'Plastic container baling',
			'Steel container processing'
		],
		benefits: [
			'High production speed',
			'Power efficiency',
			'Automated operation',
			'Low maintenance',
			'Flexible material handling'
		]
	},
	{
		id: 14,
		name: 'AI-Based Waste Analytics',
		image: '/Images/greyparrot-ai-new.jpg',
		description: 'Advanced AI-powered waste analytics and material recognition technology for comprehensive waste analysis and optimization. Our AI systems provide real-time insights and data-driven decision making.',
		features: [
			'AI-powered material recognition',
			'Real-time waste analytics',
			'Advanced computer vision',
			'Automated material identification',
			'Performance optimization insights',
			'Data-driven decision making',
			'Cloud-based analytics platform',
			'Predictive analytics capabilities'
		],
		specifications: {
			'Recognition Accuracy': '99%+ material identification',
			'Processing Speed': 'Real-time analysis',
			'AI Technology': 'Advanced computer vision',
			'Data Analytics': 'Cloud-based platform',
			'Integration': 'Easy system integration',
			'Scalability': 'Scalable AI technology'
		},
		applications: [
			'Material recovery facilities (MRF)',
			'Waste processing optimization',
			'Quality control systems',
			'Performance monitoring',
			'Data analytics platforms'
		],
		benefits: [
			'High accuracy recognition',
			'Real-time analytics',
			'Predictive insights',
			'Data-driven decisions',
			'Performance optimization'
		]
	},
	{
		id: 15,
		name: 'Odor Control',
		image: '/Images/centriair-new-1.jpg',
		description: 'Advanced odor control solutions for waste processing facilities. Centriair technology effectively eliminates odors while maintaining operational efficiency and environmental compliance.',
		features: [
			'Advanced odor elimination technology',
			'Multi-stage filtration system',
			'High-efficiency odor removal',
			'Automated operation',
			'Low maintenance requirements',
			'Energy efficient design',
			'Modular system configuration',
			'Environmental compliance'
		],
		specifications: {
			'Air Flow Capacity': 'Up to 50,000 CFM',
			'Odor Removal Efficiency': '99.9%+ elimination',
			'Filtration Stages': 'Multi-stage system',
			'Power Consumption': 'Energy efficient design',
			'Maintenance': 'Low maintenance requirements',
			'Construction': 'Modular design'
		},
		applications: [
			'Material recovery facilities (MRF)',
			'Composting facilities',
			'Food waste processing',
			'Municipal waste processing',
			'Industrial waste management'
		],
		benefits: [
			'High odor elimination',
			'Energy efficient',
			'Low maintenance',
			'Environmental compliance',
			'Modular design'
		]
	},
	{
		id: 16,
		name: 'EV Battery Recycling',
		image: '/Images/battery-recycling.jpg',
		description: 'Advanced battery recycling solutions for lithium-ion, lead-acid, and other battery types. Safe handling and processing of batteries with maximum material recovery.',
		features: [
			'Lithium-ion battery processing',
			'Lead-acid battery recycling',
			'Safe handling protocols',
			'Material recovery systems',
			'Environmental compliance',
			'Automated sorting technology',
			'Hazardous material management',
			'Resource optimization'
		],
		specifications: {
			'Battery Types': 'Li-ion, Lead-acid, NiMH, NiCd',
			'Processing Capacity': 'Up to 5 tons per hour',
			'Recovery Rate': '90%+ material recovery',
			'Safety': 'DOT and EPA compliant',
			'Technology': 'Automated sorting and processing',
			'Certification': 'ISO 14001 certified'
		},
		applications: [
			'Electric vehicle batteries',
			'Consumer electronics batteries',
			'Industrial battery systems',
			'Energy storage systems',
			'Portable device batteries'
		],
		benefits: [
			'Safe battery processing',
			'High material recovery',
			'Environmental compliance',
			'Automated processing',
			'Resource optimization'
		]
	}
];

const Solutions = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
	const [showSolutionModal, setShowSolutionModal] = useState(false);
	const [showQuoteForm, setShowQuoteForm] = useState(false);

	const handleLearnMore = (solution: Solution) => {
		// Map solution names to their individual page routes
		const solutionRoutes: { [key: string]: string } = {
			'Single Stream Recycling': '/solutions/single-stream-recycling',
			'Plastics Recycling': '/solutions/plastics-recycling',
			'Organics Processing': '/solutions/organics-processing',
			'Food Waste Depackaging': '/solutions/food-waste-depackaging',
			'MSW Processing': '/solutions/msw-processing',
			'Commercial Waste': '/solutions/commercial-waste',
			'C&D Recycling': '/solutions/cd-recycling',
			'Multi-MRF™ Systems': '/solutions/multi-mrf-systems',
			'Waste to Energy Recycling': '/solutions/waste-to-energy',
			'E-Scrap Recycling': '/solutions/electronics-waste-recycling',
			'Glass Cleanup': '/solutions/glass-cleanup',
			'Composting': '/solutions/composting-densimetric-tables',
			'Bollegraaf Balers': '/solutions/bollegraaf-balers',
			'AI-Based Waste Analytics': '/solutions/ai-waste-analysis',
			'Odor Control': '/solutions/centriair-odor-control',
			'EV Battery Recycling': '/solutions/battery-recycling-systems'
		};

		const route = solutionRoutes[solution.name];
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