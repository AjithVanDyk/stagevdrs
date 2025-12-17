/**
 * @fileoverview React Error Boundary component for catching and handling React component errors.
 * Provides user-friendly error UI with retry, reload, and navigation options.
 * Integrates with error monitoring system and supports multi-language error messages.
 * @author Van Dyk Recycling Solutions
 * @module components/ErrorBoundary
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { logReactError } from '../utils/errorMonitor';
import { translations } from '../config/translations';

/**
 * ErrorBoundary component props.
 * 
 * @interface Props
 * @property {ReactNode} children - Child components to wrap with error boundary
 * @property {ReactNode} [fallback] - Custom fallback UI to show on error (overrides default)
 * @property {(error: Error, errorInfo: ErrorInfo) => void} [onError] - Custom error handler callback
 * @property {'en' | 'fr' | 'es'} [language='en'] - Language for error messages
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  language?: 'en' | 'fr' | 'es';
}

/**
 * ErrorBoundary component state.
 * 
 * @interface State
 * @property {boolean} hasError - Whether an error has been caught
 * @property {Error | null} error - The caught error object
 * @property {ErrorInfo | null} errorInfo - React error information
 * @property {string} errorId - Unique identifier for this error instance
 */
interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

/**
 * React Error Boundary class component for catching JavaScript errors in child components.
 * 
 * Features:
 * - Catches errors in component tree and displays user-friendly error UI
 * - Logs errors to monitoring system (Sentry, etc.)
 * - Provides retry, reload, and navigation options
 * - Shows error details in development mode
 * - Supports custom fallback UI and error handlers
 * - Multi-language error messages
 * 
 * @class ErrorBoundary
 * @extends {Component<Props, State>}
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * 
 * // With custom fallback
 * <ErrorBoundary
 *   fallback={<CustomErrorUI />}
 *   onError={(error, errorInfo) => {
 *     // Custom error handling
 *   }}
 *   language="en"
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorId: ''
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
      hasError: true, 
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error using our monitoring system
    logReactError(error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      errorId: this.generateErrorId()
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to an error tracking service
    // like Sentry, LogRocket, or Bugsnag
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('Error logged:', errorData);
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const lang = this.props.language || 'en';
      const t = translations[lang]?.error || translations.en.error;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.somethingWentWrong}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {t.errorDescription}
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.4 }}
                className="mb-6 p-4 bg-gray-100 rounded-lg text-left"
              >
                <div className="flex items-center mb-2">
                  <Bug className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-sm font-semibold text-gray-700">{t.errorDetails}</span>
                </div>
                <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-xs text-gray-500 mt-2 overflow-auto max-h-20">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </motion.div>
            )}

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleRetry}
                className="w-full bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.tryAgain}
              </motion.button>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t.goHome}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReload}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t.reloadPage}
                </motion.button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              {t.errorId}: {this.state.errorId}
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;