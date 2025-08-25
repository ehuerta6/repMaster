# SQL Setup Files for RepMaster

This directory contains SQL files to set up the complete database schema for RepMaster.

## Quick Setup (Recommended)

**Use the complete setup file:**

```sql
-- Copy and paste the contents of 00-setup-complete-database.sql
-- into your Supabase SQL Editor and run it
```

## Step-by-Step Setup (Alternative)

If you prefer to run the setup in steps, use these files in order:
[text](README.md)

1. **`01-create-types.sql`** - Create custom enum types
2. **`02-create-tables.sql`** - Create all database tables
3. **`03-create-indexes.sql`** - Create performance indexes
4. **`04-enable-rls.sql`** - Enable Row Level Security
5. **`05-create-rls-policies.sql`** - Create security policies
6. **`06-create-profile-function.sql`** - Create user profile function

## How to Use

### 1. Access Supabase SQL Editor

- Go to your Supabase project dashboard
- Click on **SQL Editor** in the left sidebar
- Click **New Query**

### 2. Run the Complete Setup

- Copy the contents of `00-setup-complete-database.sql`
- Paste it into the SQL Editor
- Click **Run** to execute

### 3. Verify Setup

- Check that all tables were created in the **Table Editor**
- Verify that RLS is enabled on all tables
- Confirm that policies were created

## What Gets Created

### Tables

- `profiles` - User profile information
- `routines` - Workout routines
- `exercises` - Individual exercises
- `routine_exercises` - Many-to-many relationship
- `exercise_configs` - Exercise-specific settings
- `workouts` - Workout sessions
- `workout_sets` - Individual sets within workouts

### Types

- `muscle_group` - Exercise muscle groups
- `exercise_type` - Type of exercise
- `bar_type` - Equipment type
- `weight_unit` - Weight measurement units

### Security

- Row Level Security (RLS) enabled on all tables
- Policies ensuring users can only access their own data
- Automatic user profile creation on signup

## Troubleshooting

### Common Errors

1. **"Type already exists"**
   - This is normal if you've run the setup before
   - You can safely ignore these errors

2. **"Table already exists"**
   - Tables may already exist from previous runs
   - This won't affect the setup

3. **"Policy already exists"**
   - Policies may already exist
   - This is safe to ignore

### Reset Database (Development Only)

If you need to start fresh:

```sql
-- Drop all tables (WARNING: This will delete all data!)
DROP TABLE IF EXISTS
  public.workout_sets,
  public.workouts,
  public.exercise_configs,
  public.routine_exercises,
  public.exercises,
  public.routines,
  public.profiles CASCADE;

-- Drop all types
DROP TYPE IF EXISTS
  muscle_group,
  exercise_type,
  bar_type,
  weight_unit CASCADE;

-- Then run the complete setup again
```

## Next Steps

After running the SQL setup:

1. **Test the connection** using `npm run test-supabase`
2. **Continue with task 2.2** - Create authentication context and provider
3. **Test user registration** to verify the profile function works

## Security Notes

- All tables have Row Level Security enabled
- Users can only access their own data
- The `handle_new_user()` function automatically creates profiles
- All policies use `auth.uid()` to ensure data isolation
