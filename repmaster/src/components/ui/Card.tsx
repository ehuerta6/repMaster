// Reusable Card component for RepMaster

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const cardVariants = cva(
  // Base styles
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-white',
        elevated: 'border-gray-200 bg-white shadow-lg',
        outlined: 'border-gray-300 bg-transparent',
        filled: 'border-transparent bg-gray-50',
      },
      padding: {
        none: '',
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      fullWidth: true,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, fullWidth, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cn(cardVariants({ variant, padding, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Title component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// Card Description component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        className={cn('text-sm text-muted-foreground', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

// Card Content component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cn('p-6 pt-0', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cn('flex items-center p-6 pt-0', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
