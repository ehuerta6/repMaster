// Database configuration for RepMaster
import { env } from '@/lib/config/env';

// Database configuration constants
export const DB_CONFIG = {
  // Connection settings
  connection: {
    url: env.supabase.url,
    anonKey: env.supabase.anonKey,
    timeout: env.api.timeout,
  },
  
  // Table names
  tables: {
    profiles: 'profiles',
    routines: 'routines',
    exercises: 'exercises',
    routineExercises: 'routine_exercises',
    exerciseConfigs: 'exercise_configs',
    workouts: 'workouts',
    workoutSets: 'workout_sets',
  },
  
  // Query settings
  query: {
    defaultLimit: 50,
    maxLimit: 1000,
    defaultOrderBy: 'created_at',
    defaultOrderDirection: 'desc' as const,
  },
  
  // Real-time settings
  realtime: {
    enabled: true,
    eventsPerSecond: 10,
    heartbeatInterval: 30000, // 30 seconds
  },
  
  // Cache settings
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of cached items
  },
  
  // Error handling
  errors: {
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    timeout: env.api.timeout,
  },
} as const;

// Database environment validation
export const validateDatabaseConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!DB_CONFIG.connection.url) {
    errors.push('Database URL is required');
  }
  
  if (!DB_CONFIG.connection.anonKey) {
    errors.push('Database anon key is required');
  }
  
  if (DB_CONFIG.connection.timeout <= 0) {
    errors.push('Database timeout must be greater than 0');
  }
  
  if (DB_CONFIG.query.defaultLimit <= 0) {
    errors.push('Default query limit must be greater than 0');
  }
  
  if (DB_CONFIG.query.maxLimit <= DB_CONFIG.query.defaultLimit) {
    errors.push('Max query limit must be greater than default limit');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Helper function to get table name
export const getTableName = (table: keyof typeof DB_CONFIG.tables): string => {
  return DB_CONFIG.tables[table];
};

// Helper function to check if real-time is enabled
export const isRealtimeEnabled = (): boolean => {
  return DB_CONFIG.realtime.enabled && env.features.offlineMode;
};

// Helper function to get cache TTL
export const getCacheTTL = (): number => {
  return DB_CONFIG.cache.enabled ? DB_CONFIG.cache.ttl : 0;
};

// Export configuration
export default DB_CONFIG;
