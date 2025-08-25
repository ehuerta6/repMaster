'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

// Form validation interface
interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Form data interface
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
const PASSWORD_RULES = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { signUp, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear errors when form data changes
  useEffect(() => {
    if (errors.email || errors.password || errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
      }));
    }
  }, [formData.email, formData.password, formData.confirmPassword]);

  // Clear auth error when component mounts or when error changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  // Validate email format
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  // Validate password strength
  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < PASSWORD_RULES.minLength) {
      return `Password must be at least ${PASSWORD_RULES.minLength} characters long`;
    }
    if (!PASSWORD_RULES.hasUppercase.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!PASSWORD_RULES.hasLowercase.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!PASSWORD_RULES.hasNumber.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!PASSWORD_RULES.hasSpecialChar.test(password)) {
      return 'Password must contain at least one special character';
    }
    return undefined;
  };

  // Validate password confirmation
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string | undefined => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return undefined;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signUp(formData.email, formData.password);

      if (result.success) {
        if (result.error) {
          // Email confirmation required
          setErrors({ general: result.error });
        } else {
          // Registration successful, redirect to login
          router.push(
            '/auth/login?message=Registration successful! Please check your email to confirm your account.'
          );
        }
      } else {
        setErrors({
          general: result.error || 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Password strength indicator
  const getPasswordStrength = (
    password: string
  ): { score: number; label: string; color: string } => {
    let score = 0;

    if (password.length >= PASSWORD_RULES.minLength) score++;
    if (PASSWORD_RULES.hasUppercase.test(password)) score++;
    if (PASSWORD_RULES.hasLowercase.test(password)) score++;
    if (PASSWORD_RULES.hasNumber.test(password)) score++;
    if (PASSWORD_RULES.hasSpecialChar.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-orange-500' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' },
    };

    return {
      score,
      ...strengthMap[score as keyof typeof strengthMap],
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Card className='w-full max-w-md mx-auto'>
      <div className='p-6'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Create Account</h1>
          <p className='text-gray-600 mt-2'>
            Join RepMaster to start tracking your fitness journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
          <Input
            label='Email Address'
            type='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            error={errors.email}
            leftIcon={
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
              </svg>
            }
            disabled={isSubmitting}
            required
          />

          {/* Password Input */}
          <div className='space-y-2'>
            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Create a strong password'
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              error={errors.password}
              leftIcon={
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              }
              rightIcon={
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              }
              disabled={isSubmitting}
              required
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>Password strength:</span>
                  <span
                    className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <div className='text-xs text-gray-500 space-y-1'>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${formData.password.length >= PASSWORD_RULES.minLength ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>At least {PASSWORD_RULES.minLength} characters</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${PASSWORD_RULES.hasUppercase.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One uppercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${PASSWORD_RULES.hasLowercase.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One lowercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${PASSWORD_RULES.hasNumber.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One number</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${PASSWORD_RULES.hasSpecialChar.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One special character</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <Input
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm your password'
            value={formData.confirmPassword}
            onChange={e => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            leftIcon={
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            }
            rightIcon={
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='text-gray-400 hover:text-gray-600'
              >
                {showConfirmPassword ? (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                )}
              </button>
            }
            disabled={isSubmitting}
            required
          />

          {/* General Error Display */}
          {errors.general && (
            <div className='p-3 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-sm text-red-600' role='alert'>
                {errors.general}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='default'
            size='lg'
            fullWidth
            loading={isSubmitting}
            disabled={loading || isSubmitting}
            className='mt-6'
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>

          {/* Terms and Privacy Notice */}
          <p className='text-xs text-gray-500 text-center'>
            By creating an account, you agree to our{' '}
            <a href='/terms' className='text-primary hover:underline'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href='/privacy' className='text-primary hover:underline'>
              Privacy Policy
            </a>
          </p>
        </form>

        {/* Login Link */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <a
              href='/auth/login'
              className='font-medium text-primary hover:text-primary/80 hover:underline'
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RegisterForm;
