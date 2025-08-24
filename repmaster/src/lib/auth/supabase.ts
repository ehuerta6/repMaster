// Supabase client configuration for RepMaster
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';

// Validate environment variables before creating client
if (!env.supabase.url || !env.supabase.anonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create Supabase client
export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    // Auto refresh token
    autoRefreshToken: true,
    // Persist session in localStorage
    persistSession: true,
    // Detect session in URL
    detectSessionInUrl: true,
  },
  // Global headers
  global: {
    headers: {
      'X-Client-Info': 'repmaster-web',
    },
  },
  // Real-time configuration
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Export types for convenience
export type { User, Session, AuthError } from '@supabase/supabase-js';

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(env.supabase.url && env.supabase.anonKey);
};

// Helper function to get Supabase URL
export const getSupabaseUrl = (): string => {
  return env.supabase.url;
};

// Helper function to get Supabase anon key
export const getSupabaseAnonKey = (): string => {
  return env.supabase.anonKey;
};

export default supabase;
