// Application constants for RepMaster
import { env } from './env';

// App Configuration
export const APP_CONFIG = {
  name: env.app.name,
  version: env.app.version,
  description: 'Minimalist gym tracking app for routines and progress',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: env.supabase.url,
  anonKey: env.supabase.anonKey,
  timeout: env.api.timeout,
} as const;

// Database Configuration
export const DB_CONFIG = {
  tables: {
    users: 'users',
    routines: 'routines',
    exercises: 'exercises',
    exercise_configs: 'exercise_configs',
    workouts: 'workouts',
    workout_sets: 'workout_sets',
    routine_exercises: 'routine_exercises',
  },
} as const;

// Exercise Configuration
export const EXERCISE_CONFIG = {
  defaultSets: 3,
  defaultReps: '8-12',
  muscleGroups: [
    'chest',
    'back',
    'shoulders',
    'biceps',
    'triceps',
    'legs',
    'core',
    'cardio',
    'flexibility',
  ] as const,
  exerciseTypes: ['bilateral', 'unilateral', 'cardio', 'flexibility'] as const,
  barTypes: ['barbell', 'dumbbell', 'machine', 'cable', 'bodyweight'] as const,
  weightUnits: ['kg', 'lbs'] as const,
} as const;

// Plate Calculator Configuration
export const PLATE_CONFIG = {
  // Standard plate weights in lbs
  standardPlates: [2.5, 5, 10, 25, 35, 45] as const,
  // Standard bar weights
  barWeights: {
    barbell: 45, // lbs
    dumbbell: 0, // varies by pair
    machine: 0, // varies by machine
    cable: 0, // varies by cable system
    bodyweight: 0,
  } as const,
  // Weight increments for progression
  defaultWeightIncrement: 5, // lbs
  smallWeightIncrement: 2.5, // lbs
} as const;

// Routine Configuration
export const ROUTINE_CONFIG = {
  frequencyOptions: [
    { value: 'every-day', label: 'Every Day' },
    { value: 'every-2-days', label: 'Every 2 Days' },
    { value: 'every-3-days', label: 'Every 3 Days' },
    { value: 'every-week', label: 'Every Week' },
    { value: 'monday-wednesday-friday', label: 'Mon/Wed/Fri' },
    { value: 'tuesday-thursday-saturday', label: 'Tue/Thu/Sat' },
    { value: 'custom', label: 'Custom' },
  ] as const,
  maxExercisesPerRoutine: 20,
  maxSetsPerExercise: 10,
} as const;

// UI Configuration
export const UI_CONFIG = {
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },
} as const;

// Validation Configuration
export const VALIDATION_CONFIG = {
  minPasswordLength: 8,
  maxPasswordLength: 128,
  maxNameLength: 100,
  maxDescriptionLength: 500,
  maxNotesLength: 1000,
  minSets: 1,
  maxSets: 10,
  minReps: 1,
  maxReps: 100,
  minWeight: 0,
  maxWeight: 1000,
} as const;

// Offline Configuration
export const OFFLINE_CONFIG = {
  maxOfflineDays: 30,
  syncInterval: 5 * 60 * 1000, // 5 minutes
  maxRetryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

// Export/Import Configuration
export const IMPORT_EXPORT_CONFIG = {
  supportedFormats: ['csv', 'xlsx'] as const,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxRecordsPerImport: 1000,
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
} as const;
