// Reusable Loading component for RepMaster

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      variant: {
        default: 'border-2',
        thin: 'border',
        thick: 'border-4',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
        '2xl': 'h-16 w-16',
      },
      loadingColor: {
        default: 'text-blue-600',
        white: 'text-white',
        gray: 'text-gray-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loadingColor: 'default',
    },
  }
);

export interface LoadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loadingVariants> {
  text?: string;
  showText?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      variant,
      size,
      loadingColor,
      text = 'Loading...',
      showText = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <div className={cn(loadingVariants({ variant, size, loadingColor }))} />
        {showText && <span className='ml-2 text-sm text-gray-600'>{text}</span>}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

const loadingSpinnerVariants = cva(
  'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      variant: {
        default: 'border-2',
        thin: 'border',
        thick: 'border-4',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
        '2xl': 'h-16 w-16',
      },
      loadingColor: {
        default: 'text-blue-600',
        white: 'text-white',
        gray: 'text-gray-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loadingColor: 'default',
    },
  }
);

export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loadingSpinnerVariants> {}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, loadingColor, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          loadingVariants({ variant, size, loadingColor, className })
        )}
        {...props}
      />
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// Loading Dots component
export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  color?: 'default' | 'white' | 'gray';
}

const LoadingDots = React.forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size = 'default', color = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-1 w-1',
      default: 'h-2 w-2',
      lg: 'h-3 w-3',
    };

    const colorClasses = {
      default: 'bg-primary',
      white: 'bg-white',
      gray: 'bg-gray-400',
    };

    return (
      <div className={cn('flex space-x-1', className)} ref={ref} {...props}>
        <div
          className={cn(
            sizeClasses[size],
            colorClasses[color],
            'rounded-full animate-bounce'
          )}
          style={{ animationDelay: '0ms' }}
        />
        <div
          className={cn(
            sizeClasses[size],
            colorClasses[color],
            'rounded-full animate-bounce'
          )}
          style={{ animationDelay: '150ms' }}
        />
        <div
          className={cn(
            sizeClasses[size],
            colorClasses[color],
            'rounded-full animate-bounce'
          )}
          style={{ animationDelay: '300ms' }}
        />
      </div>
    );
  }
);

LoadingDots.displayName = 'LoadingDots';

export { Loading, LoadingSpinner, loadingVariants, loadingSpinnerVariants };
