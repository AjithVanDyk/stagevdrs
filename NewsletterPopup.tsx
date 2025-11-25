import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  isSubscribing: boolean;
  subscriptionSuccess: boolean;
  onSubscribe: () => void;
  onMaybeLater: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  isOpen,
  onClose,
  email,
  setEmail,
  emailError,
  isSubscribing,
  subscriptionSuccess,
  onSubscribe,
  onMaybeLater
}) => {
  if (!isOpen) return null;

  // Prevent body scroll when modal is open and ensure modal is visible
  useEffect(() => {
    if (isOpen) {
      // Scroll to top immediately
      window.scrollTo(0, 0);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            data-testid="modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
          />
          
          {/* Modal Card */}
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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close newsletter popup"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8">
                {subscriptionSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Subscribed!</h2>
                      <p className="text-gray-600 leading-relaxed">
                        Thank you for subscribing. You'll receive our latest updates and industry insights.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-full bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Icon */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-16 h-16 bg-gradient-to-br from-vd-blue to-vd-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                      >
                        <Mail className="w-8 h-8 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Never Miss an Update</h2>
                      <p className="text-gray-600 leading-relaxed">
                        Subscribe to get the latest recycling technology news and industry insights delivered to your inbox.
                      </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all outline-none text-gray-900 placeholder-gray-400"
                          autoComplete="email"
                        />
                        {emailError && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2"
                          >
                            {emailError}
                          </motion.p>
                        )}
                      </div>
                      <button
                        onClick={onSubscribe}
                        disabled={isSubscribing}
                        className="w-full bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
                      >
                        {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
                      </button>
                      <button
                        onClick={onMaybeLater}
                        className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium py-2"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;


