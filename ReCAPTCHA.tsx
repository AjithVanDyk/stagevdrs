import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface ReCAPTCHAProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  className?: string;
}

export interface ReCAPTCHARef {
  reset: () => void;
  getResponse: () => string;
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
        theme?: 'light' | 'dark';
        size?: 'normal' | 'compact';
      }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

const ReCAPTCHA = forwardRef<ReCAPTCHARef, ReCAPTCHAProps>(({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}, ref) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loadReCAPTCHA = () => {
      if (window.grecaptcha && recaptchaRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onVerify,
            'expired-callback': onExpire || (() => {}),
            'error-callback': onError || (() => {}),
            theme: theme,
            size: size
          });
        } catch (error) {
          console.error('reCAPTCHA render error:', error);
          if (onError) onError();
        }
      }
    };

    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha) {
      loadReCAPTCHA();
    } else {
      // Wait for reCAPTCHA to load
      const checkInterval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkInterval);
          loadReCAPTCHA();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error('reCAPTCHA reset error:', error);
        }
      }
    };
  }, [siteKey, onVerify, onExpire, onError, theme, size]);

  const reset = () => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch (error) {
        console.error('reCAPTCHA reset error:', error);
      }
    }
  };

  const getResponse = () => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widgetIdRef.current);
      } catch (error) {
        console.error('reCAPTCHA getResponse error:', error);
        return '';
      }
    }
    return '';
  };

  // Expose methods for parent components
  useImperativeHandle(ref, () => ({
    reset,
    getResponse
  }));

  return (
    <div 
      ref={recaptchaRef} 
      className={`recaptcha-container ${className}`}
      data-sitekey={siteKey}
    />
  );
});

export default ReCAPTCHA;
