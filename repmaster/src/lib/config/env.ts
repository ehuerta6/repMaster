// Environment configuration utility for RepMaster
// Provides type-safe access to environment variables

export interface EnvironmentConfig {
  // Supabase Configuration
  supabase: {
    url: string;
    anonKey: string;
  };
  
  // App Configuration
  app: {
    name: string;
    version: string;
    environment: 'development' | 'test' | 'production';
  };
  
  // API Configuration
  api: {
    timeout: number;
    maxFileSize: number;
  };
  
  // Feature Flags
  features: {
    offlineMode: boolean;
    pwa: boolean;
    analytics: boolean;
  };
  
  // Development Configuration
  development: {
    nodeEnv: string;
    telemetryDisabled: boolean;
  };
}

// Environment variable getters with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  return process.env[key] || fallback;
};

const getEnvVarAsNumber = (key: string, fallback: number): number => {
  const value = process.env[key];
  return value ? parseInt(value, 10) : fallback;
};

const getEnvVarAsBoolean = (key: string, fallback: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

// Environment configuration object
export const env: EnvironmentConfig = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', ''),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
  },
  
  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'RepMaster'),
    version: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),
    environment: (getEnvVar('NEXT_PUBLIC_APP_ENV', 'development') as 'development' | 'test' | 'production') || 'development',
  },
  
  api: {
    timeout: getEnvVarAsNumber('NEXT_PUBLIC_API_TIMEOUT', 10000),
    maxFileSize: getEnvVarAsNumber('NEXT_PUBLIC_MAX_FILE_SIZE', 10 * 1024 * 1024), // 10MB default
  },
  
  features: {
    offlineMode: getEnvVarAsBoolean('NEXT_PUBLIC_ENABLE_OFFLINE_MODE', true),
    pwa: getEnvVarAsBoolean('NEXT_PUBLIC_ENABLE_PWA', true),
    analytics: getEnvVarAsBoolean('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
  },
  
  development: {
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    telemetryDisabled: getEnvVarAsBoolean('NEXT_TELEMETRY_DISABLED', true),
  },
};

// Validation function to ensure required environment variables are set
export const validateEnvironment = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!env.supabase.url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required');
  }
  
  if (!env.supabase.anonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required');
  }
  
  if (env.api.timeout <= 0) {
    errors.push('NEXT_PUBLIC_API_TIMEOUT must be greater than 0');
  }
  
  if (env.api.maxFileSize <= 0) {
    errors.push('NEXT_PUBLIC_MAX_FILE_SIZE must be greater than 0');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Helper function to check if we're in development mode
export const isDevelopment = (): boolean => {
  return env.development.nodeEnv === 'development';
};

// Helper function to check if we're in production mode
export const isProduction = (): boolean => {
  return env.development.nodeEnv === 'production';
};

// Helper function to check if we're in test mode
export const isTest = (): boolean => {
  return env.development.nodeEnv === 'test';
};

// Helper function to get environment-specific configuration
export const getEnvironmentConfig = () => {
  if (isProduction()) {
    return {
      ...env,
      api: {
        ...env.api,
        timeout: Math.max(env.api.timeout, 15000), // Ensure minimum timeout in production
      },
    };
  }
  
  if (isTest()) {
    return {
      ...env,
      features: {
        ...env.features,
        offlineMode: false, // Disable offline mode in tests
        pwa: false, // Disable PWA in tests
      },
    };
  }
  
  return env;
};

export default env;
