import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../config/translations';

interface MachineMarker {
	id: string;
	name: string;
	x: number; // percentage from left
	y: number; // percentage from top
	description: string;
}

const machineMarkers: MachineMarker[] = [
	{ id: '1', name: 'Optical Sorter 1', x: 25, y: 30, description: 'TOMRA Autosort for material identification' },
	{ id: '2', name: 'Optical Sorter 2', x: 45, y: 35, description: 'Pellenc ST optical sorting system' },
	{ id: '3', name: 'Conveyor System', x: 35, y: 50, description: 'Main material flow conveyor' },
	{ id: '4', name: 'Screening Unit', x: 60, y: 40, description: 'Lubo screening equipment' },
	{ id: '5', name: 'Greyparrot Analyzer', x: 50, y: 25, description: 'AI-powered material analysis' }
];

type AudienceLogoKey = 'operators' | 'cpg' | 'consultants' | 'academics';

const audienceLogos: Record<AudienceLogoKey, { src: string; alt: string; halo: string }> = {
	operators: {
		src: '/Images/icons/test-center-operators.svg',
		alt: 'Icon representing recycling facility operators',
		halo: 'from-white via-slate-50 to-slate-200'
	},
	cpg: {
		src: '/Images/icons/test-center-cpg.svg',
		alt: 'Icon representing CPG brands and packaging',
		halo: 'from-white via-rose-50 to-orange-100'
	},
	consultants: {
		src: '/Images/icons/test-center-consultants.svg',
		alt: 'Icon representing consulting strategy targets',
		halo: 'from-white via-emerald-50 to-green-100'
	},
	academics: {
		src: '/Images/icons/test-center-academics.svg',
		alt: 'Icon representing academic and research partners',
		halo: 'from-white via-indigo-50 to-blue-100'
	}
};

