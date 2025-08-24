// Database exports for RepMaster
export * from './types';
export * from './config';

// Re-export commonly used database items
export { default as DB_CONFIG } from './config';
export { validateDatabaseConfig, getTableName, isRealtimeEnabled, getCacheTTL } from './config';
