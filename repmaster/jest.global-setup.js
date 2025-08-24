// Global setup file for Jest
// This file runs once before all tests

module.exports = async () => {
  // Set up global test environment variables
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

  // Set up global test configuration
  global.__TEST__ = true;

  // Mock fetch globally for tests
  global.fetch = () => Promise.resolve({});

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {
      return null;
    }
    disconnect() {
      return null;
    }
    unobserve() {
      return null;
    }
  };

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() {
      return null;
    }
    disconnect() {
      return null;
    }
    unobserve() {
      return null;
    }
  };

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock scrollTo
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: () => {},
  });

  // Mock alert, confirm, prompt
  Object.defineProperty(window, 'alert', {
    writable: true,
    value: () => {},
  });

  Object.defineProperty(window, 'confirm', {
    writable: true,
    value: () => {},
  });

  Object.defineProperty(window, 'prompt', {
    writable: true,
    value: () => {},
  });

  console.log('🧪 Jest global setup completed');
};
