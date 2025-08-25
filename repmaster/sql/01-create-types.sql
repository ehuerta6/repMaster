-- 01-create-types.sql
-- Create custom enum types for RepMaster

-- Muscle groups for exercises
CREATE TYPE muscle_group AS ENUM (
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 
  'legs', 'core', 'cardio', 'flexibility'
);

-- Exercise types
CREATE TYPE exercise_type AS ENUM (
  'bilateral', 'unilateral', 'cardio', 'flexibility'
);

-- Bar types for weight calculations
CREATE TYPE bar_type AS ENUM (
  'barbell', 'dumbbell', 'machine', 'cable', 'bodyweight'
);

-- Weight units
CREATE TYPE weight_unit AS ENUM ('kg', 'lbs');
