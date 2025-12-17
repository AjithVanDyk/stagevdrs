import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LoadingComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('common.loading')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('common.loadingMessage')}
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;









