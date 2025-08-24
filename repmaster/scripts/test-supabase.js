#!/usr/bin/env node

/**
 * Test script to verify Supabase connection for RepMaster
 * Run this script to test that your Supabase configuration is working
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Check if Supabase environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please check your .env.local file');
  process.exit(1);
}

console.log('🔍 Testing Supabase connection...\n');

// Test basic connection
async function testSupabaseConnection() {
  try {
    // Import Supabase client
    const { createClient } = require('@supabase/supabase-js');
    
    // Create client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    console.log('✅ Supabase client created successfully');
    
    // Test basic query
    console.log('🔍 Testing basic query...');
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Table "profiles" does not exist yet');
        console.log('   This is expected if you haven\'t set up the database schema');
        console.log('   See SUPABASE_SETUP.md for instructions');
      } else {
        throw error;
      }
    } else {
      console.log('✅ Basic query successful');
    }
    
    // Test authentication
    console.log('🔍 Testing authentication...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      throw authError;
    }
    
    console.log('✅ Authentication test successful');
    console.log(`   Current session: ${authData.session ? 'Active' : 'None'}`);
    
    console.log('\n🎉 Supabase connection test completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   ✅ URL: ${supabaseUrl}`);
    console.log(`   ✅ Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
    console.log(`   ✅ Client: Created successfully`);
    console.log(`   ✅ Auth: Working`);
    
    if (!data) {
      console.log(`   ⚠️  Database: Schema not set up yet`);
      console.log(`      Run the SQL from SUPABASE_SETUP.md to create tables`);
    } else {
      console.log(`   ✅ Database: Schema ready`);
    }
    
  } catch (error) {
    console.error('\n❌ Supabase connection test failed:');
    console.error('   Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check if your Supabase project is running');
      console.error('   2. Verify the project URL is correct');
      console.error('   3. Check if the project is paused (free tier)');
    } else if (error.code === 'PGRST301') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check if your anon key is correct');
      console.error('   2. Verify the key hasn\'t been rotated');
      console.error('   3. Check project settings in Supabase dashboard');
    }
    
    process.exit(1);
  }
}

// Run the test
testSupabaseConnection();
