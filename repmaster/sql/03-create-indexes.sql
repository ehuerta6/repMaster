-- 03-create-indexes.sql
-- Create indexes for better performance

-- Indexes for foreign key relationships
CREATE INDEX idx_routines_user_id ON public.routines(user_id);
CREATE INDEX idx_exercises_user_id ON public.exercises(user_id);
CREATE INDEX idx_routine_exercises_routine_id ON public.routine_exercises(routine_id);
CREATE INDEX idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX idx_workout_sets_workout_id ON public.workout_sets(workout_id);
CREATE INDEX idx_exercise_configs_exercise_id ON public.exercise_configs(exercise_id);

-- Indexes for common queries
CREATE INDEX idx_routines_is_active ON public.routines(is_active);
CREATE INDEX idx_exercises_muscle_group ON public.exercises(muscle_group);
CREATE INDEX idx_workouts_started_at ON public.workouts(started_at);
CREATE INDEX idx_workout_sets_completed ON public.workout_sets(completed);

-- Composite indexes for complex queries
CREATE INDEX idx_routines_user_active ON public.routines(user_id, is_active);
CREATE INDEX idx_exercises_user_muscle ON public.exercises(user_id, muscle_group);
CREATE INDEX idx_workouts_user_date ON public.workouts(user_id, started_at);
