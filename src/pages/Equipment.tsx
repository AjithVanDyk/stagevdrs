import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import { useTranslation } from '../hooks/useTranslation';
import { animationConfig } from '../utils/animations';

interface Equipment {
	id?: number;
	name: string;
	image: string;
	description?: string;
	features?: string[];
	specifications?: { [key: string]: string | undefined };
	applications?: string[];
}

interface EquipmentModalProps {
	equipment: Equipment | null;
	isOpen: boolean;
	onClose: () => void;
	navigate: (path: string) => void;
}

// Comprehensive equipment items from original website
const equipmentItems = [
	{
		id: 1,
		name: 'Bollegraaf Balers',
		image: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg',
		description: 'Industry-leading single ram balers with no-shear design for maximum efficiency and density. Single ram uses 1/3 power of two-ram balers and operates automatically without dedicated operator.',
		features: [
			'Single ram uses 1/3 power of two-ram balers',
			'Operates automatically without dedicated operator',
			'Instant material switching capability',
			'Denser, uniform bales with pre-press flap',
			'Production speeds over 35 tph',
			'50% reduction in electricity costs',
			'Low maintenance robust design',
			'No-shear compression technology',
			'Flexible material processing (fiber, cardboard, plastic, steel, aluminum)',
			'Pre-press flap eliminates shearing'
		],
		specifications: {
			'Production Speed': 'Over 35 tons per hour',
			'Power Efficiency': '50% reduction vs two-ram balers',
			'Bale Density': 'Superior compression with pre-press flap',
			'Operation': 'Fully automated',
			'Maintenance': 'Low maintenance robust design',
			'Material Switching': 'Instant capability',
			'Design': 'Single ram, no-shear',
			'Applications': 'Fiber, cardboard, plastic containers, steel, aluminum',
			'Power Usage': '1/3 of traditional two-ram balers',
			'Technology': 'Pre-press flap compression'
		}
	},
	{
		id: 2,
		name: 'Lubo Screens',
		image: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg',
		description: 'Patented StarScreen® technology with non-wrapping ONP screens, elliptical separators, and high-capacity 880 screens. Lubo USA LLC, founded in 1996, is a sister company of Van Dyk Recycling Solutions and exclusive distributor.',
		features: [
			'Patented StarScreen® technology with various star sizes',
			'Non-wrapping ONP screens resist wrapping for entire shifts',
			'Elliptical Separator with ballistic separation for 2D/3D sorting',
			'880 Screen processing up to 50 tons per hour',
			'95% fines diversion capability',
			'OCC Screen with adjustable star/disk spacing',
			'Specially designed stars prevent loading with film',
			'Large diameter stars with virtually no wrapping'
		],
		specifications: {
			'Processing Capacity': 'Up to 50 tons per hour',
			'Fines Diversion': '95% of materials under 2 inches',
			'Star Diameter': '200-400 mm (large diameter)',
			'Screen Width': '2000-4000 mm (customizable)',
			'Maintenance': 'Minutes to clean, no daily maintenance',
			'Technology': 'Patented StarScreen® non-wrapping',
			'Applications': 'Single stream, C&D, MSW, green waste'
		}
	},
	{
		id: 3,
		name: 'Tomra Optical Sort',
		image: '/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg',
		description: 'Worldwide leader in optical sorting with industry-highest NIR resolution BY FAR and patented FLYING BEAM® illumination. Scanner placement up to 5 feet above conveyors (5x distance of competitors) with 95%+ purity rates maintained over long periods.',
		features: [
			'Industry-highest NIR resolution BY FAR - 5x distance capability',
			'FLYING BEAM® illumination with rotating polygon mirror',
			'SHARP EYE™ ultra-high NIR resolution for difficult materials',
			'DEEP LAISER™ laser sensor for black plastics and glass',
			'GAINnext™ Artificial Intelligence with deep-learning',
			'High-resolution metal detection combined with NIR',
			'Scanner placement up to 5 feet above conveyors',
			'AUTOSORT FLAKE technology for simultaneous detection'
		],
		specifications: {
			'Scanner Height': 'Up to 5 feet above conveyors (5x competition)',
			'NIR Resolution': 'Highest available in optical sorting industry',
			'Purity Rates': '95%+ maintained in dirty MRF environments',
			'Material Recognition': 'PE, PP, PET, HDPE, PS, PVC, black plastics',
			'Performance Proven': '60% increase PET recovery, 15% HDPE',
			'Technology': 'FLYING BEAM® illumination, GAINnext™ AI',
			'Applications': 'Single stream, plastics, mixed waste processing'
		}
	},
	{
		id: 4,
		name: 'Pellenc ST Optical Sorting',
		image: '/Images/Equipment/Pellenc%20optical%20sorters/Product%20image_pellenc.JPG',
		description: 'AI-powered optical sorting with intelligent material recognition and high-speed processing. Advanced algorithms provide superior material identification and separation accuracy.',
		features: [
			'AI-powered material recognition',
			'High-speed processing capabilities',
			'Intelligent sorting algorithms',
			'Superior material identification',
			'Advanced separation technology',
			'Real-time learning capabilities',
			'High accuracy rates',
			'Flexible material processing'
		],
		specifications: {
			'Processing Speed': 'High-speed continuous operation',
			'Accuracy': 'Superior material identification',
			'Technology': 'AI-powered optical sorting',
			'Learning': 'Real-time algorithm adaptation',
			'Applications': 'Mixed waste, plastics, recyclables'
		}
	},
	{
		id: 6,
		name: 'Smicon Food Waste Depackagers',
		image: '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg',
		description: 'Advanced food waste processing equipment for organic material separation and depackaging.',
		features: [
			'Food waste processing',
			'Organic material separation',
			'Depackaging technology',
			'High efficiency operation',
			'Easy maintenance',
			'Flexible applications'
		],
		specifications: {
			'Processing': 'Food waste depackaging',
			'Efficiency': 'High organic separation rates',
			'Technology': 'Advanced depackaging systems',
			'Applications': 'Food waste, organic processing'
		}
	},
	{
		id: 7,
		name: 'GÜNTHER Screens',
		image: '/Images/Equipment/Gunther%20screens/IMG_8615.jpg',
		description: 'High-performance screening equipment for material separation and classification.',
		features: [
			'Material screening',
			'High performance separation',
			'Durable design',
			'Easy maintenance',
			'Flexible configurations',
			'Consistent performance'
		],
		specifications: {
			'Capacity': 'High-volume processing',
			'Technology': 'Advanced screening',
			'Maintenance': 'Low maintenance design',
			'Applications': 'Material separation, classification'
		}
	},
	{
		id: 8,
		name: 'Centriair Odor Control',
		image: '/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG',
		description: 'Advanced odor control systems for waste processing facilities. Effective air treatment solutions for maintaining air quality.',
		features: [
			'Effective odor control',
			'Air quality improvement',
			'Energy efficient operation',
			'Low maintenance requirements',
			'Customizable solutions',
			'Environmental compliance'
		],
		specifications: {
			'Efficiency': 'High odor removal efficiency',
			'Technology': 'Advanced air treatment',
			'Energy': 'Energy efficient operation',
			'Applications': 'Waste processing facilities'
		}
	},
	{
		id: 9,
		name: 'Greyparrot AI',
		image: '/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png',
		description: 'AI-powered waste analytics and material recognition. Advanced computer vision technology for waste stream analysis.',
		features: [
			'AI-powered analytics',
			'Computer vision technology',
			'Real-time material recognition',
			'Data-driven insights',
			'Automated reporting',
			'Performance optimization'
		],
		specifications: {
			'Technology': 'AI and computer vision',
			'Analytics': 'Real-time waste stream analysis',
			'Accuracy': 'High material recognition accuracy',
			'Applications': 'Waste analytics, material recovery'
		}
	},
	{
		id: 10,
		name: 'Densimetric Table',
		image: '/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg',
		description: 'Advanced density separation technology for material recovery. Efficient separation of materials based on density differences.',
		features: [
			'Density-based separation',
			'High recovery rates',
			'Efficient material processing',
			'Low energy consumption',
			'Robust construction',
			'Flexible applications'
		],
		specifications: {
			'Separation': 'Density-based material separation',
			'Efficiency': 'High recovery rates',
			'Energy': 'Low energy consumption',
			'Applications': 'Material recovery, waste processing'
		}
	},
	{
		id: 11,
		name: 'BeeFoam Dust Suppression',
		image: '/Images/Equipment/Beefoam%20dust%20suppression/after%20beefoam.JPG',
		description: 'Advanced dust suppression system using foam technology. Effective dust control for improved air quality and worker safety.',
		features: [
			'Foam-based dust suppression',
			'Effective dust control',
			'Improved air quality',
			'Worker safety enhancement',
			'Low water consumption',
			'Easy maintenance'
		],
		specifications: {
			'Technology': 'Foam-based suppression',
			'Efficiency': 'High dust suppression effectiveness',
			'Water Usage': 'Low water consumption',
			'Applications': 'Dust control, air quality improvement'
		}
	},
	{
		id: 12,
		name: 'Reckelberg Environmental Technologies',
		image: '/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp',
		description: 'Specialized environmental technology solutions for waste processing. Advanced systems for environmental compliance and efficiency.',
		features: [
			'Environmental compliance',
			'Advanced technology solutions',
			'Efficient processing systems',
			'Regulatory compliance',
			'Customizable solutions',
			'Performance optimization'
		],
		specifications: {
			'Compliance': 'Environmental regulatory compliance',
			'Technology': 'Advanced environmental solutions',
			'Applications': 'Environmental processing, compliance'
		}
	},
	{
		id: 13,
		name: 'Certified Pre-Owned Equipment',
		image: '/Images/Equipment/Certified%20Pre-owned%20Equipment/rebuilt%20baler.png',
		description: 'Certified pre-owned equipment with full warranty and support. Quality used equipment at competitive prices.',
		features: [
			'Certified pre-owned equipment',
			'Full warranty coverage',
			'Quality assurance',
			'Competitive pricing',
			'Professional inspection',
			'Support services available'
		],
		specifications: {
			'Quality': 'Certified and inspected',
			'Warranty': 'Full warranty coverage',
			'Support': 'Complete support services',
			'Applications': 'Cost-effective equipment solutions'
		}
	},
];
const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, isOpen, onClose, navigate }) => {
	if (!equipment) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="relative h-64 bg-gradient-to-r from-vd-blue-dark to-vd-blue">
							<img
								src={equipment.image}
								alt={equipment.name}
								className="w-full h-full object-cover opacity-80"
								width="800"
								height="256"
								loading="lazy"
									onError={(e) => {
										if (import.meta.env.DEV) {
											console.log('Modal image failed to load:', equipment.name);
										}
										e.currentTarget.src = '/Images/first.jpg';
									}}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<div className="absolute bottom-6 left-6 text-white">
								<h2 className="text-2xl font-bold text-white mb-2 leading-tight">{equipment.name}</h2>
								{equipment.description && (
									<p className="text-base opacity-90">{equipment.description}</p>
								)}
							</div>
							<button
								onClick={onClose}
								aria-label="Close modal"
								className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Features */}
								{equipment.features && equipment.features.length > 0 && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
									>
										<h3 className="text-xl font-semibold text-vd-blue mb-4">
											{t('common.keyFeatures')}
										</h3>
										<ul className="space-y-3">
											{equipment.features.map((feature: string, index: number) => (
												<motion.li
													key={feature}
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: 0.3 + index * 0.1 }}
													className="flex items-start gap-3"
												>
													<CheckCircle className="w-5 h-5 text-vd-orange mt-0.5 flex-shrink-0" />
													<span className="text-vd-blue/80">
														{feature}
													</span>
												</motion.li>
											))}
										</ul>
									</motion.div>
								)}

								{/* Specifications */}
								{equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.4 }}
									>
										<h3 className="text-xl font-semibold text-vd-blue mb-4">
											{t('common.specifications')}
										</h3>
										<div className="space-y-3">
											{Object.entries(equipment.specifications).map(([key, value], index) => (
												<motion.div
													key={key}
													initial={{ opacity: 0, x: 10 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: 0.5 + index * 0.1 }}
													className="flex justify-between items-center py-2 border-b border-gray-100"
												>
													<span className="font-medium text-gray-700">{key}:</span>
													<span className="text-vd-blue font-semibold">{value || 'N/A'}</span>
												</motion.div>
											))}
										</div>
									</motion.div>
								)}
							</div>

							{/* Applications */}
							{equipment.applications && equipment.applications.length > 0 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className="mt-8"
								>
									<h3 className="text-xl font-semibold text-vd-blue mb-4">
										{t('common.applications')}
									</h3>
									<div className="flex flex-wrap gap-2">
										{equipment.applications.map((application: string, index: number) => (
											<motion.span
												key={application}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.7 + index * 0.1 }}
												className="bg-vd-orange/10 text-vd-orange px-3 py-1 rounded-full text-sm font-medium"
											>
												{application}
											</motion.span>
										))}
									</div>
								</motion.div>
							)}

							{/* CTA */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
								className="mt-8 pt-6 border-t border-gray-200"
							>
								<div className="flex flex-col sm:flex-row gap-4">
									<button
										onClick={() => {
											onClose();
											navigate('/quote');
										}}
										className="flex-1 bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
									>
										<Quote className="w-5 h-5 mr-2" />
										{t('common.getQuote')}
									</button>
									<button
										onClick={onClose}
										className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
									>
										<ArrowRight className="w-5 h-5 mr-2" />
										{t('common.close')}
									</button>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Equipment = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const fadeInUp = animationConfig.fadeInUp;
	const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
	const [showEquipmentModal, setShowEquipmentModal] = useState(false);
	const [showQuoteForm, setShowQuoteForm] = useState(false);

	const handleLearnMore = (equipment: Equipment) => {
		// Map equipment IDs and names to their individual page routes
		const equipmentRoutes: { [key: string]: string } = {
			'Bollegraaf Balers': '/equipment/bollegraaf',
			'Lubo Screens': '/equipment/lubo-screening',
			'Tomra Optical Sort': '/equipment/tomra',
			'Pellenc ST Optical Sorting': '/equipment/pellenc-st',
			'Walair Density Separation': '/equipment/walair-density-separation',
			'Smicon Food Waste Depackagers': '/equipment/smicon-depackager',
			'GÜNTHER Screens': '/equipment/gunther-screens',
			'Centriair Odor Control': '/equipment/centriair-odor-control',
			'Greyparrot AI': '/equipment/greyparrot-ai',
			'Densimetric Table': '/equipment/densimetric-table',
			'BeeFoam Dust Suppression': '/equipment/beefoam-dust-suppression',
			'Reckelberg Environmental Technologies': '/equipment/reckelberg-environmental',
			'Certified Pre-Owned Equipment': '/equipment/certified-pre-owned',
			'Glass Cleanup Systems': '/equipment/glass-cleanup-systems'
		};

		const route = equipmentRoutes[equipment.name];

		if (route) {
			// Scroll to top before navigation
			window.scrollTo(0, 0);
			navigate(route);
		} else {
			// Fallback to modal for equipment without individual pages
			setSelectedEquipment(equipment);
			setShowEquipmentModal(true);
		}
	};

	const handleGetQuoteFromCard = (equipment: Equipment) => {
		setSelectedEquipment(equipment);
		setShowQuoteForm(true);
	};

	const closeEquipmentModal = () => {
		setShowEquipmentModal(false);
		setSelectedEquipment(null);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
				<div className="absolute inset-0">
					<img 
						src="/Images/Equipment/Header%20image%20for%20Equipment%20grid.jpg"
						alt={t('common.advancedRecyclingEquipment')}
						className="w-full h-full object-cover object-center scale-105"
						loading="eager"
						fetchPriority="high"
						onError={(e) => {
							if (import.meta.env.DEV) {
								console.log('Hero image failed to load, using fallback');
							}
							e.currentTarget.src = '/Images/bollegraaf-new-1.jpg';
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
							{t('common.advancedRecyclingEquipment')}
						</h1>
							<p className="text-xl text-blue-100 mb-8 leading-relaxed">
								{t('common.advancedRecyclingEquipmentDesc')}
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									to="/solutions"
									className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center"
								>
									{t('common.exploreSolutions')}
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

			{/* Equipment Grid */}
			<div className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-vd-blue mb-6">{t('common.ourEquipmentPortfolio')}</h2>
					<p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
						{t('common.ourEquipmentPortfolioDesc')}
					</p>
				</div>

				<motion.div
					variants={{
						animate: {
							transition: {
								staggerChildren: 0.1
							}
						}
					}}
					initial="initial"
					animate="animate"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{equipmentItems.map((equipment) => (
						<motion.div
							key={equipment.id}
							id={equipment.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-equipment'}
							variants={{
								initial: { opacity: 0, y: 60 },
								animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
							}}
							whileHover={{ 
								scale: 1.03,
								y: -8,
								transition: { duration: 0.3, ease: "easeOut" }
							}}
							whileTap={{ scale: 0.98 }}
							onClick={() => handleLearnMore(equipment)}
							className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={equipment.image}
									alt={equipment.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									width="400"
									height="192"
									loading="lazy"
									onError={(e) => {
										if (import.meta.env.DEV) {
											console.log('Equipment image failed to load:', equipment.name);
										}
										e.currentTarget.src = '/Images/first.jpg';
									}}
								/>
							</div>
							
							<div className="p-6">
								<h3 className="text-xl font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors">
									{equipment.name}
								</h3>
								
								{equipment.description && (
									<p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
										{equipment.description}
									</p>
								)}
								
								{equipment.features && equipment.features.length > 0 && (
									<div className="mb-4">
										<h4 className="text-sm font-semibold text-gray-900 mb-2">{t('common.keyFeatures')}:</h4>
										<ul className="text-xs text-gray-600 space-y-1">
											{equipment.features.slice(0, 3).map((feature, index) => (
												<li key={index} className="flex items-start">
													<span className="text-vd-orange mr-2">•</span>
													<span>{feature}</span>
												</li>
											))}
											{equipment.features.length > 3 && (
												<li className="text-vd-orange font-medium">
													+{equipment.features.length - 3} {t('common.moreFeatures')}
												</li>
											)}
										</ul>
									</div>
								)}
								
								<div className="flex space-x-3">
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleLearnMore(equipment);
										}}
										className="flex-1 bg-vd-blue hover:bg-vd-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg"
									>
										{t('common.learnMore')}
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</button>
									<button
										onClick={() => handleGetQuoteFromCard(equipment)}
										className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
									>
										<Quote className="w-4 h-4" />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* CTA Section */}
			<div className="bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-white mb-6">{t('common.readyToUpgrade')}</h2>
					<p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
						{t('common.readyToUpgradeDesc')}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={() => navigate('/quote')}
							className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center"
						>
							<Quote className="w-5 h-5 mr-2" />
							{t('common.requestQuote')}
						</button>
						<Link
							to="/contact"
							className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center"
						>
							{t('common.contactUs')}
						</Link>
					</div>
				</div>
			</div>

			{/* Equipment Modal */}
			<EquipmentModal
				equipment={selectedEquipment}
				isOpen={showEquipmentModal}
				onClose={closeEquipmentModal}
				navigate={navigate}
			/>

			{/* Quote Form Modal */}
			{showQuoteForm && (
				<QuoteForm />
			)}

		</div>
	);
};

export default Equipment;
