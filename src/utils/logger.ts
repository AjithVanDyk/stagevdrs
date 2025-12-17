/**
 * @fileoverview Centralized logging utility for browser and server environments.
 * Use this instead of console.log directly so we can control log levels and outputs.
 * @author Van Dyk Recycling Solutions
 * @lastModified 2025-12-17
 */

type LogArgs = unknown[];

const isDevelopment = import.meta.env?.DEV ?? false;

/**
 * Simple logger with leveled output.
 *
 * - In development: debug/info go to console, along with warn/error.
 * - In production: only warn/error are emitted by default.
 */
export const logger = {
  /**
   * Development-only debug logging.
   * Use for noisy, diagnostic messages.
   */
  debug: (...args: LogArgs) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug('[DEBUG]', ...args);
    }
  },

  /**
   * General informational logging.
   */
  info: (...args: LogArgs) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.info('[INFO]', ...args);
    }
  },

  /**
   * Warnings that should be investigated but are not fatal.
   */
  warn: (...args: LogArgs) => {
    // eslint-disable-next-line no-console
    console.warn('[WARN]', ...args);
  },

  /**
   * Errors that indicate failures; also a good place to hook error reporting.
   */
  error: (...args: LogArgs) => {
    // eslint-disable-next-line no-console
    console.error('[ERROR]', ...args);
    // TODO: optionally forward to Sentry or another error tracking service.
  },
};


