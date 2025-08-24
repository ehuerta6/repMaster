// Validation schemas for RepMaster using Zod

import { z } from 'zod';
import { EXERCISE_CONFIG, VALIDATION_CONFIG } from '@/lib/config/constants';

// Base schemas
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const passwordSchema = z
  .string()
  .min(VALIDATION_CONFIG.minPasswordLength, `Password must be at least ${VALIDATION_CONFIG.minPasswordLength} characters`)
  .max(VALIDATION_CONFIG.maxPasswordLength, `Password must be less than ${VALIDATION_CONFIG.maxPasswordLength} characters`)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(VALIDATION_CONFIG.maxNameLength, `Name must be less than ${VALIDATION_CONFIG.maxNameLength} characters`);

export const descriptionSchema = z
  .string()
  .max(VALIDATION_CONFIG.maxDescriptionLength, `Description must be less than ${VALIDATION_CONFIG.maxDescriptionLength} characters`)
  .optional();

export const notesSchema = z
  .string()
  .max(VALIDATION_CONFIG.maxNotesLength, `Notes must be less than ${VALIDATION_CONFIG.maxNotesLength} characters`)
  .optional();

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  name: nameSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Routine schemas
export const routineFrequencySchema = z.enum([
  'every-day',
  'every-2-days',
  'every-3-days',
  'every-week',
  'monday-wednesday-friday',
  'tuesday-thursday-saturday',
  'custom',
]);

export const createRoutineSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  frequency: routineFrequencySchema,
});

export const updateRoutineSchema = createRoutineSchema.partial().extend({
  id: z.string().min(1, 'Routine ID is required'),
});

// Exercise schemas
export const muscleGroupSchema = z.enum(EXERCISE_CONFIG.muscleGroups);

export const exerciseTypeSchema = z.enum(EXERCISE_CONFIG.exerciseTypes);

export const barTypeSchema = z.enum(EXERCISE_CONFIG.barTypes);

export const weightUnitSchema = z.enum(EXERCISE_CONFIG.weightUnits);

export const createExerciseSchema = z.object({
  name: nameSchema,
  muscle_group: muscleGroupSchema,
  target_reps: z.string().min(1, 'Target reps are required'),
  sets: z.number()
    .int('Sets must be a whole number')
    .min(VALIDATION_CONFIG.minSets, `Sets must be at least ${VALIDATION_CONFIG.minSets}`)
    .max(VALIDATION_CONFIG.maxSets, `Sets must be at most ${VALIDATION_CONFIG.maxSets}`),
  type: exerciseTypeSchema,
  notes: notesSchema,
});

export const updateExerciseSchema = createExerciseSchema.partial().extend({
  id: z.string().min(1, 'Exercise ID is required'),
});

// Exercise configuration schemas
export const exerciseConfigSchema = z.object({
  exercise_id: z.string().min(1, 'Exercise ID is required'),
  weight_increment: z.number()
    .positive('Weight increment must be positive')
    .max(100, 'Weight increment must be reasonable'),
  bar_type: barTypeSchema,
  bar_weight: z.number()
    .min(0, 'Bar weight cannot be negative')
    .max(1000, 'Bar weight must be reasonable'),
  unit: weightUnitSchema,
});

// Workout schemas
export const workoutStatusSchema = z.enum(['in-progress', 'completed', 'paused', 'cancelled']);

export const createWorkoutSchema = z.object({
  routine_id: z.string().min(1, 'Routine ID is required'),
});

export const updateWorkoutSchema = z.object({
  id: z.string().min(1, 'Workout ID is required'),
  status: workoutStatusSchema.optional(),
  completed_at: z.string().optional(),
});

// Workout set schemas
export const workoutSetSchema = z.object({
  exercise_id: z.string().min(1, 'Exercise ID is required'),
  set_number: z.number()
    .int('Set number must be a whole number')
    .positive('Set number must be positive'),
  weight: z.number()
    .min(VALIDATION_CONFIG.minWeight, `Weight must be at least ${VALIDATION_CONFIG.minWeight}`)
    .max(VALIDATION_CONFIG.maxWeight, `Weight must be at most ${VALIDATION_CONFIG.maxWeight}`),
  reps: z.number()
    .int('Reps must be a whole number')
    .min(VALIDATION_CONFIG.minReps, `Reps must be at least ${VALIDATION_CONFIG.minReps}`)
    .max(VALIDATION_CONFIG.maxReps, `Reps must be at most ${VALIDATION_CONFIG.maxReps}`),
  notes: notesSchema,
});

export const updateWorkoutSetSchema = workoutSetSchema.partial().extend({
  id: z.string().min(1, 'Workout set ID is required'),
});

// Plate calculator schemas
export const plateCalculatorSchema = z.object({
  target_weight: z.number()
    .positive('Target weight must be positive')
    .max(1000, 'Target weight must be reasonable'),
  bar_weight: z.number()
    .min(0, 'Bar weight cannot be negative')
    .max(100, 'Bar weight must be reasonable'),
  unit: weightUnitSchema,
  bar_type: barTypeSchema,
});

// Import/Export schemas
export const importFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine((file) => {
      const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      return validTypes.includes(file.type);
    }, 'File must be CSV or Excel format'),
});

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().max(100, 'Search query too long').optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const dateRangeSchema = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export const workoutFilterSchema = searchSchema.extend({
  routine_id: z.string().optional(),
  status: workoutStatusSchema.optional(),
  date_range: dateRangeSchema.optional(),
});

// Form validation helpers
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

export const getFieldError = (schema: z.ZodSchema<any>, data: unknown, field: string): string | undefined => {
  try {
    schema.parse(data);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find(err => err.path.includes(field));
      return fieldError?.message;
    }
    return undefined;
  }
};
