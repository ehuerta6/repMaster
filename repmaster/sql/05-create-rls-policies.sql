-- 05-create-rls-policies.sql
-- Create Row Level Security (RLS) policies for all tables

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Routines policies
CREATE POLICY "Users can view own routines" ON public.routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routines" ON public.routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines" ON public.routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routines" ON public.routines
  FOR DELETE USING (auth.uid() = user_id);

-- Exercises policies
CREATE POLICY "Users can view own exercises" ON public.exercises
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercises" ON public.exercises
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercises" ON public.exercises
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercises" ON public.exercises
  FOR DELETE USING (auth.uid() = user_id);

-- Routine exercises policies
CREATE POLICY "Users can view own routine exercises" ON public.routine_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.routines 
      WHERE id = routine_exercises.routine_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own routine exercises" ON public.routine_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.routines 
      WHERE id = routine_exercises.routine_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own routine exercises" ON public.routine_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.routines 
      WHERE id = routine_exercises.routine_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own routine exercises" ON public.routine_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.routines 
      WHERE id = routine_exercises.routine_id 
      AND user_id = auth.uid()
    )
  );

-- Exercise configs policies
CREATE POLICY "Users can view own exercise configs" ON public.exercise_configs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise configs" ON public.exercise_configs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise configs" ON public.exercise_configs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise configs" ON public.exercise_configs
  FOR DELETE USING (auth.uid() = user_id);

-- Workouts policies
CREATE POLICY "Users can view own workouts" ON public.workouts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workouts" ON public.workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" ON public.workouts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" ON public.workouts
  FOR DELETE USING (auth.uid() = user_id);

-- Workout sets policies
CREATE POLICY "Users can view own workout sets" ON public.workout_sets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workouts 
      WHERE id = workout_sets.workout_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own workout sets" ON public.workout_sets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workouts 
      WHERE id = workout_sets.workout_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own workout sets" ON public.workout_sets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.workouts 
      WHERE id = workout_sets.workout_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own workout sets" ON public.workout_sets
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.workouts 
      WHERE id = workout_sets.workout_id 
      AND user_id = auth.uid()
    )
  );
