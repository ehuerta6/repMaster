'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// Form validation interface
interface FormErrors {
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  general?: string | undefined;
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
const PASSWORD_RULES = [
  /[A-Z]/, // Uppercase letter
  /[a-z]/, // Lowercase letter
  /\d/, // Number
  /[!@#$%^&*(),.?":{}|<>]/, // Special character
];

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

  // Clear errors when auth error changes
  useEffect(() => {
    if (error) {
      setErrors(prev => ({ ...prev, general: error }));
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
    if (password.length < 8)
      return 'Password must be at least 8 characters long';
    if (!PASSWORD_RULES.every(rule => rule.test(password))) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
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

  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    const newErrors: FormErrors = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Calculate password strength
  const getPasswordStrength = (
    password: string
  ): { score: number; label: string; color: string } => {
    if (!password)
      return { score: 0, label: 'Very Weak', color: 'text-red-500' };

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'text-red-500' },
      1: { label: 'Weak', color: 'text-orange-500' },
      2: { label: 'Fair', color: 'text-yellow-500' },
      3: { label: 'Good', color: 'text-blue-500' },
      4: { label: 'Strong', color: 'text-green-500' },
      5: { label: 'Very Strong', color: 'text-green-600' },
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
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
            name='email'
            placeholder='Enter your email address'
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            leftIcon={<Mail className='w-4 h-4' />}
            disabled={loading}
            required
          />

          {/* Password Input */}
          <div className='space-y-2'>
            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              leftIcon={<Lock className='w-4 h-4' />}
              rightIcon={
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              }
              disabled={loading}
              required
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>Password strength:</span>
                  <span
                    className={`font-medium ${passwordStrength.color.replace('text-', 'bg-')}`}
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
                      className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>At least 8 characters</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One uppercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One lowercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>One number</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`w-2 h-2 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}
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
            name='confirmPassword'
            placeholder='Confirm your password'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            leftIcon={<Lock className='w-4 h-4' />}
            rightIcon={
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='text-gray-400 hover:text-gray-600'
              >
                {showConfirmPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            }
            disabled={loading}
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
