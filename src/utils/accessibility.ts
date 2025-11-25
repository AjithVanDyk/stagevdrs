// Accessibility utilities and enhancements
export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private focusHistory: HTMLElement[] = [];
  private maxFocusHistory = 10;

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  private constructor() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  private setupKeyboardNavigation(): void {
    // Handle Escape key for closing modals/dropdowns
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }
    });

    // Handle Tab key for focus management
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.handleTabKey(event);
      }
    });
  }

  private setupFocusManagement(): void {
    // Track focus changes
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target && target !== document.body) {
        this.addToFocusHistory(target);
      }
    });
  }

  private setupScreenReaderSupport(): void {
    // Announce page changes to screen readers
    this.announcePageChange();
  }

  private handleEscapeKey(): void {
    // Find and close any open modals, dropdowns, etc.
    const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
    const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');
    
    if (openModals.length > 0) {
      const lastModal = openModals[openModals.length - 1];
      const closeButton = lastModal.querySelector('[aria-label*="close"], [aria-label*="Close"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    } else if (openDropdowns.length > 0) {
      const lastDropdown = openDropdowns[openDropdowns.length - 1];
      (lastDropdown as HTMLElement).click();
    }
  }

  private handleTabKey(event: KeyboardEvent): void {
    // Implement focus trapping for modals
    const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
    if (activeModal) {
      this.trapFocusInModal(event, activeModal as HTMLElement);
    }
  }

  private trapFocusInModal(event: KeyboardEvent, modal: HTMLElement): void {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private addToFocusHistory(element: HTMLElement): void {
    this.focusHistory.push(element);
    
    // Maintain history size
    if (this.focusHistory.length > this.maxFocusHistory) {
      this.focusHistory.shift();
    }
  }

  private announcePageChange(): void {
    // Create or update live region for page announcements
    let liveRegion = document.getElementById('page-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'page-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
  }

  // Public methods
  announceToScreenReader(message: string): void {
    const liveRegion = document.getElementById('page-announcements');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  setFocusToElement(element: HTMLElement): void {
    element.focus();
    this.addToFocusHistory(element);
  }

  restorePreviousFocus(): void {
    if (this.focusHistory.length > 1) {
      const previousElement = this.focusHistory[this.focusHistory.length - 2];
      if (previousElement && document.contains(previousElement)) {
        previousElement.focus();
      }
    }
  }

  // Color contrast utilities
  getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;

    const luminance1 = this.getLuminance(rgb1);
    const luminance2 = this.getLuminance(rgb2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // ARIA utilities
  setAriaExpanded(element: HTMLElement, expanded: boolean): void {
    element.setAttribute('aria-expanded', expanded.toString());
  }

  setAriaHidden(element: HTMLElement, hidden: boolean): void {
    element.setAttribute('aria-hidden', hidden.toString());
  }

  setAriaLabel(element: HTMLElement, label: string): void {
    element.setAttribute('aria-label', label);
  }

  setAriaDescribedBy(element: HTMLElement, descriptionId: string): void {
    element.setAttribute('aria-describedby', descriptionId);
  }
}

// Export singleton instance
export const accessibilityManager = AccessibilityManager.getInstance();

// Utility functions
export const announcePageChange = (pageName: string): void => {
  accessibilityManager.announceToScreenReader(`Navigated to ${pageName} page`);
};

export const trapFocus = (container: HTMLElement): void => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    (focusableElements[0] as HTMLElement).focus();
  }
};

export const releaseFocus = (): void => {
  accessibilityManager.restorePreviousFocus();
};

// Screen reader only class
export const srOnly = 'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';













