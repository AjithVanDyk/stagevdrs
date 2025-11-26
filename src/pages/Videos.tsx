import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Clock, Eye, X } from 'lucide-react';
import { animationConfig } from '../utils/animations';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import { useTranslation } from '../hooks/useTranslation';

interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  featured?: boolean;
  trending?: boolean;
}

const getEmbeddedUrl = (url: string) => {
  try {
    const normalized = url.replace('youtu.be/', 'www.youtube.com/watch?v=');
    const parsed = new URL(normalized);
    const videoId = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1` : url;
  } catch {
    return url;
  }
};

const Videos = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const fadeInUp = animationConfig.fadeInUp;

  const videos: Video[] = [
    {
      id: 1,
      title: t('videos.video1Title'),
      description: t('videos.video1Description'),
      category: t('videos.categorySingleStream'),
      date: '2024-12-20',
      duration: '3:45',
      thumbnail: '/Images/single-stream-recycling.jpg',
      videoUrl: 'https://youtu.be/Qerp8XcGDw0',
      views: '15.2k',
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: t('videos.video2Title'),
      description: t('videos.video2Description'),
      category: t('videos.categoryEquipment'),
      date: '2024-12-18',
      duration: '4:20',
      thumbnail: '/Images/bollegraaf-products.jpg',
      videoUrl: 'https://youtu.be/zqbJbMABi-A',
      views: '12.8k',
      featured: true
    },
    {
      id: 3,
      title: t('videos.video3Title'),
      description: t('videos.video3Description'),
      category: t('videos.categoryEScrap'),
      date: '2024-12-15',
      duration: '5:30',
      thumbnail: '/Images/tomra-optical-sorting.jpg',
      videoUrl: 'https://youtu.be/OSOB0JfqPTY',
      views: '18.5k',
      trending: true
    },
    {
      id: 4,
      title: t('videos.video4Title'),
      description: t('videos.video4Description'),
      category: t('videos.categoryFoodWaste'),
      date: '2024-12-12',
      duration: '2:45',
      thumbnail: '/Images/smicon-depackager.jpg',
      videoUrl: 'https://youtu.be/ircipzTwJRM',
      views: '9.7k'
    },
    {
      id: 5,
      title: t('videos.video5Title'),
      description: t('videos.video5Description'),
      category: t('videos.categorySingleStream'),
      date: '2024-12-10',
      duration: '8:15',
      thumbnail: '/Images/mrf-systems.jpg',
      videoUrl: 'https://youtu.be/M5nmNKVNCBw',
      views: '22.1k',
      featured: true
    },
    {
      id: 6,
      title: t('videos.video6Title'),
      description: t('videos.video6Description'),
      category: t('videos.categoryCD'),
      date: '2024-12-08',
      duration: '6:20',
      thumbnail: '/Images/cd-recycling.jpg',
      videoUrl: 'https://youtu.be/MOjFp3y7mEw',
      views: '11.3k'
    },
    {
      id: 7,
      title: t('videos.video7Title'),
      description: t('videos.video7Description'),
      category: t('videos.categoryEScrap'),
      date: '2024-12-05',
      duration: '4:50',
      thumbnail: '/Images/greyparrot-ai-recognition.jpg',
      videoUrl: 'https://youtu.be/B_VmEcZBy6M',
      views: '16.9k',
      trending: true
    },
    {
      id: 8,
      title: t('videos.video8Title'),
      description: t('videos.video8Description'),
      category: t('videos.categoryComposting'),
      date: '2024-12-03',
      duration: '3:30',
      thumbnail: '/Images/densimetric-table-new.jpg',
      videoUrl: 'https://youtu.be/5VvtScst8yI',
      views: '7.8k'
    },
    {
      id: 9,
      title: t('videos.video9Title'),
      description: t('videos.video9Description'),
      category: t('videos.categoryPlastics'),
      date: '2024-12-01',
      duration: '5:15',
      thumbnail: '/Images/plastics-recycling.jpg',
      videoUrl: 'https://youtu.be/8Xj4Zwv81uE',
      views: '13.4k'
    },
    {
      id: 10,
      title: t('videos.video10Title'),
      description: t('videos.video10Description'),
      category: t('videos.categoryMSW'),
      date: '2024-11-28',
      duration: '4:05',
      thumbnail: '/Images/msw-processing.jpg',
      videoUrl: 'https://youtu.be/lTQ4xEe7WOg',
      views: '10.6k'
    }
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Sort videos by date (most recent first)
  const sortedVideos = [...videos].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const filteredVideos = sortedVideos;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={IMAGE_ASSIGNMENTS.newsMedia.hero}
            alt="Videos"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (import.meta.env.DEV) {
                console.log('Hero image failed to load, using fallback');
              }
              e.currentTarget.src = '/Images/first.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vd-blue-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                duration: 0.6
              }}
              className="max-w-3xl w-full"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t('videos.pageTitle')}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('videos.pageDescription')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Feed */}
      <div className="container mx-auto px-4 py-8">
        {/* Videos Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vd-blue mb-6">Videos</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => {
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                      duration: 0.6
                    }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        width="400"
                        height="192"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/Images/first.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
                        <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-vd-orange ml-1" />
                        </div>
                      </div>
                      {video.trending && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Trending
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(video.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {video.duration}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.views}
                        </span>
                      </div>
                      <h3 className="font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors text-xl">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                          {video.category}
                        </span>
                        <Play className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
            })}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
              <p className="text-gray-500">Please check back soon for more content.</p>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
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
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover opacity-80"
                  width="800"
                  height="256"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/first.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h2 className="text-4xl font-bold text-white mb-2 leading-tight">{selectedVideo.title}</h2>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-black/30 rounded-full p-2"
                  aria-label="Close video modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-vd-orange scrollbar-track-gray-100 max-h-[calc(90vh-16rem)]">
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <span>{selectedVideo.category}</span>
                  <span>•</span>
                  <span>{formatDate(selectedVideo.date)}</span>
                  <span>•</span>
                  <span>{selectedVideo.duration}</span>
                  <span>•</span>
                  <span>{selectedVideo.views} {t('videos.views')}</span>
                </div>
                <div className="space-y-5">
                  <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-xl">
                    <iframe
                      src={getEmbeddedUrl(selectedVideo.videoUrl)}
                      title={selectedVideo.title}
                      className="absolute inset-0 w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {selectedVideo.description}
                  </p>
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-vd-orange hover:text-vd-blue font-semibold transition-colors"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {t('videos.openOnYouTube')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Videos;







