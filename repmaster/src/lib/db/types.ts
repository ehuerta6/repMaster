// Database type definitions for RepMaster

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  frequency: RoutineFrequency;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  target_reps: string;
  sets: number;
  type: ExerciseType;
  notes?: string;
  routine_id: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ExerciseConfig {
  id: string;
  exercise_id: string;
  user_id: string;
  weight_increment: number;
  bar_type: BarType;
  bar_weight: number;
  unit: WeightUnit;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  routine_id: string;
  user_id: string;
  started_at: string;
  completed_at?: string;
  status: WorkoutStatus;
  created_at: string;
  updated_at: string;
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
  updated_at: string;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_id: string;
  order: number;
  created_at: string;
}

// Enums
export type RoutineFrequency = 
  | 'every-day'
  | 'every-2-days'
  | 'every-3-days'
  | 'every-week'
  | 'monday-wednesday-friday'
  | 'tuesday-thursday-saturday'
  | 'custom';

export type ExerciseType = 'bilateral' | 'unilateral' | 'cardio' | 'flexibility';

export type BarType = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';

export type WeightUnit = 'kg' | 'lbs';

export type WorkoutStatus = 'in-progress' | 'completed' | 'paused' | 'cancelled';

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form types
export interface CreateRoutineForm {
  name: string;
  description?: string;
  frequency: RoutineFrequency;
}

export interface CreateExerciseForm {
  name: string;
  muscle_group: string;
  target_reps: string;
  sets: number;
  type: ExerciseType;
  notes?: string;
}

export interface UpdateExerciseForm extends Partial<CreateExerciseForm> {
  id: string;
}

export interface WorkoutSetForm {
  exercise_id: string;
  set_number: number;
  weight: number;
  reps: number;
  notes?: string;
}
