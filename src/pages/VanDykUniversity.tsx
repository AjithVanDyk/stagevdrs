import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Users, Award, Clock, MapPin, 
  Calendar, CheckCircle, Star, ExternalLink,
  Wrench, Target, Globe, ChevronLeft, ChevronRight
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
      image: '/Images/Logos/Van%20Dyk%20University%20logo.png',
      title: t('vanDykUniversity.photo1Title'),
      description: t('vanDykUniversity.photo1Description')
    },
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
    }
  ];
  const [activeTab, setActiveTab] = useState('overview');
  const [trainingRequest, setTrainingRequest] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    className: 'Bollegraaf Baler',
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
  }, [autoPlay]);

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
      program: t('vanDykUniversity.program1Title'),
      date: 'March 18-20, 2024',
      location: 'Norwalk, CT',
      isOpen: false
    },
    {
      id: 2,
      program: t('vanDykUniversity.program2Title'),
      date: 'April 8-9, 2024',
      location: 'Norwalk, CT',
      isOpen: true
    },
    {
      id: 3,
      program: t('vanDykUniversity.program3Title'),
      date: 'April 22-24, 2024',
      location: 'Norwalk, CT',
      isOpen: true
    }
  ];
  const trainingClasses = [
    t('vanDykUniversity.program1Title'),
    t('vanDykUniversity.program2Title'),
    t('vanDykUniversity.program3Title')
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
      message: `Training request for ${trainingRequest.className}\nNotes: ${trainingRequest.notes || 'N/A'}`,
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
        email: '',
        phone: '',
        className: trainingRequest.className,
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

  const scrollToRequestForm = (className: string) => {
    setTrainingRequest((prev) => ({ ...prev, className }));
    document.getElementById('training-request-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      quote: "Todd presented the information in an easy to understand format and was very thorough in his explanations. The small class size gave us the ability to dive deep into technical details of classifier builds, geometry, and sensors.",
      author: "Kevin Hanner",
      company: "Smurfit Westrock",
      rating: 5,
      program: "TOMRA Training School - October 2025"
    },
    {
      quote: "Todd is very knowledgeable and gave very good information. The troubleshooting tasks were very helpful and helped me broaden my optical knowledge. Todd & Victoria are very professional.",
      author: "Ronak Pored",
      company: "GFL",
      rating: 5,
      program: "TOMRA Training School - October 2025"
    },
    {
      quote: "The class was very good. Learned a lot. The instructor was very good. 10/10. Van Dyk is very friendly and the training was super exciting.",
      author: "Abdul Kabah Rahini",
      company: "GFL",
      rating: 5,
      program: "TOMRA Training School - October 2025"
    },
    {
      quote: "OUTSTANDING. Well versed and personable. Much more in-depth than other training programs. Very beneficial for knowledgeable maintenance staff which is key to efficient operations.",
      author: "An Kruan",
      company: "WM Germantown",
      rating: 5,
      program: "TOMRA Training School - October 2025"
    },
    {
      quote: "The instructor's knowledge was superior and his ability to relate it to most techs' knowledge level was outstanding. This was my first training on balers and I can't imagine a better structured course.",
      author: "Brian Cuth",
      company: "Salem Recycle Center",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Excellent training program. Very helpful and you will learn a lot. The electrical and hydraulic hands-on training was most beneficial.",
      author: "Vicente Blanco",
      company: "Dence.co",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Both hydraulic and electrical troubleshooting were beneficial. Extremely in-depth and valuable training. Everybody was extremely knowledgeable.",
      author: "Kyle Barela",
      company: "Denver",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Very knowledgeable and detailed in explanation of all subject matter. The training was very meticulous. More hands-on than other training I have attended.",
      author: "L.J. Fetters",
      company: "Nashville",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "EXCELLENT training program. Good theory and practical was more fun. You have an excellent environment for learning.",
      author: "Ismael Zonniga",
      company: "Community Waste Disposal, Dallas",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Wim did a great job. He presented the material in a very professional manner. Everything was above average. Very helpful training.",
      author: "Erik Bu",
      company: "Van Dyk",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Information is very broken down and understandable. Direct, hands-on approach. Better understanding of the machine through thorough training.",
      author: "Mij Van Dyk",
      company: "Van Dyk",
      rating: 5,
      program: "VDRS Baler Training School - October 2025"
    },
    {
      quote: "Wim is extremely knowledgeable and a great teacher. 10/10. The hydraulic troubleshooting was the most helpful. Extremely in-depth training.",
      author: "Josh Turner",
      company: "Salem, OR",
      rating: 5,
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
          className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-vd-orange rounded-full mb-6"
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('vanDykUniversity.pageTitle')}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {t('vanDykUniversity.pageSubtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {t('vanDykUniversity.industryRecognizedCertifications')}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {t('vanDykUniversity.expertInstructors')}
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {t('vanDykUniversity.globalTrainingNetwork')}
                </div>
              </div>
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
                    {t('vanDykUniversity.whyChooseDescription')}
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
                        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={trainingSchoolPhotos[currentSlide].image}
                            alt={`Van Dyk Training School - ${trainingSchoolPhotos[currentSlide].title}`}
                            className="w-full h-full object-contain"
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
                        src="/Images/Training%20School/FullSizeRender.jpg"
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

              <div className="grid lg:grid-cols-2 gap-8">
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

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-1">{t('vanDykUniversity.certification')}:</h4>
                        <p className="text-sm text-gray-600">{program.certification}</p>
                      </div>

                      <button className="w-full bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Schedule
                      </button>
                    </div>
                  </motion.div>
                ))}
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
                  {t('vanDykUniversity.upcomingTrainingSessionsTitle')}
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
                          onClick={() => scrollToRequestForm(session.program)}
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
                    Complete the form below to request a seat. Requests are routed directly to <span className="font-semibold">training@vdrs.com</span> (monitored by Victoria).
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
                    <div className="grid md:grid-cols-2 gap-6">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('vanDykUniversity.formAdditionalNotes')}</label>
                        <input
                          type="text"
                          value={trainingRequest.notes}
                          onChange={(e) => setTrainingRequest((prev) => ({ ...prev, notes: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-vd-orange focus:ring-2 focus:ring-vd-orange/30"
                          placeholder={t('vanDykUniversity.formPlaceholderNotes')}
                        />
                      </div>
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

              <div className="mt-12 text-center">
                <div className="bg-vd-blue text-white rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">{t('vanDykUniversity.customTrainingProgramsTitle')}</h3>
                  <p className="text-gray-200 mb-6">
                    {t('vanDykUniversity.customTrainingProgramsDescription')}
                  </p>
                  <button className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('vanDykUniversity.requestCustomTraining')}
                  </button>
                </div>
              </div>
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
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-vd-blue-dark">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.company}
                      </div>
                      <div className="text-xs text-vd-orange font-medium mt-1">
                        {testimonial.program}
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
