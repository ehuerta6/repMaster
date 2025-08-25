import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';
import { supabase } from '@/lib/auth/supabase';

// Mock Supabase
jest.mock('@/lib/auth/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:3000',
  },
  writable: true,
});

// Test component to access auth context
const TestComponent = () => {
  const auth = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{auth.loading.toString()}</div>
      <div data-testid="authenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="user-id">{auth.user?.id || 'no-user'}</div>
      <div data-testid="error">{auth.error || 'no-error'}</div>
      
      <button onClick={() => auth.signUp('test@example.com', 'password123')}>
        Sign Up
      </button>
      <button onClick={() => auth.signIn('test@example.com', 'password123')}>
        Sign In
      </button>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <button onClick={() => auth.resetPassword('test@example.com')}>
        Reset Password
      </button>
      <button onClick={() => auth.updatePassword('newpassword123')}>
        Update Password
      </button>
      <button onClick={() => auth.clearError()}>Clear Error</button>
    </div>
  );
};

describe('AuthContext', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;
  let mockSubscription: { unsubscribe: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSubscription = { unsubscribe: jest.fn() };
    
    // Default mock implementations
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: mockSubscription },
    });
  });

  describe('AuthProvider', () => {
    it('renders children without crashing', () => {
      render(
        <AuthProvider>
          <div>Test Child</div>
        </AuthProvider>
      );
      
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('initializes with default state', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      expect(screen.getByTestId('loading')).toHaveTextContent('true');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user-id')).toHaveTextContent('no-user');
      expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    });

    it('handles initial session loading', async () => {
      const mockSession = {
        user: { id: 'user-123', email: 'test@example.com' },
        access_token: 'token-123',
        refresh_token: 'refresh-123',
      };
      
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user-id')).toHaveTextContent('user-123');
    });

    it('handles initial session error', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: { message: 'Session error', name: 'AuthError', status: 500 },
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('error')).toHaveTextContent('Session error');
    });

    it('sets up auth state change listener', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled();
    });

    it('cleans up subscription on unmount', () => {
      const { unmount } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      unmount();
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Authentication Methods', () => {
    beforeEach(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
    });

    describe('signUp', () => {
      it('successfully signs up user', async () => {
        const user = { id: 'user-123', email: 'test@example.com' };
        mockSupabase.auth.signUp.mockResolvedValue({
          data: { user, session: null },
          error: null,
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign Up'));

        await waitFor(() => {
          expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
            options: {
              emailRedirectTo: 'http://localhost:3000/auth/callback',
            },
          });
        });

        expect(screen.getByTestId('error')).toHaveTextContent(
          'Please check your email to confirm your account'
        );
      });

      it('handles signup error', async () => {
        mockSupabase.auth.signUp.mockResolvedValue({
          data: { user: null, session: null },
          error: { message: 'Email already exists', name: 'AuthError', status: 400 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign Up'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('Email already exists');
        });
      });
    });

    describe('signIn', () => {
      it('successfully signs in user', async () => {
        const user = { id: 'user-123', email: 'test@example.com' };
        const session = { user, access_token: 'token-123', refresh_token: 'refresh-123' };
        
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
          data: { user, session },
          error: null,
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign In'));

        await waitFor(() => {
          expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
          });
        });

        expect(screen.getByTestId('error')).toHaveTextContent('no-error');
      });

      it('handles signin error', async () => {
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
          data: { user: null, session: null },
          error: { message: 'Invalid credentials', name: 'AuthError', status: 400 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign In'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
        });
      });
    });

    describe('signOut', () => {
      it('successfully signs out user', async () => {
        mockSupabase.auth.signOut.mockResolvedValue({
          error: null,
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign Out'));

        await waitFor(() => {
          expect(mockSupabase.auth.signOut).toHaveBeenCalled();
        });

        expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
        expect(screen.getByTestId('user-id')).toHaveTextContent('no-user');
      });

      it('handles signout error', async () => {
        mockSupabase.auth.signOut.mockResolvedValue({
          error: { message: 'Signout failed', name: 'AuthError', status: 500 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign Out'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('Signout failed');
        });
      });
    });

    describe('resetPassword', () => {
      it('successfully sends reset password email', async () => {
        mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
          error: null,
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Reset Password'));

        await waitFor(() => {
          expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
            'test@example.com',
            {
              redirectTo: 'http://localhost:3000/auth/reset-password',
            }
          );
        });

        expect(screen.getByTestId('error')).toHaveTextContent('no-error');
      });

      it('handles reset password error', async () => {
        mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
          error: { message: 'User not found', name: 'AuthError', status: 404 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Reset Password'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('User not found');
        });
      });
    });

    describe('updatePassword', () => {
      it('successfully updates password', async () => {
        mockSupabase.auth.updateUser.mockResolvedValue({
          data: { user: { id: 'user-123' } },
          error: null,
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Update Password'));

        await waitFor(() => {
          expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({
            password: 'newpassword123',
          });
        });

        expect(screen.getByTestId('error')).toHaveTextContent('no-error');
      });

      it('handles update password error', async () => {
        mockSupabase.auth.updateUser.mockResolvedValue({
          data: { user: null },
          error: { message: 'Password too weak', name: 'AuthError', status: 400 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Update Password'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('Password too weak');
        });
      });
    });

    describe('clearError', () => {
      it('clears error state', async () => {
        // First set an error
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
          data: { user: null, session: null },
          error: { message: 'Test error', name: 'AuthError', status: 400 },
        });

        const userEventInstance = userEvent.setup();
        await userEventInstance.click(screen.getByText('Sign In'));

        await waitFor(() => {
          expect(screen.getByTestId('error')).toHaveTextContent('Test error');
        });

        // Then clear it
        await userEventInstance.click(screen.getByText('Clear Error'));

        expect(screen.getByTestId('error')).toHaveTextContent('no-error');
      });
    });
  });

  describe('useAuth Hook', () => {
    it('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => render(<TestComponent />)).toThrow(
        'useAuth must be used within an AuthProvider'
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('Computed Values', () => {
    it('correctly computes isAuthenticated', async () => {
      const mockSession = {
        user: { id: 'user-123', email: 'test@example.com' },
        access_token: 'token-123',
        refresh_token: 'refresh-123',
      };
      
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    it('correctly computes isLoading', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Initially loading
      expect(screen.getByTestId('loading')).toHaveTextContent('true');

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });
    });
  });
});
