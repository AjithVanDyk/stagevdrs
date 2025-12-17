/**
 * @fileoverview Language-aware routing components for multi-language support.
 * Syncs URL language parameter with LanguageContext and handles automatic redirects.
 * @author Van Dyk Recycling Solutions
 * @module components/LanguageRoute
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * LanguageRoute component props.
 * 
 * @interface LanguageRouteProps
 * @property {React.ReactNode} children - Child components to render
 */
interface LanguageRouteProps {
  children: React.ReactNode;
}

/**
 * LanguageRoute component that extracts language from URL and syncs with LanguageContext.
 * Automatically updates the language context when the URL language parameter changes.
 * 
 * @param {LanguageRouteProps} props - Component props
 * @returns {JSX.Element} Child components wrapped with language sync
 * 
 * @example
 * ```tsx
 * <Route path="/:lang/*" element={
 *   <LanguageRoute>
 *     <AppContent />
 *   </LanguageRoute>
 * } />
 * ```
 */
const LanguageRoute: React.FC<LanguageRouteProps> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // If language is in URL, sync it with context
    if (lang && ['en', 'fr', 'es'].includes(lang)) {
      if (language !== lang) {
        setLanguage(lang as 'en' | 'fr' | 'es');
      }
    }
  }, [lang, language, setLanguage]);

  return <>{children}</>;
};

/**
 * Redirects routes without language prefix to language-prefixed version.
 * Automatically adds language prefix to routes that don't have one.
 * Excludes assets, API routes, and static files from redirection.
 * 
 * @returns {null} Renders nothing, only handles redirects
 * 
 * @example
 * ```tsx
 * // In App.tsx or router setup
 * <LanguageRedirect />
 * <Routes>
 *   {/* Routes */}
 * </Routes>
 * ```
 * 
 * @remarks
 * - Redirects `/equipment` → `/en/equipment` (if current language is 'en')
 * - Does not redirect `/Images/logo.png` or `/api/contact`
 * - Uses replace navigation to avoid adding to history
 */
export const LanguageRedirect: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Don't redirect if already has language prefix
    if (path.match(/^\/(en|fr|es)(\/|$)/)) {
      return;
    }

    // Don't redirect assets, API routes, or static files
    if (
      path.startsWith('/assets/') || 
      path.startsWith('/Images/') || 
      path.startsWith('/api/') ||
      path.includes('.') // Files with extensions
    ) {
      return;
    }

    // Redirect to language-prefixed version
    const newPath = `/${language}${path === '/' ? '' : path}`;
    navigate(newPath, { replace: true });
  }, [location.pathname, language, navigate]);

  return null;
};

export default LanguageRoute;

