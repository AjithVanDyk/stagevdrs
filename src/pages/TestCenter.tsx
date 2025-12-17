import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

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
	
	const [formData, setFormData] = useState({
		fullName: '',
		companyName: '',
		email: '',
		phone: '',
		materialStreams: '',
		desiredOutcomes: ''
	});

	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		try {
			const response = await fetch('/api/test-center', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (data.success) {
				setFormSubmitted(true);
				setTimeout(() => {
					setFormSubmitted(false);
					setFormData({
						fullName: '',
						companyName: '',
						email: '',
						phone: '',
						materialStreams: '',
						desiredOutcomes: ''
					});
				}, 3000);
			} else {
				alert(data.message || 'An error occurred. Please try again.');
			}
		} catch (error) {
			console.error('Form submission error:', error);
			alert('An error occurred. Please try again.');
		}
	};


	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
			{/* Hero Section */}
			<div className="relative -mt-20 pt-20 min-h-screen flex items-center">
				<div className="relative w-full h-screen">
					<img
						src="/Images/newtestcenterhero.jpg"
						alt="Van Dyk Test Center"
						className="w-full h-full object-cover"
						loading="eager"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							// Fallback to original if new image doesn't exist
							if (!target.src.includes('test-center-hero')) {
								target.src = '/Images/test-center-hero.jpg';
							}
						}}
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="container mx-auto px-4">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
								className="max-w-4xl mx-auto text-center text-white"
							>
								<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
									{t('testCenter.heroTitle')}
								</h1>
								<p className="text-xl md:text-2xl text-gray-100 leading-relaxed drop-shadow-lg mb-8">
									{t('testCenter.heroSubtitle')}
								</p>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
								>
									<a
										href="#test-center-form"
										className="inline-flex items-center space-x-2 bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl shadow-xl hover:-translate-y-1"
									>
										<span>Schedule Now</span>
										<span>→</span>
									</a>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-20 md:py-24">
				{/* 1. Technology Center Overview Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24"
				>
					<div className="max-w-5xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-8 text-center relative">
								<span className="relative z-10">Technology Center Overview</span>
								<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-vd-orange to-transparent"></div>
							</h2>
						</motion.div>
						<div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-center">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
								className="text-lg md:text-xl"
							>
								Located at Van Dyk Recycling Solutions' headquarters in Norwalk, Connecticut, the Technology Center is a full‑scale test line where customers, brands, and researchers can replicate real MRF sorting scenarios in a controlled environment. The system includes mechanical screens, Greyparrot AI analyzer, and a standalone Flake Sorter that can handle a wide variety of packaging and solid waste streams.
							</motion.p>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								className="text-lg md:text-xl"
							>
								There are two infeed points and bi‑directional conveyors, allowing multiple line configurations so users can mirror their own plant layout or trial new process concepts.
							</motion.p>
						</div>
					</div>
				</motion.section>

				{/* 2. Key Equipment Lineup Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24"
				>
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-12 text-center relative">
								<span className="relative z-10">Key Equipment Lineup</span>
								<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-vd-orange to-transparent"></div>
							</h2>
						</motion.div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
							{/* Screening Equipment Column */}
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
								className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-vd-blue/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-vd-blue/30"
							>
								<div className="flex items-center mb-6">
									<div className="w-1 h-8 bg-gradient-to-b from-vd-orange to-vd-orange/60 rounded-full mr-4"></div>
									<h3 className="text-2xl md:text-3xl font-bold text-vd-blue">Screening Equipment</h3>
								</div>
								<ul className="space-y-4 text-gray-700">
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-base md:text-lg leading-relaxed"><strong className="text-vd-blue">Robust Lubo Elliptical screen</strong> for 2D/3D segmentation and particle size control for MRF fiber and contamination separation, with customizable material mix configurations.</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-base md:text-lg leading-relaxed"><strong className="text-vd-blue">Spaleck Single Deck Flip-Flow screen</strong> for flexible size screening from fine fractions around 5 mm up to more than 60 mm, creating clean overs and unders streams.</span>
									</li>
								</ul>
							</motion.div>
							
							{/* Optical Sorting Systems Column */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-vd-blue/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-vd-blue/30"
							>
								<div className="flex items-center mb-6">
									<div className="w-1 h-8 bg-gradient-to-b from-vd-orange to-vd-orange/60 rounded-full mr-4"></div>
									<h3 className="text-2xl md:text-3xl font-bold text-vd-blue">Optical Sorting Systems</h3>
								</div>
								<ul className="space-y-4 text-gray-700">
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-base md:text-lg leading-relaxed"><strong className="text-vd-blue">Multiple TOMRA Autosort 5 optical sorters</strong> equipped with an array of sensors, including Near-Infrared (NIR) sensors with fusion technology. This advanced technology combines powerful sensors for high‑resolution material identification and significantly lower energy use than traditional optics.</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-base md:text-lg leading-relaxed"><strong className="text-vd-blue">Pellenc Mistral+ Connect optical sorter</strong> with fusion technology that combines powerful sensors for high performance sorting.</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-base md:text-lg leading-relaxed"><strong className="text-vd-blue">TOMRA Autosort Flake</strong> for high‑purity plastic flake sorting and decontamination trials, equipped with specialized sensors for NIR and photometric detection.</span>
									</li>
								</ul>
							</motion.div>
						</div>
					</div>
				</motion.section>

				{/* 3. Video Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24"
				>
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h3 className="text-3xl md:text-4xl font-bold text-vd-blue mb-8 text-center relative">
								<span className="relative z-10">{t('testCenter.seeFacilityTitle')}</span>
								<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-vd-orange to-transparent"></div>
							</h3>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-200"
						>
							<div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ paddingBottom: '56.25%' }}>
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/QYaqrF9vNbU"
									title="Plastic Flake Sorting with AUTOSORT FLAKE"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									loading="lazy"
									referrerPolicy="strict-origin-when-cross-origin"
								></iframe>
							</div>
							<p className="text-gray-700 text-lg md:text-xl text-center mt-6 leading-relaxed">
								The largest testing facility in the world and the only one of its kind at this scale. See why we built our recycling testing center and how it benefits our core customers and consumer packaging brands.
							</p>
						</motion.div>
					</div>
				</motion.section>

				{/* 4. Tailored Solutions for Every Need Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-200"
				>
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-6 text-center relative">
								<span className="relative z-10">{t('testCenter.tailoredSolutionsTitle')}</span>
								<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-vd-orange to-transparent"></div>
							</h2>
						</motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-gray-700 text-lg md:text-xl mb-12 text-center max-w-4xl mx-auto leading-relaxed"
						>
							{t('testCenter.tailoredSolutionsDesc')}
						</motion.p>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
							{[
								{
									key: 'operators' as AudienceLogoKey,
									title: t('testCenter.recyclingOperatorsTitle'),
									description: t('testCenter.recyclingOperatorsDesc'),
									gradient: 'from-vd-blue/5 to-vd-blue/10',
									delay: 0.1,
									eprLink: false
								},
								{
									key: 'cpg' as AudienceLogoKey,
									title: t('testCenter.cpgBrandsTitle'),
									description: t('testCenter.cpgBrandsDesc'),
									gradient: 'from-vd-orange/5 to-vd-orange/10',
									delay: 0.2,
									eprLink: true
								},
								{
									key: 'consultants' as AudienceLogoKey,
									title: t('testCenter.consultantsTitle'),
									description: t('testCenter.consultantsDesc'),
									gradient: 'from-green-50 to-green-100',
									delay: 0.3,
									eprLink: false
								},
								{
									key: 'academics' as AudienceLogoKey,
									title: t('testCenter.academicsTitle'),
									description: t('testCenter.academicsDesc'),
									gradient: 'from-blue-50 to-blue-100',
									delay: 0.4,
									eprLink: false
								}
							].map(({ key, title, description, gradient, delay, eprLink }) => {
								const logo = audienceLogos[key];
								return (
									<motion.div
										key={key}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay, ease: "easeOut" }}
										className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-xl border-2 border-gray-200 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-vd-blue/30`}
									>
										<div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${logo.halo} shadow-lg ring-4 ring-white/50`}>
											<img
												src={logo.src}
												alt={logo.alt}
												className="w-12 h-12"
												loading="lazy"
												decoding="async"
												draggable={false}
											/>
										</div>
										<h3 className="text-xl md:text-2xl font-bold text-vd-blue mb-4">{title}</h3>
										<p className="text-gray-700 leading-relaxed text-base mb-4">
											{description}
										</p>
										{eprLink && (
											<Link
												to="/solutions/ai-waste-analysis#epr-compliance-map"
												className="inline-block mt-4 text-vd-orange hover:text-vd-blue font-semibold text-sm transition-colors underline"
											>
												EPR Compliance →
											</Link>
										)}
									</motion.div>
								);
							})}
						</div>
					</div>
				</motion.section>

				{/* 5. Comprehensive Testing Protocols Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-200"
				>
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-6 text-center relative">
								<span className="relative z-10">Testing Protocol</span>
								<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-vd-orange to-transparent"></div>
							</h2>
						</motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-gray-700 text-lg md:text-xl mb-6 text-center max-w-4xl mx-auto leading-relaxed"
						>
							Our Test Center offers custom and APR test procedures to cater to your various testing needs and material streams.
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className="mb-10 text-center"
						>
							<a
								href="#test-center-form"
								className="inline-flex items-center space-x-2 bg-vd-orange hover:bg-vd-orange-alt text-white px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl shadow-lg"
							>
								<span>Schedule Now</span>
								<span>→</span>
							</a>
						</motion.div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
							{/* Testing Protocols We Offer */}
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								className="bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 rounded-2xl p-8 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300"
							>
								<div className="flex items-center mb-6">
									<div className="w-1 h-8 bg-gradient-to-b from-vd-orange to-orange-400 rounded-full mr-4"></div>
									<h3 className="text-2xl md:text-3xl font-bold text-vd-blue">APR Testing Protocols We Offer</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">APR-SORT-S-01 NIR Sortation</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">APR-SORT-S-02 Size Sortation</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">APR-SORT-S-04 Color Sortation</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">APR-SORT-S-05 2D3D Sortation</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-orange rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">SORT-EE-01 SNAP Test</span>
									</li>
								</ul>
							</motion.div>

							{/* Additional Services */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								viewport={{ once: true }}
								className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 rounded-2xl p-8 border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300"
							>
								<div className="flex items-center mb-6">
									<div className="w-1 h-8 bg-gradient-to-b from-vd-blue to-blue-500 rounded-full mr-4"></div>
									<h3 className="text-2xl md:text-3xl font-bold text-vd-blue">Additional Services</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-blue rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">Full Day Test Center Rental</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-blue rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">Preparation Day</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-blue rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">Analyzer Auditing</span>
									</li>
									<li className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-vd-blue rounded-full mt-2 flex-shrink-0 shadow-md"></div>
										<span className="text-gray-700 text-base md:text-lg">Flake Testing</span>
									</li>
								</ul>
							</motion.div>
						</div>
					</div>
				</motion.section>

				{/* 6. Schedule Your Material Test Today & Contact Form Section */}
				<motion.section
					id="test-center-form"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="mb-20 md:mb-24 bg-gradient-to-br from-vd-blue via-vd-blue-dark to-vd-blue rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
				>
					<div className="absolute inset-0 bg-gradient-to-br from-vd-blue/90 to-vd-blue-dark/90"></div>
					<div className="absolute top-0 right-0 w-96 h-96 bg-vd-orange/10 rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-96 h-96 bg-vd-orange/5 rounded-full blur-3xl"></div>
					<div className="relative z-10 max-w-5xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
								Schedule Your Material Test Today
							</h2>
						</motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-white text-lg md:text-xl mb-10 text-center max-w-3xl mx-auto leading-relaxed drop-shadow-md"
						>
							Ready to test your materials? Fill out the form below and our team will get back to you to schedule your test.
						</motion.p>
						
						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							{formSubmitted ? (
							<div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
								<div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
									<Mail className="w-10 h-10 text-green-600" />
								</div>
								<h3 className="text-3xl font-bold text-vd-blue mb-3">Thank You!</h3>
								<p className="text-gray-600 text-lg">We've received your request and will contact you shortly.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 space-y-6 shadow-2xl">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
											Full Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="fullName"
											name="fullName"
											value={formData.fullName}
											onChange={handleInputChange}
											required
											className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all shadow-sm hover:shadow-md"
											placeholder="John Doe"
										/>
									</div>
									
									<div>
										<label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-2">
											Company Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="companyName"
											name="companyName"
											value={formData.companyName}
											onChange={handleInputChange}
											required
											className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all shadow-sm hover:shadow-md"
											placeholder="Your Company"
										/>
									</div>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
											Email Address <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all shadow-sm hover:shadow-md"
											placeholder="john@company.com"
										/>
									</div>
									
									<div>
										<label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
											Phone Number <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											required
											className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all shadow-sm hover:shadow-md"
											placeholder="+1 (555) 000-0000"
										/>
									</div>
								</div>
								
								<div>
									<label htmlFor="materialStreams" className="block text-sm font-bold text-gray-700 mb-2">
										Material Streams or Package Formats to Test <span className="text-red-500">*</span>
									</label>
									<textarea
										id="materialStreams"
										name="materialStreams"
										value={formData.materialStreams}
										onChange={handleInputChange}
										required
										rows={4}
										className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all resize-none shadow-sm hover:shadow-md"
										placeholder="Please describe the materials or package formats you would like to test..."
									/>
								</div>
								
								<div>
									<label htmlFor="desiredOutcomes" className="block text-sm font-bold text-gray-700 mb-2">
										Test Objectives & Desired Outcomes <span className="text-red-500">*</span>
									</label>
									<textarea
										id="desiredOutcomes"
										name="desiredOutcomes"
										value={formData.desiredOutcomes}
										onChange={handleInputChange}
										required
										rows={4}
										className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all resize-none shadow-sm hover:shadow-md"
										placeholder="Please describe your test objectives and the desired outcomes or goals you hope to achieve..."
									/>
								</div>
								
								<div className="pt-6">
									<button
										type="submit"
										className="w-full bg-gradient-to-r from-vd-orange to-orange-500 hover:from-orange-500 hover:to-vd-orange text-white px-8 py-4 rounded-xl font-bold transition-all text-lg flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform duration-300"
									>
										<Mail className="w-6 h-6" />
										<span>Submit Request</span>
									</button>
								</div>
							</form>
							)}
						</motion.div>
					</div>
				</motion.section>
			</div>
		</div>
	);
};

export default TestCenter;
