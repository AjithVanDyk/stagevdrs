import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import NavigationErrorBoundary from './components/NavigationErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CookieConsentBanner from './components/CookieConsentBanner';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useTranslation } from './hooks/useTranslation';
import { initializeImageLoading } from './utils/imageLoader';
import serviceWorkerManager from './utils/serviceWorker';
import { initializePerformanceMonitoring } from './utils/performanceMonitor';
import { accessibilityManager } from './utils/accessibility';
import { initSentry, SentryErrorBoundary } from './utils/sentry';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Home = React.lazy(() => import('./pages/Home'));
const Equipment = React.lazy(() => import('./pages/Equipment'));
const Solutions = React.lazy(() => import('./pages/Solutions'));
const ServicesSupport = React.lazy(() => import('./pages/ServicesSupport'));
const NewsMedia = React.lazy(() => import('./pages/NewsMedia'));
const Videos = React.lazy(() => import('./pages/Videos'));
const ExpertTips = React.lazy(() => import('./pages/ExpertTips'));
const OurCustomersInTheNews = React.lazy(() => import('./pages/OurCustomersInTheNews'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const About = React.lazy(() => import('./pages/About'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Support = React.lazy(() => import('./pages/Support'));
const PMI = React.lazy(() => import('./pages/PMI'));
const QuoteForm = React.lazy(() => import('./components/QuoteForm'));
const TestCenter = React.lazy(() => import('./pages/TestCenter'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));
const VanDykUniversity = React.lazy(() => import('./pages/VanDykUniversity'));
const PartsInStock = React.lazy(() => import('./pages/PartsInStock'));
const RemoteTroubleshooting = React.lazy(() => import('./pages/RemoteTroubleshooting'));
const Sitemap = React.lazy(() => import('./pages/Sitemap'));

// Individual Equipment Pages
const BollegraafPage = React.lazy(() => import('./pages/BollegraafPage'));
const TOMRAPage = React.lazy(() => import('./pages/TOMRAPage'));
const PellencSTPage = React.lazy(() => import('./pages/PellencSTPage'));
const SmiconDepackagerPage = React.lazy(() => import('./pages/SmiconDepackagerPage'));
const LuboScreeningPage = React.lazy(() => import('./pages/LuboScreeningPage'));
const WalairDensitySeparationPage = React.lazy(() => import('./pages/WalairDensitySeparationPage'));
const GuntherScreensPage = React.lazy(() => import('./pages/GuntherScreensPage'));
const CentriairOdorControlPage = React.lazy(() => import('./pages/CentriairOdorControlPage'));
const GreyparrotAIPage = React.lazy(() => import('./pages/GreyparrotAIPage'));
const DensimetricTablePage = React.lazy(() => import('./pages/DensimetricTablePage'));
const BeeFoamDustSuppressionPage = React.lazy(() => import('./pages/BeeFoamDustSuppressionPage'));
const ReckelbergEnvironmentalPage = React.lazy(() => import('./pages/ReckelbergEnvironmentalPage'));
const CertifiedPreOwnedPage = React.lazy(() => import('./pages/CertifiedPreOwnedPage'));
const GlassCleanupSystemsPage = React.lazy(() => import('./pages/GlassCleanupSystemsPage'));

// Individual Solution Pages
const SingleStreamRecyclingPage = React.lazy(() => import('./pages/SingleStreamRecyclingPage'));
const PlasticsRecyclingPage = React.lazy(() => import('./pages/PlasticsRecyclingPage'));
const OrganicsProcessingPage = React.lazy(() => import('./pages/OrganicsProcessingPage'));
const MSWProcessingPage = React.lazy(() => import('./pages/MSWProcessingPage'));
const WasteToEnergyPage = React.lazy(() => import('./pages/WasteToEnergyPage'));
const GlassCleanupPage = React.lazy(() => import('./pages/GlassCleanupPage'));
const ElectronicsWasteRecyclingPage = React.lazy(() => import('./pages/ElectronicsWasteRecyclingPage'));
const BatteryRecyclingSystemsPage = React.lazy(() => import('./pages/BatteryRecyclingSystemsPage'));
const CompostingDensimetricTablesPage = React.lazy(() => import('./pages/CompostingDensimetricTablesPage'));
const AIWasteAnalysisPage = React.lazy(() => import('./pages/AIWasteAnalysisPage'));
const CentriairOdorControlSolutionPage = React.lazy(() => import('./pages/CentriairOdorControlSolutionPage'));
const FoodWasteDepackagingPage = React.lazy(() => import('./pages/FoodWasteDepackagingPage'));
const CommercialWastePage = React.lazy(() => import('./pages/CommercialWastePage'));
const CDRecyclingPage = React.lazy(() => import('./pages/CDRecyclingPage'));
const MultiMRFSystemsPage = React.lazy(() => import('./pages/MultiMRFSystemsPage'));
const BollegraafBalersSolutionPage = React.lazy(() => import('./pages/BollegraafBalersSolutionPage'));

// Enhanced lazy loading with better error handling
const createLazyComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(() => 
    importFunc().catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load component:', error);
      }
      return {
        default: () => (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Loading...
              </h2>
              <p className="text-gray-600 mb-4">
                Please wait while we load the page.
              </p>
            </div>
          </div>
        )
      };
    })
  );
};

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-vd-blue mb-4">{t('notFound.title')}</h1>
        <p className="text-gray-600 mb-4">{t('notFound.message')}</p>
        <Link
          to="/"
          className="inline-block bg-vd-blue text-white py-2 px-4 rounded hover:bg-vd-blue-dark transition-colors duration-200"
        >
          {t('notFound.returnHome')}
        </Link>
      </div>
    </div>
  );
};

