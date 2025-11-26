import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
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

const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, isOpen, onClose, navigate }) => {
	const { t } = useTranslation();
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
						role="dialog"
						aria-modal="true"
						aria-labelledby="equipment-page-modal-title"
						aria-describedby="equipment-page-modal-description"
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

	// Equipment items with translations - moved inside component to access t()
	const equipmentItems: Equipment[] = [
		{
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
			}
		},
		{
			id: 2,
			name: t('equipment.equipment2Name'),
			image: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg',
			description: t('equipment.equipment2Description'),
			features: [
				t('equipment.equipment2Feature1'),
				t('equipment.equipment2Feature2'),
				t('equipment.equipment2Feature3'),
				t('equipment.equipment2Feature4'),
				t('equipment.equipment2Feature5'),
				t('equipment.equipment2Feature6'),
				t('equipment.equipment2Feature7'),
				t('equipment.equipment2Feature8'),
			],
			specifications: {
				[t('equipment.equipment2Spec1Key')]: t('equipment.equipment2Spec1Value'),
				[t('equipment.equipment2Spec2Key')]: t('equipment.equipment2Spec2Value'),
				[t('equipment.equipment2Spec3Key')]: t('equipment.equipment2Spec3Value'),
				[t('equipment.equipment2Spec4Key')]: t('equipment.equipment2Spec4Value'),
				[t('equipment.equipment2Spec5Key')]: t('equipment.equipment2Spec5Value'),
				[t('equipment.equipment2Spec6Key')]: t('equipment.equipment2Spec6Value'),
				[t('equipment.equipment2Spec7Key')]: t('equipment.equipment2Spec7Value'),
			}
		},
		{
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
			}
		},
		{
			id: 4,
			name: t('equipment.equipment4Name'),
			image: '/Images/Equipment/Pellenc%20optical%20sorters/Product%20image_pellenc.JPG',
			description: t('equipment.equipment4Description'),
			features: [
				t('equipment.equipment4Feature1'),
				t('equipment.equipment4Feature2'),
				t('equipment.equipment4Feature3'),
				t('equipment.equipment4Feature4'),
				t('equipment.equipment4Feature5'),
				t('equipment.equipment4Feature6'),
				t('equipment.equipment4Feature7'),
				t('equipment.equipment4Feature8'),
			],
			specifications: {
				[t('equipment.equipment4Spec1Key')]: t('equipment.equipment4Spec1Value'),
				[t('equipment.equipment4Spec2Key')]: t('equipment.equipment4Spec2Value'),
				[t('equipment.equipment4Spec3Key')]: t('equipment.equipment4Spec3Value'),
				[t('equipment.equipment4Spec4Key')]: t('equipment.equipment4Spec4Value'),
				[t('equipment.equipment4Spec5Key')]: t('equipment.equipment4Spec5Value'),
			}
		},
		{
			id: 6,
			name: t('equipment.equipment6Name'),
			image: '/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg',
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
			}
		},
		{
			id: 7,
			name: t('equipment.equipment7Name'),
			image: '/Images/Equipment/Gunther%20screens/IMG_8615.jpg',
			description: t('equipment.equipment7Description'),
			features: [
				t('equipment.equipment7Feature1'),
				t('equipment.equipment7Feature2'),
				t('equipment.equipment7Feature3'),
				t('equipment.equipment7Feature4'),
				t('equipment.equipment7Feature5'),
				t('equipment.equipment7Feature6'),
			],
			specifications: {
				[t('equipment.equipment7Spec1Key')]: t('equipment.equipment7Spec1Value'),
				[t('equipment.equipment7Spec2Key')]: t('equipment.equipment7Spec2Value'),
				[t('equipment.equipment7Spec3Key')]: t('equipment.equipment7Spec3Value'),
				[t('equipment.equipment7Spec4Key')]: t('equipment.equipment7Spec4Value'),
			}
		},
		{
			id: 8,
			name: t('equipment.equipment8Name'),
			image: '/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG',
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
			}
		},
		{
			id: 9,
			name: t('equipment.equipment9Name'),
			image: '/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png',
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
			}
		},
		{
			id: 10,
			name: t('equipment.equipment10Name'),
			image: '/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg',
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
			}
		},
		{
			id: 11,
			name: t('equipment.equipment11Name'),
			image: '/Images/Equipment/Beefoam%20dust%20suppression/after%20beefoam.JPG',
			description: t('equipment.equipment11Description'),
			features: [
				t('equipment.equipment11Feature1'),
				t('equipment.equipment11Feature2'),
				t('equipment.equipment11Feature3'),
				t('equipment.equipment11Feature4'),
				t('equipment.equipment11Feature5'),
				t('equipment.equipment11Feature6'),
			],
			specifications: {
				[t('equipment.equipment11Spec1Key')]: t('equipment.equipment11Spec1Value'),
				[t('equipment.equipment11Spec2Key')]: t('equipment.equipment11Spec2Value'),
				[t('equipment.equipment11Spec3Key')]: t('equipment.equipment11Spec3Value'),
				[t('equipment.equipment11Spec4Key')]: t('equipment.equipment11Spec4Value'),
			}
		},
		{
			id: 12,
			name: t('equipment.equipment12Name'),
			image: '/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp',
			description: t('equipment.equipment12Description'),
			features: [
				t('equipment.equipment12Feature1'),
				t('equipment.equipment12Feature2'),
				t('equipment.equipment12Feature3'),
				t('equipment.equipment12Feature4'),
				t('equipment.equipment12Feature5'),
				t('equipment.equipment12Feature6'),
			],
			specifications: {
				[t('equipment.equipment12Spec1Key')]: t('equipment.equipment12Spec1Value'),
				[t('equipment.equipment12Spec2Key')]: t('equipment.equipment12Spec2Value'),
				[t('equipment.equipment12Spec3Key')]: t('equipment.equipment12Spec3Value'),
			}
		},
		{
			id: 13,
			name: t('equipment.equipment13Name'),
			image: '/Images/Equipment/Certified%20Pre-owned%20Equipment/rebuilt%20baler.png',
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
			}
		},
	];

	const handleLearnMore = (equipment: Equipment) => {
		// Map equipment IDs to their individual page routes (using IDs for language-independent routing)
		const equipmentRoutes: { [key: number]: string } = {
			1: '/equipment/bollegraaf',
			2: '/equipment/lubo-screening',
			3: '/equipment/tomra',
			4: '/equipment/pellenc-st',
			6: '/equipment/smicon-depackager',
			7: '/equipment/gunther-screens',
			8: '/equipment/centriair-odor-control',
			9: '/equipment/greyparrot-ai',
			10: '/equipment/densimetric-table',
			11: '/equipment/beefoam-dust-suppression',
			12: '/equipment/reckelberg-environmental',
			13: '/equipment/certified-pre-owned',
		};

		const route = equipment.id ? equipmentRoutes[equipment.id] : undefined;

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
