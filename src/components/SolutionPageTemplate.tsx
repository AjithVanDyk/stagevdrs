import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Quote, X, Play, ChevronLeft, ChevronRight, MapPin, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuoteForm from './QuoteForm';
import { useTranslation } from '../hooks/useTranslation';

interface ApplicationItem {
  name: string;
  link?: string;
}

interface EquipmentItem {
  name: string;
  link?: string;
}

interface SolutionPageProps {
  showCTA?: boolean;
  solution: {
    id: number;
    name: string;
    image: string;
    description: string;
    features: string[];
    specifications: { [key: string]: string };
    applications?: ApplicationItem[];
    equipment?: EquipmentItem[];
    benefits?: string[];
    gallery?: string[];
    videos?: string[];
    localVideos?: string[];
    testimonials?: Array<{
      name: string;
      company: string;
      quote: string;
      rating: number;
    }>;
  };
}

const SolutionPageTemplate: React.FC<SolutionPageProps> = ({ solution, showCTA = true }) => {
  const { t } = useTranslation();
  const [showQuoteForm, setShowQuoteForm] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);
  const [videoError, setVideoError] = React.useState<string | null>(null);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const replacePlaceholders = (text: string, replacements: { [key: string]: string }) => {
    let result = text;
    Object.keys(replacements).forEach(key => {
      result = result.replace(`{${key}}`, replacements[key]);
    });
    return result;
  };

  // Combine gallery images into slideshow array
  const galleryItems = solution.gallery || [];

  // Auto-advance slideshow
  useEffect(() => {
    if (autoPlay && galleryItems.length > 1) {
      const timer = setInterval(() => {
        setCurrentGallerySlide((prev) => (prev + 1) % galleryItems.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [autoPlay, galleryItems.length]);

  const goToNextSlide = () => {
    setCurrentGallerySlide((prev) => (prev + 1) % galleryItems.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToPrevSlide = () => {
    setCurrentGallerySlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentGallerySlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    // Handle youtu.be format: https://youtu.be/VIDEO_ID
    const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (youtuBeMatch) return youtuBeMatch[1];
    
    // Handle youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];
    
    // Handle youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch) return embedMatch[1];
    
    // Fallback: try to extract from URL path
    const pathMatch = url.split('/').pop()?.split('?')[0];
    if (pathMatch && pathMatch.length > 5) return pathMatch;
    
    return null;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 -mt-20 pt-20 overflow-hidden">
        {/* HD Background Image */}
        <img 
          src={solution.image}
          alt={solution.name}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          width="1920"
          height="1080"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            if (import.meta.env.DEV) {
              console.warn('Hero image failed to load, using fallback');
            }
            e.currentTarget.src = '/Images/mrf-systems.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vd-blue/40 via-vd-blue/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gray-600/50"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{solution.name}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {solution.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={solution.image}
                alt={solution.name}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-vd-blue/20"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
              {t('common.keyFeatures')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('common.keyFeaturesDesc').replace(/\{name\}/g, '').trim()}
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {solution.features.map((feature, index) => {
              // Check if this is the EPR Compliance feature (last feature)
              const isEPRFeature = index === solution.features.length - 1 && feature.includes('EPR Compliance');
              
              if (isEPRFeature) {
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-vd-blue/10 to-vd-orange/10 p-6 rounded-xl border-2 border-vd-orange hover:border-vd-blue cursor-pointer transition-all hover:shadow-xl col-span-full md:col-span-2 lg:col-span-3"
                    onClick={() => {
                      const eprSection = document.getElementById('epr-compliance-map');
                      if (eprSection) {
                        eprSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-6 h-6 text-vd-orange flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-gray-700 font-semibold mb-1">{feature}</p>
                        <p className="text-sm text-gray-600">Click to view interactive EPR Compliance Map</p>
                        <ArrowDown className="w-4 h-4 text-vd-orange mt-2" />
                      </div>
                    </div>
                  </motion.div>
                );
              }
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-vd-orange flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">{feature}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
              {t('common.technicalSpecifications')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {replacePlaceholders(t('common.technicalSpecificationsDesc'), { name: solution.name })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {Object.entries(solution.specifications).map(([key, value], index) => (
                  <div
                    key={index}
                    className={`p-6 border-b border-gray-200 ${
                      index % 2 === 0 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{key}</span>
                      <span className="text-vd-blue-dark font-bold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Case Section - Display as single line under Specs */}
      {solution.applications && solution.applications.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-vd-blue-dark mr-2">Use Case:</span>
                {solution.applications.map((application, index) => (
                  <React.Fragment key={index}>
                    {application.link ? (
                      <Link
                        to={application.link}
                        className="text-sm text-vd-blue hover:text-vd-orange transition-colors"
                      >
                        {application.name}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-700">{application.name}</span>
                    )}
                    {index < solution.applications.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Section - Slideshow */}
      {galleryItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                {t('common.gallery')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {replacePlaceholders(t('common.galleryDesc'), { name: solution.name })}
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGallerySlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="relative w-full h-[28rem] overflow-hidden">
                      <motion.img
                        src={galleryItems[currentGallerySlide]}
                        alt={`${solution.name} - ${t('common.image')} ${currentGallerySlide + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => {
                          e.currentTarget.src = '/Images/image-1749759453479.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-vd-blue/15"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {galleryItems.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-vd-blue rounded-full p-3 shadow-lg transition-colors"
                      aria-label={t('common.previousSlide')}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-vd-blue rounded-full p-3 shadow-lg transition-colors"
                      aria-label={t('common.nextSlide')}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {galleryItems.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {galleryItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentGallerySlide
                          ? 'w-10 bg-vd-orange'
                          : 'w-4 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`${t('common.goToSlide')} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {(solution.videos && solution.videos.length > 0) || (solution.localVideos && solution.localVideos.length > 0) ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                {replacePlaceholders(t('common.seeInAction'), { name: solution.name })}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {replacePlaceholders(t('common.seeInActionDesc'), { type: 'solution' })}
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* YouTube Videos */}
              {solution.videos && solution.videos.map((video, index) => (
                <motion.div
                  key={`youtube-${index}`}
                  variants={fadeInUp}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    {(() => {
                      const videoId = getYouTubeVideoId(video);
                      if (!videoId) {
                        return (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <Play className="w-16 h-16 text-gray-400" />
                          </div>
                        );
                      }
                      return (
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={`${solution.name} ${t('common.video')} ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to default thumbnail if hqdefault fails
                            const currentSrc = e.currentTarget.src;
                            if (currentSrc.includes('hqdefault')) {
                              e.currentTarget.src = currentSrc.replace('hqdefault', 'default');
                            } else {
                              // Ultimate fallback to a placeholder image
                              e.currentTarget.src = '/Images/image-1749759453479.png';
                            }
                          }}
                        />
                      );
                    })()}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-vd-blue-dark">
                    {solution.name} {t('common.demo')} {index + 1}
                  </h3>
                </motion.div>
              ))}

              {/* Local Videos */}
              {solution.localVideos && solution.localVideos.map((video, index) => (
                <motion.div
                  key={`local-${index}`}
                  variants={fadeInUp}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <video
                      src={video}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      muted
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-vd-blue-dark">
                    {solution.name} {t('common.demo')} {index + 1}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Equipment Section */}
      {solution.equipment && solution.equipment.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                {t('common.equipment')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('common.equipmentDesc')}
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {solution.equipment.map((equipment, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-vd-orange to-orange-600 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-white" />
                    {equipment.link ? (
                      <Link
                        to={equipment.link}
                        className="font-medium hover:text-gray-200 transition-colors"
                      >
                        {equipment.name}
                      </Link>
                    ) : (
                      <p className="font-medium">{equipment.name}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showCTA && (
      <section className="py-20 bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {replacePlaceholders(t('common.readyToGetStarted'), { name: solution.name })}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {replacePlaceholders(t('common.readyToGetStartedDesc'), { name: solution.name })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/quote"
                  className="bg-vd-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Quote className="w-5 h-5" />
                  <span>{t('common.getAQuote')}</span>
                </Link>
              </motion.div>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vd-blue px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>{t('common.contactUs')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedVideo(null);
              setVideoError(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
              setSelectedVideo(null);
              setVideoError(null);
            }}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full h-0 pb-[56.25%]">
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">{t('common.videoFailedToLoad')}</p>
                      <p className="text-sm text-gray-400 mb-4">{videoError}</p>
                      <button
                        onClick={() => {
                          setVideoError(null);
                          setSelectedVideo(null);
                        }}
                        className="px-4 py-2 bg-vd-orange hover:bg-orange-600 rounded-lg transition-colors"
                      >
                        {t('common.close')}
                      </button>
                    </div>
                  </div>
                ) : selectedVideo.startsWith('http') ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo)}
                    title={`${solution.name} Video`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => {
                      // Reset error state when iframe loads successfully
                      setVideoError(null);
                    }}
                  />
                ) : (
                  <video
                    src={selectedVideo}
                    controls
                    autoPlay
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    onError={() => {
                      setVideoError(t('common.unableToLoadVideo'));
                      if (import.meta.env.DEV) {
                        console.error('Local video failed to load:', selectedVideo);
                      }
                    }}
                    onLoadedData={() => {
                      // Reset error state when video loads successfully
                      setVideoError(null);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Form Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQuoteForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-vd-blue-dark">
                    {replacePlaceholders(t('common.getQuoteFor'), { name: solution.name })}
                  </h3>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="text-gray-500 hover:text-gray-700"
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
    </div>
  );
};

export default SolutionPageTemplate;