// Smooth scroll handler component
const SmoothScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change (except for hash changes)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    if (location.hash) {
      // Wait for the page to load and then scroll to the element
      const timer = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <NavigationErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-gray-600">Loading page...</div></div>}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
              duration: 0.5
            }}
            className="will-change-transform"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/support" element={<ServicesSupport />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/news-media" element={<NewsMedia />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/expert-tips" element={<ExpertTips />} />
              <Route path="/our-customers-in-the-news" element={<Navigate to="/news-media" replace />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/pmi" element={<PMI />} />
              <Route path="/quote" element={<QuoteForm />} />
              <Route path="/test-center" element={<TestCenter />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/van-dyk-university" element={<VanDykUniversity />} />
              <Route path="/parts-in-stock" element={<PartsInStock />} />
              <Route path="/remote-troubleshooting" element={<RemoteTroubleshooting />} />
              <Route path="/sitemap" element={<Sitemap />} />
              
              {/* Individual Equipment Pages */}
              <Route path="/equipment/bollegraaf" element={<BollegraafPage />} />
              <Route path="/equipment/tomra" element={<TOMRAPage />} />
              <Route path="/equipment/pellenc-st" element={<PellencSTPage />} />
              <Route path="/equipment/smicon-depackager" element={<SmiconDepackagerPage />} />
              <Route path="/equipment/lubo-screening" element={<LuboScreeningPage />} />
              <Route path="/equipment/walair-density-separation" element={<WalairDensitySeparationPage />} />
              <Route path="/equipment/gunther-screens" element={<GuntherScreensPage />} />
              <Route path="/equipment/centriair-odor-control" element={<CentriairOdorControlPage />} />
              <Route path="/equipment/greyparrot-ai" element={<GreyparrotAIPage />} />
              <Route path="/equipment/densimetric-table" element={<DensimetricTablePage />} />
              <Route path="/equipment/beefoam-dust-suppression" element={<BeeFoamDustSuppressionPage />} />
              <Route path="/equipment/reckelberg-environmental" element={<ReckelbergEnvironmentalPage />} />
              <Route path="/equipment/certified-pre-owned" element={<CertifiedPreOwnedPage />} />
              <Route path="/equipment/glass-cleanup-systems" element={<GlassCleanupSystemsPage />} />
              
              {/* Individual Solution Pages */}
              <Route path="/solutions/single-stream-recycling" element={<SingleStreamRecyclingPage />} />
              <Route path="/solutions/plastics-recycling" element={<PlasticsRecyclingPage />} />
              <Route path="/solutions/organics-processing" element={<OrganicsProcessingPage />} />
              <Route path="/solutions/msw-processing" element={<MSWProcessingPage />} />
              <Route path="/solutions/waste-to-energy" element={<WasteToEnergyPage />} />
              <Route path="/solutions/glass-cleanup" element={<GlassCleanupPage />} />
              <Route path="/solutions/electronics-waste-recycling" element={<ElectronicsWasteRecyclingPage />} />
              <Route path="/solutions/battery-recycling-systems" element={<BatteryRecyclingSystemsPage />} />
              <Route path="/solutions/composting-densimetric-tables" element={<CompostingDensimetricTablesPage />} />
              <Route path="/solutions/ai-waste-analysis" element={<AIWasteAnalysisPage />} />
              <Route path="/solutions/centriair-odor-control" element={<CentriairOdorControlSolutionPage />} />
              <Route path="/solutions/food-waste-depackaging" element={<FoodWasteDepackagingPage />} />
              <Route path="/solutions/commercial-waste" element={<CommercialWastePage />} />
              <Route path="/solutions/cd-recycling" element={<CDRecyclingPage />} />
              <Route path="/solutions/multi-mrf-systems" element={<MultiMRFSystemsPage />} />
              <Route path="/solutions/bollegraaf-balers" element={<BollegraafBalersSolutionPage />} />
              {/* Legacy route redirects */}
              <Route path="/services" element={<Navigate to="/support" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </NavigationErrorBoundary>
  );
};

function App() {
  useEffect(() => {
    // Initialize Sentry error monitoring
    initSentry();
    
    // Temporarily disable service worker to fix module loading issues
    // serviceWorkerManager.register();
    
    // Unregister any existing service workers to prevent caching issues
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    // Clear browser cache for translations on version change
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          // Clear all caches to ensure fresh translations
          caches.delete(name);
        });
      });
    }
    
    initializeImageLoading();
    initializePerformanceMonitoring();
    
    // Initialize accessibility features
    accessibilityManager.announceToScreenReader('Van Dyk Recycling Solutions website loaded');
    
    return () => {
      // serviceWorkerManager.unregister();
    };
  }, []);

  return (
    <SentryErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <ErrorBoundaryWrapper>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <div className="min-h-screen bg-white">
                <Navbar />
                <SmoothScrollHandler />
                <main role="main">
                  <AppRoutes />
                </main>
                <Footer />
                <Chatbot />
                <CookieConsentBanner />
                <SpeedInsights />
                <Analytics />
              </div>
            </Router>
          </ErrorBoundaryWrapper>
        </LanguageProvider>
      </HelmetProvider>
    </SentryErrorBoundary>
  );
}

// Wrapper component to provide language to ErrorBoundary
const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  return <ErrorBoundary language={language}>{children}</ErrorBoundary>;
};

export default App;
