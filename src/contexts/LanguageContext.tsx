import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation version for cache busting - increment this when translations change
const TRANSLATION_VERSION = '2.0.1';
const TRANSLATION_VERSION_KEY = 'vdrs-translation-version';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if translation version has changed - clear cache if needed
    const savedVersion = localStorage.getItem(TRANSLATION_VERSION_KEY);
    if (savedVersion !== TRANSLATION_VERSION) {
      // Clear old language preference if version changed
      localStorage.removeItem('vdrs-language');
      localStorage.setItem(TRANSLATION_VERSION_KEY, TRANSLATION_VERSION);
    }
    
    // Get language from localStorage first
    const savedLanguage = localStorage.getItem('vdrs-language') as Language;
    if (savedLanguage && ['en', 'fr', 'es'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Detect language from browser location/navigator
    const detectLanguage = (): Language => {
      // Try to get language from navigator
      const browserLang = navigator.language || (navigator as any).userLanguage;
      const langCode = browserLang.split('-')[0].toLowerCase();
      
      // Map common language codes to our supported languages
      if (langCode === 'fr') return 'fr';
      if (langCode === 'es') return 'es';
      
      // Check browser languages array for better detection
      if (navigator.languages && navigator.languages.length > 0) {
        for (const lang of navigator.languages) {
          const code = lang.split('-')[0].toLowerCase();
          if (code === 'fr') return 'fr';
          if (code === 'es') return 'es';
        }
      }
      
      // Check if user is in a French-speaking region (Canada, France, etc.)
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const frenchTimezones = [
          'America/Montreal', 'America/Toronto', 'America/Quebec',
          'Europe/Paris', 'Europe/Brussels', 'Europe/Geneva',
          'Africa/Algiers', 'Africa/Casablanca', 'Indian/Reunion'
        ];
        const spanishTimezones = [
          'America/Mexico_City', 'America/Bogota', 'America/Buenos_Aires',
          'America/Santiago', 'America/Lima', 'America/Caracas',
          'America/Guayaquil', 'America/La_Paz', 'America/Montevideo',
          'Europe/Madrid', 'Atlantic/Canary', 'Africa/Ceuta'
        ];
        
        if (frenchTimezones.some(tz => timezone.includes(tz))) {
          // If in French-speaking region, check browser language
          if (browserLang.toLowerCase().includes('fr') || langCode === 'fr') {
            return 'fr';
          }
        }
        
        if (spanishTimezones.some(tz => timezone.includes(tz))) {
          // If in Spanish-speaking region, check browser language
          if (browserLang.toLowerCase().includes('es') || langCode === 'es') {
            return 'es';
          }
        }
      } catch (e) {
        // Fallback if timezone detection fails
      }
      
      // Default to English
      return 'en';
    };
    
    return detectLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vdrs-language', lang);
    // Force a re-render by updating document language immediately
    document.documentElement.lang = lang;
    // Trigger a custom event for components that need to react to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  useEffect(() => {
    // Update document language attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


