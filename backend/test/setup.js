require('dotenv').config({ path: '.env.test' });

// Mock Supabase client
jest.mock('../src/config/SupabaseClient', () => ({
  checkConnection: jest.fn().mockResolvedValue(true),
  auth: {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn()
  }
}));

// Mock auth middleware
jest.mock('../src/middleware/auth.middleware', () => ({
  authenticateToken: jest.fn((req, res, next) => next())
})); 