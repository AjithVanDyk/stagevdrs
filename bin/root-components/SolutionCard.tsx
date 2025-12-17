import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import LazyImage from './LazyImage';
import { Solution } from '../data/solutionsData';
import { useTranslation } from '../hooks/useTranslation';

interface SolutionCardProps {
  solution: Solution;
  onLearnMore: (solution: Solution) => void;
  onGetQuote: (solution: Solution) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onLearnMore, onGetQuote }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={solution.image}
          alt={solution.title}
          className="group-hover:scale-105 transition-transform duration-300"
          width={400}
          height={192}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors">
          {solution.title}
        </h3>
        
        {solution.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {solution.description}
          </p>
        )}
        
        {solution.features && solution.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('common.keyFeatures')}:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {solution.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-vd-orange mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
              {solution.features.length > 3 && (
                <li className="text-vd-orange font-medium">
                  +{solution.features.length - 3} {t('common.moreFeatures')}
                </li>
              )}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            onClick={() => onLearnMore(solution)}
            className="flex-1 bg-vd-blue hover:bg-vd-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {t('common.learnMore')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button
            onClick={() => onGetQuote(solution)}
            className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