const TestCenter: React.FC = () => {
	const { t } = useTranslation();
	const { language } = useLanguage();
	
	const [formData, setFormData] = useState({
		fullName: '',
		companyName: '',
		email: '',
		phone: '',
		materialStreams: '',
		testingProtocols: ''
	});

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	const [imageZoom, setImageZoom] = useState(1);
	const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [activeMarker, setActiveMarker] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', formData);
		setFormSubmitted(true);
		setTimeout(() => {
			setFormSubmitted(false);
			setFormData({
				fullName: '',
				companyName: '',
				email: '',
				phone: '',
				materialStreams: '',
				testingProtocols: ''
			});
		}, 3000);
	};

	const openImageModal = () => {
		setShowImageModal(true);
		setImageZoom(1);
		setImagePosition({ x: 0, y: 0 });
		setActiveMarker(null);
		// Scroll to top when modal opens
		setTimeout(() => {
			const modalContent = document.querySelector('[role="dialog"]')?.nextElementSibling as HTMLElement;
			if (modalContent) {
				const scrollContainer = modalContent.querySelector('.overflow-y-auto') as HTMLElement;
				if (scrollContainer) {
					scrollContainer.scrollTop = 0;
				}
			}
		}, 100);
	};

	const closeImageModal = () => {
		setShowImageModal(false);
		setImageZoom(1);
		setImagePosition({ x: 0, y: 0 });
		setActiveMarker(null);
	};

	const handleZoomIn = () => {
		setImageZoom(prev => Math.min(prev + 0.5, 3));
	};

	const handleZoomOut = () => {
		setImageZoom(prev => Math.max(prev - 0.5, 1));
	};

	const handleResetZoom = () => {
		setImageZoom(1);
		setImagePosition({ x: 0, y: 0 });
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (imageZoom > 1) {
			setIsDragging(true);
			setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging && imageZoom > 1) {
			setImagePosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleWheel = (e: React.WheelEvent) => {
		if (showImageModal) {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			setImageZoom(prev => Math.max(1, Math.min(3, prev + delta)));
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<div className="relative -mt-20 pt-20 min-h-screen flex items-center">
				<div className="relative w-full h-screen">
					<img
						src="/Images/test-center-hero.jpg"
						alt="Van Dyk Test Center"
						className="w-full h-full object-cover"
						loading="eager"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="container mx-auto px-4">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="max-w-4xl mx-auto text-center text-white"
							>
								<h1 className="text-4xl md:text-5xl font-bold mb-6">{t('testCenter.heroTitle')}</h1>
								<p className="text-xl text-gray-100 mb-8">
									{t('testCenter.heroSubtitle')}
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<a
										href="tel:203-967-1100"
										className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
									>
										<Phone className="w-5 h-5" />
										<span>{t('testCenter.callButton')}</span>
									</a>
									<a
										href="mailto:info@vdrs.com"
										className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
									>
										<Mail className="w-5 h-5" />
										<span>{t('testCenter.emailButton')}</span>
									</a>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-16">
				{/* 1. Facility Overview & Capabilities Section (with videos) */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
				>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4 text-center">
							{t('testCenter.facilityOverviewTitle')}
						</h2>
						<p className="text-gray-600 text-lg mb-8 text-center max-w-3xl mx-auto">
							{t('testCenter.facilityOverviewDesc')}
						</p>
						
						{/* Why Test Center */}
						<div className="mb-12">
							<h3 className="text-2xl font-semibold text-vd-blue mb-4">{t('testCenter.whyChooseTitle')}</h3>
							<p className="text-gray-700 text-lg leading-relaxed mb-6">
								{t('testCenter.whyChooseContent')}
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
								<div className="bg-vd-blue/5 p-6 rounded-xl">
									<h4 className="text-xl font-semibold text-vd-blue mb-4">{t('testCenter.facilitySpecsTitle')}</h4>
									<ul className="space-y-3 text-gray-700">
										{(translations[language]?.testCenter?.facilitySpecs || translations.en.testCenter.facilitySpecs).map((spec: string, index: number) => (
											<li key={index} className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-vd-orange rounded-full"></div>
												<span>{spec}</span>
											</li>
										))}
									</ul>
								</div>
								<div className="bg-vd-blue/5 p-6 rounded-xl">
									<h4 className="text-xl font-semibold text-vd-blue mb-4">{t('testCenter.equipmentCapabilitiesTitle')}</h4>
									<ul className="space-y-3 text-gray-700">
										{(translations[language]?.testCenter?.equipmentCapabilities || translations.en.testCenter.equipmentCapabilities).map((capability: string, index: number) => (
											<li key={index} className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-vd-orange rounded-full"></div>
												<span>{capability}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{/* Animated Facility Card Trigger */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="mb-12"
						>
							<div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-vd-blue/5 to-vd-orange/10 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
								<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ff7e1f_0%,_transparent_50%)]"></div>
								<div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/30 to-transparent"></div>
								<div className="relative rounded-3xl bg-white/95 backdrop-blur-sm p-8 flex flex-col items-center text-center space-y-6">
									<motion.div
										animate={{ rotate: [0, 1.5, 0], y: [0, -4, 0] }}
										transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
										className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-vd-blue/20 bg-vd-blue/5 text-vd-blue font-semibold text-sm"
									>
										<div className="w-2 h-2 rounded-full bg-vd-orange animate-pulse"></div>
										{t('testCenter.liveViewLabel')}
									</motion.div>
									<div>
										<h3 className="text-2xl font-bold text-vd-blue mb-3">{t('testCenter.exploreLayoutTitle')}</h3>
										<p className="text-gray-600 text-lg">
											{t('testCenter.exploreLayoutDesc')}
										</p>
									</div>
									<motion.button
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.98 }}
										onClick={openImageModal}
										className="inline-flex items-center justify-center gap-2 bg-vd-blue hover:bg-vd-blue-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-vd-blue/30 transition-colors"
									>
										<Maximize2 className="w-5 h-5" />
										{t('testCenter.viewTestCenter')}
									</motion.button>
									<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
										<span className="flex items-center gap-2">
											<div className="w-2 h-2 rounded-full bg-vd-blue"></div>
											{t('testCenter.highResLayout')}
										</span>
										<span className="flex items-center gap-2">
											<div className="w-2 h-2 rounded-full bg-vd-orange"></div>
											{t('testCenter.zoomPanEnabled')}
										</span>
										<span className="flex items-center gap-2">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
											{t('testCenter.updatedWeekly')}
										</span>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Videos Section */}
						<div className="mt-12">
							<h3 className="text-2xl font-semibold text-vd-blue mb-6 text-center">{t('testCenter.seeFacilityTitle')}</h3>
							<div className="bg-gray-50 rounded-2xl p-6 md:p-8">
								<h4 className="text-xl font-semibold text-vd-blue mb-4 text-center">{t('testCenter.plasticFlakeTitle')}</h4>
							<div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
								<iframe
									className="absolute top-0 left-0 w-full h-full rounded-lg"
									src="https://www.youtube.com/embed/5We5bc_97lU"
									title="Plastic Flake Sorting – Now Testing with AUTOSORT FLAKE!"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									loading="lazy"
									referrerPolicy="strict-origin-when-cross-origin"
								></iframe>
							</div>
							<p className="text-gray-600 text-center mt-4">
								{t('testCenter.plasticFlakeDesc')}
							</p>
							</div>
						</div>
					</div>
				</motion.section>

				{/* 2. Tailored Solutions for Every Need Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
				>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4 text-center">
							{t('testCenter.tailoredSolutionsTitle')}
						</h2>
						<p className="text-gray-700 text-lg mb-10 text-center max-w-4xl mx-auto">
							{t('testCenter.tailoredSolutionsDesc')}
						</p>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{[
								{
									key: 'operators' as AudienceLogoKey,
									title: t('testCenter.recyclingOperatorsTitle'),
									description: t('testCenter.recyclingOperatorsDesc'),
									gradient: 'from-vd-blue/5 to-vd-blue/10',
									delay: 0.1
								},
								{
									key: 'cpg' as AudienceLogoKey,
									title: t('testCenter.cpgBrandsTitle'),
									description: t('testCenter.cpgBrandsDesc'),
									gradient: 'from-vd-orange/5 to-vd-orange/10',
									delay: 0.2
								},
								{
									key: 'consultants' as AudienceLogoKey,
									title: t('testCenter.consultantsTitle'),
									description: t('testCenter.consultantsDesc'),
									gradient: 'from-green-50 to-green-100',
									delay: 0.3
								},
								{
									key: 'academics' as AudienceLogoKey,
									title: t('testCenter.academicsTitle'),
									description: t('testCenter.academicsDesc'),
									gradient: 'from-blue-50 to-blue-100',
									delay: 0.4
								}
							].map(({ key, title, description, gradient, delay }) => {
								const logo = audienceLogos[key];
								return (
									<motion.div
										key={key}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay }}
										className={`bg-gradient-to-br ${gradient} rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow`}
									>
										<div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${logo.halo} shadow-inner`}>
											<img
												src={logo.src}
												alt={logo.alt}
												className="w-11 h-11"
												loading="lazy"
												decoding="async"
												draggable={false}
											/>
										</div>
										<h3 className="text-xl font-semibold text-vd-blue mb-3">{title}</h3>
										<p className="text-gray-600">
											{description}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</motion.section>

				{/* 3. Comprehensive Brand Testing Protocols Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
				>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4 text-center">
							Comprehensive Brand Testing Protocols
						</h2>
						<p className="text-gray-700 text-lg mb-8 text-center max-w-4xl mx-auto">
							Our Test Center offers comprehensive testing protocols specifically designed for APR (Association of Plastic Recyclers) and CPG (Consumer Packaged Goods) brands to validate packaging recyclability and sortability.
						</p>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
							<div className="bg-gradient-to-br from-vd-orange/5 to-vd-orange/10 rounded-xl p-6 border border-vd-orange/20">
								<h3 className="text-2xl font-semibold text-vd-blue mb-4">Testing Protocols We Offer</h3>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>Sortability Testing:</strong> Evaluate how well packaging materials can be sorted in a typical MRF environment</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>Purity Analysis:</strong> Determine the purity levels achievable for different material streams</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>Contamination Studies:</strong> Assess contamination levels and identify potential issues</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>Material Recovery Rates:</strong> Measure recovery efficiency for specific packaging types</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>APR Design Guide Compliance:</strong> Test packaging against APR design guidelines</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-orange rounded-full mt-2 flex-shrink-0"></div>
										<span><strong>End-to-End Processing:</strong> Full material flow testing from input to sorted output</span>
									</li>
								</ul>
							</div>
							
							<div className="bg-gradient-to-br from-vd-blue/5 to-vd-blue/10 rounded-xl p-6 border border-vd-blue/20">
								<h3 className="text-2xl font-semibold text-vd-blue mb-4">Benefits for Brands</h3>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-blue rounded-full mt-2 flex-shrink-0"></div>
										<span>Validate packaging recyclability before market launch</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-blue rounded-full mt-2 flex-shrink-0"></div>
										<span>De-risk sustainability initiatives and capital investments</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-blue rounded-full mt-2 flex-shrink-0"></div>
										<span>Obtain data-driven insights for packaging design improvements</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-blue rounded-full mt-2 flex-shrink-0"></div>
										<span>Meet regulatory and sustainability reporting requirements</span>
									</li>
									<li className="flex items-start space-x-3">
										<div className="w-2 h-2 bg-vd-blue rounded-full mt-2 flex-shrink-0"></div>
										<span>Support circular economy goals with validated recyclability</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</motion.section>

				{/* 4. Schedule Your Material Test Today & Contact Form Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mb-16 bg-gradient-to-br from-vd-blue to-vd-blue-dark rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
				>
					<div className="max-w-5xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
							{t('testCenter.scheduleTestTitle')}
						</h2>
						<p className="text-gray-100 text-lg mb-8 text-center max-w-3xl mx-auto">
							{t('testCenter.scheduleTestDesc')}
						</p>
						
						{/* Contact Form */}
						<div>
							{formSubmitted ? (
							<div className="bg-white rounded-xl p-8 text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Mail className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-2xl font-semibold text-vd-blue mb-2">Thank You!</h3>
								<p className="text-gray-600">We've received your request and will contact you shortly.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
											{t('testCenter.formFullName')} <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="fullName"
											name="fullName"
											value={formData.fullName}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
											placeholder={t('contact.formNamePlaceholder')}
										/>
									</div>
									
									<div>
										<label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
											{t('testCenter.formCompany')} <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="companyName"
											name="companyName"
											value={formData.companyName}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
											placeholder={t('contact.formCompanyPlaceholder')}
										/>
									</div>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
											{t('testCenter.formEmail')} <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
											placeholder={t('contact.formEmailPlaceholder')}
										/>
									</div>
									
									<div>
										<label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
											{t('testCenter.formPhone')} <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
											placeholder={t('contact.formPhonePlaceholder')}
										/>
									</div>
								</div>
								
								<div>
									<label htmlFor="materialStreams" className="block text-sm font-semibold text-gray-700 mb-2">
										{t('testCenter.formMaterialStreams')} <span className="text-red-500">*</span>
									</label>
									<textarea
										id="materialStreams"
										name="materialStreams"
										value={formData.materialStreams}
										onChange={handleInputChange}
										required
										rows={3}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all resize-none"
										placeholder={t('testCenter.formMaterialStreamsPlaceholder')}
									/>
								</div>
								
								<div>
									<label htmlFor="testingProtocols" className="block text-sm font-semibold text-gray-700 mb-2">
										{t('testCenter.formTestingProtocols')} <span className="text-red-500">*</span>
									</label>
									<textarea
										id="testingProtocols"
										name="testingProtocols"
										value={formData.testingProtocols}
										onChange={handleInputChange}
										required
										rows={4}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all resize-none"
										placeholder={t('testCenter.formTestingProtocolsPlaceholder')}
									/>
								</div>
								
								<div className="pt-4">
									<button
										type="submit"
										className="w-full bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center space-x-2"
									>
										<Mail className="w-5 h-5" />
										<span>{t('testCenter.formSubmit')}</span>
									</button>
								</div>
							</form>
							)}
						</div>
					</div>
				</motion.section>
			</div>
			<AnimatePresence>
				{showImageModal && (
					<>
						{/* Backdrop with blur */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
							onClick={closeImageModal}
							role="dialog"
							aria-modal="true"
						/>
						
						{/* Modal Content */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ 
								type: 'spring',
								stiffness: 300,
								damping: 30,
								duration: 0.4
							}}
							className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-auto max-h-[90vh] overflow-hidden flex flex-col">
								{/* Header */}
								<div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-vd-blue/5 to-white flex-shrink-0">
									<div>
										<p className="text-xs uppercase tracking-wider text-vd-orange font-semibold mb-1">Immersive View</p>
										<h4 id="test-center-modal-title" className="text-2xl font-bold text-vd-blue">Van Dyk Test Center Layout</h4>
									</div>
									<div className="flex items-center gap-3">
										<div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
											<button 
												onClick={handleZoomOut} 
												className="p-2 rounded-lg hover:bg-white transition-colors" 
												aria-label="Zoom out"
											>
												<ZoomOut className="w-5 h-5 text-gray-700" />
											</button>
											<button 
												onClick={handleZoomIn} 
												className="p-2 rounded-lg hover:bg-white transition-colors" 
												aria-label="Zoom in"
											>
												<ZoomIn className="w-5 h-5 text-gray-700" />
											</button>
											<button 
												onClick={handleResetZoom} 
												className="p-2 rounded-lg hover:bg-white transition-colors" 
												aria-label="Reset zoom"
											>
												<Maximize2 className="w-5 h-5 text-gray-700" />
											</button>
										</div>
										<button
											onClick={closeImageModal}
											className="p-2 rounded-full hover:bg-gray-100 transition-colors"
											aria-label="Close modal"
										>
											<X className="w-6 h-6 text-gray-600" />
										</button>
									</div>
								</div>

								{/* Image Container */}
								<div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-0">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.1 }}
										className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg"
										onWheel={handleWheel}
										onMouseDown={handleMouseDown}
										onMouseMove={handleMouseMove}
										onMouseUp={handleMouseUp}
										onMouseLeave={handleMouseUp}
									>
										<img
											src="/Images/TestCenterExploded.jpg"
											alt="Van Dyk Test Center Layout"
											className="w-full h-auto select-none"
											draggable={false}
											style={{
												transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageZoom})`,
												transition: isDragging ? 'none' : 'transform 0.2s ease-out',
												cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
											}}
										/>
										<div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
											Zoom {imageZoom.toFixed(1)}x
										</div>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TestCenter;
