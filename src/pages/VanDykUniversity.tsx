import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Users, Award, Clock, MapPin, 
  Calendar, CheckCircle, Star,
  Wrench, Target, Globe, ChevronLeft, ChevronRight, Quote
} from 'lucide-react';
import SEO from '../components/SEO';
import { SEOData } from '../utils/seo';
import { submitContactForm } from '../utils/formSubmission';
import { useTranslation } from '../hooks/useTranslation';

const VanDykUniversity = () => {
  const { t } = useTranslation();

  // Training School photos - moved inside component to use translations
  const trainingSchoolPhotos = [
    {
      image: '/Images/Training School/FullSizeRender%5B1%5D.jpg',
      title: t('vanDykUniversity.photo2Title'),
      description: t('vanDykUniversity.photo2Description')
    },
    {
      image: '/Images/Training School/FullSizeRender%5B2%5D.jpg',
      title: t('vanDykUniversity.photo3Title'),
      description: t('vanDykUniversity.photo3Description')
    },
    {
      image: '/Images/Training School/FullSizeRender%5B3%5D.jpg',
      title: t('vanDykUniversity.photo4Title'),
      description: t('vanDykUniversity.photo4Description')
    },
    {
      image: '/Images/Training School/DSC01521.JPG',
      title: t('vanDykUniversity.trainingFacilityTitle'),
      description: t('vanDykUniversity.trainingFacilityDescription')
    },
    {
      image: '/Images/Training School/DSC01545.JPG',
      title: t('vanDykUniversity.trainingFacilityTitle'),
      description: t('vanDykUniversity.trainingFacilityDescription')
    },
    {
      image: '/Images/Training School/DSC01567.JPG',
      title: t('vanDykUniversity.trainingFacilityTitle'),
      description: t('vanDykUniversity.trainingFacilityDescription')
    },
    {
      image: '/Images/Training School/DSC01570.JPG',
      title: t('vanDykUniversity.trainingFacilityTitle'),
      description: t('vanDykUniversity.trainingFacilityDescription')
    }
  ];
  const [activeTab, setActiveTab] = useState('overview');
  const [trainingRequest, setTrainingRequest] = useState({
    name: '',
    company: '',
    plantLocation: '',
    email: '',
    phone: '',
    className: 'Baler School',
    selectedDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play slideshow
  useEffect(() => {
    if (autoPlay && trainingSchoolPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % trainingSchoolPhotos.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [autoPlay, trainingSchoolPhotos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trainingSchoolPhotos.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trainingSchoolPhotos.length) % trainingSchoolPhotos.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const seoData: SEOData = {
    title: 'Van Dyk University - Professional Recycling Equipment Training',
    description: 'Comprehensive training programs for recycling equipment operation, maintenance, and optimization. Bollegraaf baler training, TOMRA optical sorting, and advanced recycling technology courses.',
    keywords: 'recycling training, equipment training, Bollegraaf training, TOMRA training, recycling education, professional development, recycling certification, classroom training',
    url: '/van-dyk-university',
    type: 'website'
  };

  const trainingPrograms = [
    {
      id: 'bollegraaf-training',
      title: t('vanDykUniversity.program1Title'),
      duration: t('vanDykUniversity.program1Duration'),
      level: t('vanDykUniversity.program1Level'),
      description: t('vanDykUniversity.program1Description'),
      topics: [
        t('vanDykUniversity.program1Topic1'),
        t('vanDykUniversity.program1Topic2'),
        t('vanDykUniversity.program1Topic3'),
        t('vanDykUniversity.program1Topic4'),
        t('vanDykUniversity.program1Topic5')
      ],
      prerequisites: t('vanDykUniversity.program1Prerequisites'),
      certification: t('vanDykUniversity.program1Certification')
    },
    {
      id: 'tomra-training',
      title: t('vanDykUniversity.program2Title'),
      duration: t('vanDykUniversity.program2Duration'),
      level: t('vanDykUniversity.program2Level'),
      description: t('vanDykUniversity.program2Description'),
      topics: [
        t('vanDykUniversity.program2Topic1'),
        t('vanDykUniversity.program2Topic2'),
        t('vanDykUniversity.program2Topic3'),
        t('vanDykUniversity.program2Topic4'),
        t('vanDykUniversity.program2Topic5')
      ],
      prerequisites: t('vanDykUniversity.program2Prerequisites'),
      certification: t('vanDykUniversity.program2Certification')
    },
    {
      id: 'pellenc-training',
      title: t('vanDykUniversity.program3Title'),
      duration: t('vanDykUniversity.program3Duration'),
      level: t('vanDykUniversity.program3Level'),
      description: t('vanDykUniversity.program3Description'),
      topics: [
        t('vanDykUniversity.program3Topic1'),
        t('vanDykUniversity.program3Topic2'),
        t('vanDykUniversity.program3Topic3'),
        t('vanDykUniversity.program3Topic4'),
        t('vanDykUniversity.program3Topic5')
      ],
      prerequisites: t('vanDykUniversity.program3Prerequisites'),
      certification: t('vanDykUniversity.program3Certification')
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      program: 'Baler School',
      date: 'March 9th – 13th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 2,
      program: 'Tomra School',
      date: 'March 23rd – 27th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 3,
      program: 'Baler School',
      date: 'April 6th – 10th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 4,
      program: 'Tomra School',
      date: 'April 20th – 24th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 5,
      program: 'Tomra School',
      date: 'May 4th – 8th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 6,
      program: 'Baler School',
      date: 'May 18th – 22nd, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 7,
      program: 'Tomra School',
      date: 'June 8th – 12th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 8,
      program: 'Baler School',
      date: 'June 22nd – 26th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 9,
      program: 'Tomra School',
      date: 'July 13th – 17th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 10,
      program: 'Baler School',
      date: 'July 20th – 24th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 11,
      program: 'Tomra School',
      date: 'August 10th – 14th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 12,
      program: 'Baler School',
      date: 'August 17th – 21st, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 13,
      program: 'Tomra School',
      date: 'September 7th – 11th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 14,
      program: 'Baler School',
      date: 'September 14th – 18th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 15,
      program: 'Tomra School',
      date: 'October 5th – 9th, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 16,
      program: 'Baler School',
      date: 'October 19th – 23rd, 2026',
      location: 'Norwalk, CT',
      isOpen: true
    }
  ];
  const trainingClasses = [
    'Baler School',
    'Tomra School',
    'Pellenc School',
    'Custom Training'
  ];

  const handleTrainingRequestSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    const result = await submitContactForm({
      name: trainingRequest.name,
      company: trainingRequest.company,
      email: trainingRequest.email,
      phone: trainingRequest.phone,
      message: `Training request for ${trainingRequest.className}\nSelected Date: ${trainingRequest.selectedDate || 'N/A'}\nCompany: ${trainingRequest.company}\nPlant Location: ${trainingRequest.plantLocation || 'N/A'}\nMachine Information: ${trainingRequest.notes || 'N/A'}`,
      applicationType: 'training_request'
    });

    if (result.success) {
      setFormStatus({
        type: 'success',
        message: t('vanDykUniversity.formSuccess')
      });
      setTrainingRequest({
        name: '',
        company: '',
        plantLocation: '',
        email: '',
        phone: '',
        className: 'Baler School',
        selectedDate: '',
        notes: ''
      });
    } else {
      setFormStatus({
        type: 'error',
        message: result.message || t('vanDykUniversity.formError')
      });
    }

    setIsSubmitting(false);
  };

  const scrollToRequestForm = (className: string, date?: string) => {
    setTrainingRequest((prev) => ({ 
      ...prev, 
      className,
      ...(date && { selectedDate: date })
    }));
    document.getElementById('training-request-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "John Doe",
      company: "Company Name",
      program: "Training Program"
    },
    {
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Jane Smith",
      company: "Business Solutions",
      program: "Training Program"
    },
    {
      quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Robert Johnson",
      company: "Industry Partners",
      program: "Training Program"
    },
    {
      quote: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "Maria Garcia",
      company: "Enterprise Group",
      program: "Training Program"
    },
    {
      quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      author: "David Wilson",
      company: "Corporate Services",
      program: "Training Program"
    },
    {
      quote: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      author: "Sarah Brown",
      company: "Professional Solutions",
      program: "Training Program"
    },
    {
      quote: "Very knowledgeable and detailed in explanation of all subject matter. The training was very meticulous. More hands-on than other training I have attended.",
      author: "L.J. F.",
      company: "Nashville",
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "EXCELLENT training program. Good theory and practical was more fun. You have an excellent environment for learning.",
      author: "Ismael Z.",
      company: "Community Waste Disposal, Dallas",
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Wim is extremely knowledgeable and a great teacher. 10/10. The hydraulic troubleshooting was the most helpful. Extremely in-depth training.",
      author: "Josh T.",
      company: "Salem, OR",
      program: "VDRS Baler Training School - October 2025"
    }
  ];

  return (
    <>
      <SEO data={seoData} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white py-20 overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/Images/Training School/header.JPG"
              alt="Van Dyk University Header"
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/Images/Van Dyk University.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
          
          {/* Header Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <img
                  src="/Images/van-dyk-university-logo.png"
                  alt="Van Dyk University Logo"
                  className="h-24 md:h-32 w-auto"
                  style={{ mixBlendMode: 'screen', filter: 'brightness(1.2)' }}
                  loading="eager"
                />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('vanDykUniversity.pageTitle')}
              </h1>
              <p className="text-xl text-gray-200 mb-2">
                {t('vanDykUniversity.pageSubtitle')}
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Professional Training Programs for Recycling Equipment Excellence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center py-4">
              <span className="uppercase text-xs font-semibold tracking-widest text-vd-blue mb-3">
                Explore
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                { id: 'overview', label: t('vanDykUniversity.overview'), icon: BookOpen },
                { id: 'programs', label: t('vanDykUniversity.trainingPrograms'), icon: GraduationCap },
                { id: 'schedule', label: t('vanDykUniversity.upcomingSessions'), icon: Calendar },
                { id: 'testimonials', label: t('vanDykUniversity.successStories'), icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 text-sm font-semibold rounded-full border transition-all duration-200 shadow-sm ${
                    activeTab === tab.id
                      ? 'bg-vd-orange text-white border-vd-orange shadow-lg'
                      : 'bg-white text-gray-500 border-gray-200 hover:text-vd-orange hover:border-vd-orange/40'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          {activeTab === 'overview' && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="max-w-6xl mx-auto"
            >
              {/* Why Choose Van Dyk University */}
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                    {t('vanDykUniversity.whyChooseTitle')}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Van Dyk University provides focused classroom and hands-on training that builds practical skills for operating, troubleshooting, and maintaining equipment. Participants learn directly from Van Dyk specialists, strengthening their ability to work efficiently and communicate effectively during remote support.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Award,
                      title: t('vanDykUniversity.industryCertificationsTitle'),
                      description: t('vanDykUniversity.industryCertificationsDescription')
                    },
                    {
                      icon: Users,
                      title: t('vanDykUniversity.expertInstructorsTitle'),
                      description: t('vanDykUniversity.expertInstructorsDescription')
                    },
                    {
                      icon: Wrench,
                      title: t('vanDykUniversity.handsOnTrainingTitle'),
                      description: t('vanDykUniversity.handsOnTrainingDescription')
                    },
                    {
                      icon: Globe,
                      title: t('vanDykUniversity.globalNetworkTitle'),
                      description: t('vanDykUniversity.globalNetworkDescription')
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
                        <feature.icon className="w-6 h-6 text-vd-orange" />
                      </div>
                      <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Training School Photo Slideshow */}
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                    {t('vanDykUniversity.experienceTrainingSchoolTitle')}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('vanDykUniversity.experienceTrainingSchoolDescription')}
                  </p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="relative"
                      >
                        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-black flex items-center justify-center">
                          <img
                            src={trainingSchoolPhotos[currentSlide].image}
                            alt={`Van Dyk Training School - ${trainingSchoolPhotos[currentSlide].title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/Images/image-1749759453479.png';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                {trainingSchoolPhotos[currentSlide].title}
                              </h3>
                              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                                {trainingSchoolPhotos[currentSlide].description}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {trainingSchoolPhotos.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-vd-blue rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-vd-blue rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Dot Indicators */}
                  {trainingSchoolPhotos.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {trainingSchoolPhotos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? 'w-8 bg-vd-orange'
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Training Facility */}
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                        State-of-the-Art Training Facility
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Our Norwalk, CT facility features the latest recycling equipment and technology, providing an ideal environment for hands-on learning and practical experience.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Full-Scale Equipment</h4>
                            <p className="text-sm text-gray-600">Train on actual production equipment</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Modern Classroom</h4>
                            <p className="text-sm text-gray-600">Interactive learning environment with latest technology</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Safety First</h4>
                            <p className="text-sm text-gray-600">Comprehensive safety training and protocols</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src="/Images/Training School/rebuildshop.JPG"
                        alt="Van Dyk Training Facility"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/Images/image-1749759453479.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}

          {activeTab === 'programs' && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                  {t('vanDykUniversity.trainingPrograms')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('vanDykUniversity.trainingProgramsDescription')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {trainingPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-vd-blue-dark mb-2">
                            {program.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {program.duration}
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              {program.level}
                            </div>
                          </div>
                        </div>
                        <div className="bg-vd-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                          {program.certification.split(' ')[0]}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {program.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{t('vanDykUniversity.topics')}:</h4>
                        <ul className="space-y-1">
                          {program.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{t('vanDykUniversity.prerequisites')}:</h4>
                        <p className="text-sm text-gray-600">{program.prerequisites}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('vanDykUniversity.certification')}:</h4>
                        <p className="text-sm text-gray-600">{program.certification}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {t('vanDykUniversity.formRequestSeat')}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                  2026 Training School Schedule
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('vanDykUniversity.upcomingTrainingSessionsDescription')}
                </p>
              </div>

              <div className="space-y-6">
                {upcomingSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-vd-blue-dark mb-1">
                          {session.program}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {session.date}
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {session.location}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className={`text-sm font-semibold ${session.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                          {session.isOpen ? t('vanDykUniversity.open') : t('vanDykUniversity.closed')}
                        </div>
                        <button
                          className="bg-vd-orange hover:bg-vd-orange-alt text-white px-4 py-2 rounded transition-colors"
                          onClick={() => scrollToRequestForm(session.program, `${session.program} - ${session.date}`)}
                        >
                          {t('vanDykUniversity.formRequestSeat')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <section
                id="training-request-form"
                className="mt-12"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-vd-blue-dark mb-4">{t('vanDykUniversity.requestSeatTitle')}</h3>
                  <p className="text-gray-600 mb-6">
                    Complete the form below to request a seat.
                  </p>
                  {formStatus && (
                    <div
                      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                        formStatus.type === 'success'
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {formStatus.message}
                    </div>
                  )}
                  <form onSubmit={handleTrainingRequestSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formFirstName')}</label>
                        <input
                          type="text"
                          value={trainingRequest.name}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formCompany')}</label>
                        <input
                          type="text"
                          value={trainingRequest.company}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, company: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Plant Location</label>
                        <input
                          type="text"
                          value={trainingRequest.plantLocation}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, plantLocation: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          placeholder="Enter plant location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Training Date</label>
                        <select
                          value={trainingRequest.selectedDate}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, selectedDate: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          required
                        >
                          <option value="">Select a date</option>
                          {upcomingSessions.map((session) => (
                            <option key={session.id} value={`${session.program} - ${session.date}`}>
                              {session.program} - {session.date}
                            </option>
                          ))}
                          <option value="Custom">Custom</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formEmail')}</label>
                        <input
                          type="email"
                          value={trainingRequest.email}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formPhone')}</label>
                        <input
                          type="tel"
                          value={trainingRequest.phone}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formTrainingClass')}</label>
                      <select
                        value={trainingRequest.className}
                        onChange={(e) => setTrainingRequest((prev) => ({ ...prev, className: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                      >
                        {trainingClasses.map((trainingClass) => (
                          <option key={trainingClass} value={trainingClass}>
                            {trainingClass}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes - Specific Machine Information</label>
                      <textarea
                        value={trainingRequest.notes}
                        onChange={(e) => setTrainingRequest((prev) => ({ ...prev, notes: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                        placeholder="Please specify the specific machine(s) you have so the trainer can customize the class to your equipment (e.g., model numbers, configurations, etc.)"
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('vanDykUniversity.formSending') : t('vanDykUniversity.formRequestSeat')}
                    </button>
                  </form>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                  {t('vanDykUniversity.successStories')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Hear from professionals who have advanced their careers through Van Dyk University training programs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-vd-blue/10 to-vd-orange/10 rounded-bl-full"></div>
                    <div className="relative">
                      <div className="flex items-start mb-4">
                        <div className="bg-gradient-to-br from-vd-blue to-vd-blue-dark rounded-full p-3 mr-4 flex-shrink-0">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <blockquote className="text-gray-700 mb-4 italic text-base" style={{ lineHeight: '1.25' }}>
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div className="font-semibold text-vd-blue-dark">
                            {testimonial.author}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.company}
                        </div>
                        <div className="text-xs text-vd-orange font-medium mt-1">
                          {testimonial.program}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default VanDykUniversity;
