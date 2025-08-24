#!/usr/bin/env node

/**
 * Environment validation script for RepMaster
 * Run this script to validate that all required environment variables are set
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env files
// Try to load .env.local first, then .env
const envFiles = ['.env.local', '.env'];
let envLoaded = false;

for (const envFile of envFiles) {
  const envPath = path.join(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`📁 Loaded environment from: ${envFile}`);
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('⚠️  No .env.local or .env file found');
}

// Required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

// Optional environment variables with defaults
const optionalEnvVars = {
  'NEXT_PUBLIC_APP_NAME': 'RepMaster',
  'NEXT_PUBLIC_APP_VERSION': '1.0.0',
  'NEXT_PUBLIC_APP_ENV': 'development',
  'NEXT_PUBLIC_API_TIMEOUT': '10000',
  'NEXT_PUBLIC_MAX_FILE_SIZE': '10485760',
  'NEXT_PUBLIC_ENABLE_OFFLINE_MODE': 'true',
  'NEXT_PUBLIC_ENABLE_PWA': 'true',
  'NEXT_PUBLIC_ENABLE_ANALYTICS': 'false',
  'NODE_ENV': 'development',
  'NEXT_TELEMETRY_DISABLED': '1',
};

// Validation function
function validateEnvironment() {
  console.log('🔍 Validating environment variables...\n');
  
  let isValid = true;
  const errors = [];
  const warnings = [];
  
  // Check required environment variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`❌ Missing required environment variable: ${envVar}`);
      isValid = false;
    } else {
      console.log(`✅ ${envVar}: Set`);
    }
  }
  
  // Check optional environment variables
  for (const [envVar, defaultValue] of Object.entries(optionalEnvVars)) {
    if (!process.env[envVar]) {
      warnings.push(`⚠️  ${envVar} not set, using default: ${defaultValue}`);
    } else {
      console.log(`✅ ${envVar}: ${process.env[envVar]}`);
    }
  }
  
  // Display results
  console.log('\n📊 Validation Results:');
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warning => console.log(warning));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => console.log(error));
    console.log('\n💡 To fix these errors:');
    console.log('   1. Copy .env.example to .env.local');
    console.log('   2. Fill in your Supabase credentials');
    console.log('   3. Restart your development server');
  } else {
    console.log('\n🎉 All required environment variables are set!');
  }
  
  return isValid;
}

// Check if running in CI environment
const isCI = process.env.CI === 'true';

if (isCI) {
  console.log('🚀 Running in CI environment, skipping environment validation');
  process.exit(0);
}

// Run validation
const isValid = validateEnvironment();

// Exit with appropriate code
process.exit(isValid ? 0 : 1);
