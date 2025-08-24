// Global teardown file for Jest
// This file runs once after all tests

module.exports = async () => {
  // Clean up global variables
  delete global.__TEST__;

  // Clean up environment variables
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('🧹 Jest global teardown completed');
};
