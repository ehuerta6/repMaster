# Supabase Setup Guide - RepMaster

This guide explains how to set up and configure Supabase for the RepMaster application.

## Overview

RepMaster uses Supabase as its backend service, providing:

- **Authentication**: User registration, login, and session management
- **Database**: PostgreSQL database for storing user data, routines, and workout history
- **Real-time**: Live updates for collaborative features
- **Storage**: File storage for user uploads (if needed)
- **Edge Functions**: Serverless functions for complex operations

## Prerequisites

- A Supabase account (free tier available)
- Basic understanding of PostgreSQL
- Environment variables configured (see `ENVIRONMENT_SETUP.md`)

## Step 1: Create Supabase Project

### 1.1 Sign up/Login to Supabase

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub, GitLab, or email
3. Login to your dashboard

### 1.2 Create New Project

1. Click "New Project"
2. Choose your organization
3. Enter project details:
   - **Name**: `repmaster` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier

### 1.3 Wait for Setup

- Database setup takes 1-2 minutes
- You'll receive an email when ready

## Step 2: Get Project Credentials

### 2.1 Access Project Settings

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.2 Update Environment Variables

1. Open your `.env.local` file
2. Update the Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://exqqxmzsoqfpiutqzxqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Configure Authentication

### 3.1 Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure email templates (optional):
   - **Confirm signup**: Customize welcome email
   - **Reset password**: Customize password reset email

### 3.2 Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/login`
   - `http://localhost:3000/auth/register`

### 3.3 Email Settings (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize email content and styling
3. Test email delivery

## Step 4: Database Schema Setup

### 4.1 Access SQL Editor

1. Go to **SQL Editor** in your project dashboard
2. Create a new query

### 4.2 Create Database Tables

The following SQL will create the basic schema for RepMaster:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE muscle_group AS ENUM (
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'legs', 'core', 'cardio', 'flexibility'
);

CREATE TYPE exercise_type AS ENUM (
  'bilateral', 'unilateral', 'cardio', 'flexibility'
);

CREATE TYPE bar_type AS ENUM (
  'barbell', 'dumbbell', 'machine', 'cable', 'bodyweight'
);

CREATE TYPE weight_unit AS ENUM ('kg', 'lbs');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  weight_unit weight_unit DEFAULT 'lbs',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routines table
CREATE TABLE public.routines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  frequency_pattern TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises table
CREATE TABLE public.exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  muscle_group muscle_group NOT NULL,
  exercise_type exercise_type NOT NULL,
  bar_type bar_type NOT NULL,
  default_sets INTEGER DEFAULT 3,
  default_reps TEXT DEFAULT '8-12',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routine exercises (many-to-many relationship)
CREATE TABLE public.routine_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  routine_id UUID REFERENCES public.routines(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL,
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '8-12',
  rest_time INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise configurations
CREATE TABLE public.exercise_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  weight_increment DECIMAL(5,2) DEFAULT 5.0,
  bar_weight DECIMAL(5,2) DEFAULT 45.0,
  current_weight DECIMAL(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workouts table
CREATE TABLE public.workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  routine_id UUID REFERENCES public.routines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout sets table
CREATE TABLE public.workout_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  set_number INTEGER NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  reps INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_routines_user_id ON public.routines(user_id);
CREATE INDEX idx_exercises_user_id ON public.exercises(user_id);
CREATE INDEX idx_routine_exercises_routine_id ON public.routine_exercises(routine_id);
CREATE INDEX idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX idx_workout_sets_workout_id ON public.workout_sets(workout_id);
CREATE INDEX idx_exercise_configs_exercise_id ON public.exercise_configs(exercise_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;
```

### 4.3 Create RLS Policies

After creating tables, set up Row Level Security policies:

```sql
-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Routines policies
CREATE POLICY "Users can view own routines" ON public.routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routines" ON public.routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines" ON public.routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routines" ON public.routines
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
-- (Add policies for exercises, routine_exercises, exercise_configs, workouts, workout_sets)
```

## Step 5: Test Configuration

### 5.1 Validate Environment

```bash
npm run validate-env
```

### 5.2 Test Supabase Connection

Create a simple test script to verify the connection:

```typescript
// test-supabase.ts
import { supabase } from './src/lib/auth/supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful!');
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
  }
}

testConnection();
```

## Step 6: Production Configuration

### 6.1 Update Production Environment

1. Copy `.env.production` to your production environment
2. Update with production Supabase credentials
3. Set `NODE_ENV=production`

### 6.2 Production Site URL

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Update **Site URL** to your production domain
3. Add production redirect URLs

### 6.3 Database Backups

1. Go to **Settings** → **Database**
2. Enable **Point in Time Recovery** (PITR)
3. Set up automated backups

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Verify your anon key is correct
   - Check that the key hasn't been rotated

2. **"JWT secret not set" error**
   - Ensure JWT secret is configured in database
   - Check RLS policies are properly set

3. **"Table doesn't exist" error**
   - Verify SQL schema was executed successfully
   - Check table names match exactly

4. **Authentication redirect issues**
   - Verify redirect URLs in Supabase settings
   - Check that your app URL matches

### Getting Help

- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Community Forum**: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- **Discord**: [discord.gg/supabase](https://discord.gg/supabase)

## Next Steps

After completing this setup:

1. **Test Authentication**: Implement login/register flows
2. **Create Database Types**: Generate TypeScript types from schema
3. **Implement CRUD Operations**: Build data access layer
4. **Add Real-time Features**: Enable live updates
5. **Set up Monitoring**: Monitor database performance and errors

## Security Notes

- **Never expose service role key** in client-side code
- **Use RLS policies** to restrict data access
- **Validate all inputs** before database operations
- **Monitor authentication logs** for suspicious activity
- **Regularly rotate API keys** and JWT secrets
