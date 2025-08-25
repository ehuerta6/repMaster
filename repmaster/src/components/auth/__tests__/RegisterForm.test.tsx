import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '../RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock authentication context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock UI components with proper prop handling
jest.mock('@/components/ui/Button', () => ({
  Button: ({
    children,
    onClick,
    type,
    disabled,
    loading,
    className,
    ...props
  }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  ),
}));

jest.mock('@/components/ui/Input', () => ({
  Input: ({
    label,
    type,
    value,
    onChange,
    error,
    leftIcon,
    rightIcon,
    id,
    placeholder,
    disabled,
    required,
    ...props
  }: any) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <div>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          id={inputId}
          type={type}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <div className='error' role='alert'>
            {error}
          </div>
        )}
        {leftIcon && <span className='left-icon'>{leftIcon}</span>}
        {rightIcon && <span className='right-icon'>{rightIcon}</span>}
      </div>
    );
  },
}));

jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('RegisterForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockAuth = {
    signUp: jest.fn(),
    loading: false,
    error: null,
    clearError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue(mockAuth);
  });

  describe('Form Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<RegisterForm />);

      expect(
        screen.getByRole('heading', { name: 'Create Account' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Join RepMaster to start tracking your fitness journey'
        )
      ).toBeInTheDocument();

      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: 'Create Account' })
      ).toBeInTheDocument();
      expect(screen.getByText('Already have an account?')).toBeInTheDocument();
      expect(screen.getByText('Sign in here')).toBeInTheDocument();
    });

    it('renders terms and privacy links', () => {
      render(<RegisterForm />);

      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });
  });

  describe('Form Structure', () => {
    it('has proper form structure with all required fields', () => {
      render(<RegisterForm />);

      const form = screen
        .getByRole('button', { name: 'Create Account' })
        .closest('form');
      expect(form).toBeInTheDocument();

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
      expect(confirmPasswordInput).toHaveAttribute('required');
    });
  });

  describe('Accessibility', () => {
    it('has proper labels for all form fields', () => {
      render(<RegisterForm />);

      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it('has proper button types', () => {
      render(<RegisterForm />);

      const submitButton = screen.getByRole('button', {
        name: 'Create Account',
      });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Navigation Links', () => {
    it('has correct login link', () => {
      render(<RegisterForm />);

      const loginLink = screen.getByText('Sign in here');
      expect(loginLink).toHaveAttribute('href', '/auth/login');
    });

    it('has correct terms and privacy links', () => {
      render(<RegisterForm />);

      const termsLink = screen.getByText('Terms of Service');
      const privacyLink = screen.getByText('Privacy Policy');

      expect(termsLink).toHaveAttribute('href', '/terms');
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });
  });

  describe('Component Integration', () => {
    it('integrates with authentication context', () => {
      render(<RegisterForm />);

      // Component should render without errors
      expect(
        screen.getByRole('heading', { name: 'Create Account' })
      ).toBeInTheDocument();
    });
  });
});
