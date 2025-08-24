// Database types for RepMaster
// These types match the Supabase database schema

// Custom enum types
export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'legs' 
  | 'core' 
  | 'cardio' 
  | 'flexibility';

export type ExerciseType = 
  | 'bilateral' 
  | 'unilateral' 
  | 'cardio' 
  | 'flexibility';

export type BarType = 
  | 'barbell' 
  | 'dumbbell' 
  | 'machine' 
  | 'cable' 
  | 'bodyweight';

export type WeightUnit = 'kg' | 'lbs';

// Database table types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  weight_unit: WeightUnit;
  created_at: string;
  updated_at: string;
}

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  frequency_pattern?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  user_id: string;
  name: string;
  muscle_group: MuscleGroup;
  exercise_type: ExerciseType;
  bar_type: BarType;
  default_sets: number;
  default_reps: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_id: string;
  order_index: number;
  sets: number;
  reps: string;
  rest_time: number;
  created_at: string;
}

export interface ExerciseConfig {
  id: string;
  exercise_id: string;
  user_id: string;
  weight_increment: number;
  bar_weight: number;
  current_weight: number;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  routine_id?: string;
  name: string;
  started_at: string;
  completed_at?: string;
  notes?: string;
  created_at: string;
}

export interface WorkoutSet {
  id: string;
  workout_id: string;
  exercise_id: string;
  set_number: number;
  weight: number;
  reps: number;
  completed: boolean;
  notes?: string;
  created_at: string;
}

// Extended types with relationships
export interface RoutineWithExercises extends Routine {
  exercises: (RoutineExercise & { exercise: Exercise })[];
}

export interface ExerciseWithConfig extends Exercise {
  config?: ExerciseConfig;
}

export interface WorkoutWithSets extends Workout {
  sets: (WorkoutSet & { exercise: Exercise })[];
}

// Insert types (for creating new records)
export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type RoutineInsert = Omit<Routine, 'id' | 'created_at' | 'updated_at'>;
export type ExerciseInsert = Omit<Exercise, 'id' | 'created_at' | 'updated_at'>;
export type RoutineExerciseInsert = Omit<RoutineExercise, 'id' | 'created_at'>;
export type ExerciseConfigInsert = Omit<ExerciseConfig, 'id' | 'created_at' | 'updated_at'>;
export type WorkoutInsert = Omit<Workout, 'id' | 'created_at'>;
export type WorkoutSetInsert = Omit<WorkoutSet, 'id' | 'created_at'>;

// Update types (for updating existing records)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
export type RoutineUpdate = Partial<Omit<Routine, 'id' | 'created_at' | 'updated_at'>>;
export type ExerciseUpdate = Partial<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>>;
export type RoutineExerciseUpdate = Partial<Omit<RoutineExercise, 'id' | 'created_at'>>;
export type ExerciseConfigUpdate = Partial<Omit<ExerciseConfig, 'id' | 'created_at' | 'updated_at'>>;
export type WorkoutUpdate = Partial<Omit<Workout, 'id' | 'created_at'>>;
export type WorkoutSetUpdate = Partial<Omit<WorkoutSet, 'id' | 'created_at'>>;

// Database response types
export interface DatabaseResponse<T> {
  data: T | null;
  error: any;
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  hasMore: boolean;
}

// Filter and sort types
export interface RoutineFilters {
  is_active?: boolean;
  search?: string;
  muscle_group?: MuscleGroup;
}

export interface ExerciseFilters {
  muscle_group?: MuscleGroup;
  exercise_type?: ExerciseType;
  bar_type?: BarType;
  search?: string;
}

export interface WorkoutFilters {
  routine_id?: string;
  date_from?: string;
  date_to?: string;
  completed?: boolean;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Export all types
export type {
  Profile,
  Routine,
  Exercise,
  RoutineExercise,
  ExerciseConfig,
  Workout,
  WorkoutSet,
  RoutineWithExercises,
  ExerciseWithConfig,
  WorkoutWithSets,
  ProfileInsert,
  RoutineInsert,
  ExerciseInsert,
  RoutineExerciseInsert,
  ExerciseConfigInsert,
  WorkoutInsert,
  WorkoutSetInsert,
  ProfileUpdate,
  RoutineUpdate,
  ExerciseUpdate,
  RoutineExerciseUpdate,
  ExerciseConfigUpdate,
  WorkoutUpdate,
  WorkoutSetUpdate,
  DatabaseResponse,
  PaginatedResponse,
  RoutineFilters,
  ExerciseFilters,
  WorkoutFilters,
  SortOptions,
};
