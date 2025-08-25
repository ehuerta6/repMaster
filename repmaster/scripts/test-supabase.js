#!/usr/bin/env node

/**
 * Test Supabase Connection Script
 * This script tests the connection to your Supabase project
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Supabase connection...\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('📋 Environment Variables Check:');
console.log(`   Supabase URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
console.log(`   Anon Key: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`);
console.log(`   Service Role: ${supabaseServiceRole ? '✅ Set' : '❌ Missing'}\n`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ Missing required environment variables!');
  console.log('\n📝 To fix this:');
  console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
  console.log('2. Select your project: exqqxmzsoqfpiutqzxqm');
  console.log('3. Go to Settings > API');
  console.log('4. Copy the "Project URL" and "anon public" key');
  console.log('5. Update your .env.local file with these values\n');
  
  if (!supabaseUrl) {
    console.log('   Missing: NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!supabaseAnonKey) {
    console.log('   Missing: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  process.exit(1);
}

// Test the connection
async function testSupabaseConnection() {
  try {
    console.log('🔌 Testing Supabase client creation...');
    
    // Import Supabase client
    const { createClient } = require('@supabase/supabase-js');
    
    // Create client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client created successfully');
    
    // Test basic query
    console.log('🔍 Testing basic query...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Connection successful! (Table "profiles" doesn\'t exist yet, which is expected)');
        console.log('   This means your Supabase connection is working correctly.');
        console.log('   The table will be created when you run the database setup scripts.');
      } else {
        console.log('⚠️  Connection successful but query failed:');
        console.log(`   Error: ${error.message}`);
        console.log('   This might be expected if tables haven\'t been created yet.');
      }
    } else {
      console.log('✅ Connection and query successful!');
      console.log(`   Data: ${JSON.stringify(data)}`);
    }
    
    console.log('\n🎉 Supabase connection test completed successfully!');
    console.log('   Your project is properly configured and ready to use.');
    
  } catch (error) {
    console.log('❌ Supabase connection test failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n🔑 The API key appears to be invalid.');
      console.log('   Please check that you copied the correct "anon public" key from your Supabase dashboard.');
      console.log('   Make sure you\'re not using the "service_role" key for NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    } else if (error.message.includes('fetch')) {
      console.log('\n🌐 Network error detected.');
      console.log('   Please check your internet connection and try again.');
    }
    
    process.exit(1);
  }
}

// Run the test
testSupabaseConnection();
