import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Quote } from 'lucide-react';
import { Equipment } from '../data/equipmentData';

interface EquipmentModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: (equipment: Equipment) => void;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, isOpen, onClose, onGetQuote }) => {
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
            aria-labelledby="equipment-modal-title"
            aria-describedby="equipment-modal-description"
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
                  e.currentTarget.src = '/Images/image-1749759453479.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h2 id="equipment-modal-title" className="text-4xl font-bold text-white mb-2 leading-tight">{equipment.name}</h2>
                {equipment.description && (
                  <p id="equipment-modal-description" className="text-lg opacity-90">{equipment.description}</p>
                )}
              </div>
              <button
                onClick={onClose}
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
                      Key Features
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
                      Specifications
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
                    Applications
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
                    onClick={() => onGetQuote(equipment)}
                    className="flex-1 bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Quote className="w-5 h-5 mr-2" />
                    Get Quote
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Close
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

export default EquipmentModal;






