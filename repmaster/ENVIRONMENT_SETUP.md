# Environment Setup Guide - RepMaster

This guide explains how to set up environment variables and configuration for the RepMaster application.

## Overview

RepMaster uses environment variables to configure different aspects of the application, including:
- Supabase database connection
- Application settings
- Feature flags
- API configuration

## Environment Files

The project includes several environment file templates:

### `.env.example`
Template file showing all required and optional environment variables. **Copy this to `.env.local` and fill in your values.**

### `.env.development`
Development environment configuration with local Supabase defaults.

### `.env.test`
Test environment configuration for running tests.

### `.env.production`
Production environment template (fill in your production values).

## Required Environment Variables

### Supabase Configuration
```bash
# Required: Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here

# Required: Your Supabase anonymous key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Optional Environment Variables

### App Configuration
```bash
# App name (default: RepMaster)
NEXT_PUBLIC_APP_NAME=RepMaster

# App version (default: 1.0.0)
NEXT_PUBLIC_APP_VERSION=1.0.0

# Environment (default: development)
NEXT_PUBLIC_APP_ENV=development
```

### API Configuration
```bash
# API timeout in milliseconds (default: 10000)
NEXT_PUBLIC_API_TIMEOUT=10000

# Maximum file size in bytes (default: 10485760 = 10MB)
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

### Feature Flags
```bash
# Enable offline mode (default: true)
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true

# Enable PWA functionality (default: true)
NEXT_PUBLIC_ENABLE_PWA=true

# Enable analytics (default: false)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Development Configuration
```bash
# Node environment (default: development)
NODE_ENV=development

# Disable Next.js telemetry (default: true)
NEXT_TELEMETRY_DISABLED=1
```

## Setup Instructions

### 1. Development Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Production Setup
1. Copy `.env.production` to your production environment
2. Fill in your production Supabase credentials
3. Set `NODE_ENV=production`
4. Deploy with your production environment variables

### 3. Test Setup
The `.env.test` file is automatically used when running tests with `NODE_ENV=test`.

## Environment Validation

The project includes automatic environment validation:

- **Pre-flight validation**: Runs before `dev`, `build`, and `start` commands
- **Manual validation**: Run `npm run validate-env` to check your setup
- **CI/CD**: Validation is skipped in CI environments

## Configuration Utilities

### Environment Configuration (`src/lib/config/env.ts`)
Provides type-safe access to environment variables with validation and fallbacks.

```typescript
import { env, validateEnvironment } from '@/lib/config/env';

// Access environment variables
const supabaseUrl = env.supabase.url;

// Validate environment
const { isValid, errors } = validateEnvironment();
```

### Constants (`src/lib/config/constants.ts`)
Application constants that use environment variables.

```typescript
import { API_CONFIG } from '@/lib/config/constants';

// Use configured values
const apiTimeout = API_CONFIG.timeout;
```

## Troubleshooting

### Common Issues

1. **"Missing required environment variable" error**
   - Ensure you have `.env.local` file
   - Check that Supabase credentials are correct
   - Restart your development server

2. **Environment variables not loading**
   - Verify file naming (`.env.local`, not `.env`)
   - Check for typos in variable names
   - Ensure no spaces around `=` signs

3. **Build errors related to environment**
   - Run `npm run validate-env` to check configuration
   - Verify all required variables are set

### Validation Script

The validation script (`scripts/validate-env.js`) provides detailed feedback:
```bash
npm run validate-env
```

This will show:
- ✅ Set environment variables
- ⚠️ Missing optional variables (with defaults)
- ❌ Missing required variables
- 💡 Instructions to fix issues

## Security Notes

- **Never commit `.env.local`** - it's in `.gitignore`
- **Use different credentials** for development, staging, and production
- **Rotate Supabase keys** regularly
- **Limit access** to production environment variables

## Next Steps

After setting up environment variables:

1. **Configure Supabase**: Set up your database and authentication
2. **Test Connection**: Verify the app can connect to Supabase
3. **Configure Features**: Adjust feature flags as needed
4. **Deploy**: Set up production environment variables

## Support

If you encounter issues:
1. Check the validation script output
2. Verify Supabase project configuration
3. Check the console for error messages
4. Review this documentation
