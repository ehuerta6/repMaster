// Reusable Loading component for RepMaster

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const loadingVariants = cva(
  // Base styles
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
      color: {
        default: 'text-primary',
        white: 'text-white',
        gray: 'text-gray-400',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      variant,
      size,
      color,
      text,
      fullScreen = false,
      overlay = false,
      ...props
    },
    ref
  ) => {
    const content = (
      <div
        className={cn(
          'flex flex-col items-center justify-center space-y-3',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className={cn(loadingVariants({ variant, size, color }))} />
        {text && (
          <p className="text-sm text-gray-600 animate-pulse">{text}</p>
        )}
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          {content}
        </div>
      );
    }

    if (overlay) {
      return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          {content}
        </div>
      );
    }

    return content;
  }
);

Loading.displayName = 'Loading';

// Loading Spinner component (alternative to the main Loading component)
export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, color, ...props }, ref) => {
    return (
      <div
        className={cn(loadingVariants({ variant, size, color, className }))}
        ref={ref}
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
      <div
        className={cn('flex space-x-1', className)}
        ref={ref}
        {...props}
      >
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

export { Loading, LoadingSpinner, LoadingDots, loadingVariants };
