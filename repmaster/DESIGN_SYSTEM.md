# RepMaster Design System

## Overview

The RepMaster Design System provides a comprehensive set of design tokens, components, and guidelines to ensure consistency and quality across the application. This system is built on top of TailwindCSS and provides gym-specific design elements.

## Design Principles

1. **Simplicity First**: Clean, uncluttered interfaces that focus on functionality
2. **Mobile-First**: Designed for mobile devices with responsive scaling to desktop
3. **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios and focus states
4. **Performance**: Lightweight design that doesn't impact app performance
5. **Gym-Focused**: Design elements that resonate with fitness enthusiasts

## Color System

### Primary Colors

The primary color palette is based on a professional blue that conveys trust, strength, and reliability.

```css
/* Primary Blue Scale */
primary-50: #f0f9ff   /* Lightest - backgrounds */
primary-100: #e0f2fe  /* Very light - subtle backgrounds */
primary-200: #bae6fd  /* Light - borders, dividers */
primary-300: #7dd3fc  /* Medium light - hover states */
primary-400: #38bdf8  /* Medium - accents, icons */
primary-500: #0ea5e9  /* Base - primary actions, links */
primary-600: #0284c7  /* Dark - hover states */
primary-700: #0369a1  /* Darker - active states */
primary-800: #075985  /* Very dark - text on light */
primary-900: #0c4a6e  /* Darkest - headings */
primary-950: #082f49  /* Extreme dark - special cases */
```

### Secondary Colors

Purple-based secondary colors for accents and highlights.

```css
/* Secondary Purple Scale */
secondary-50: #fdf4ff   /* Lightest */
secondary-500: #d946ef  /* Base - accents */
secondary-900: #701a75  /* Darkest */
```

### Semantic Colors

#### Success (Green)

- **Usage**: Achievements, completed sets, positive progress
- **Base**: `success-500: #22c55e`
- **Variants**: `success-50` through `success-950`

#### Warning (Yellow/Orange)

- **Usage**: Attention, incomplete sets, reminders
- **Base**: `warning-500: #f59e0b`
- **Variants**: `warning-50` through `warning-950`

#### Error (Red)

- **Usage**: Failures, missed sets, critical issues
- **Base**: `error-500: #ef4444`
- **Variants**: `error-50` through `error-950`

### Gym-Specific Colors

```css
/* Gym Equipment Colors */
gym-steel: #64748b    /* Steel plates, bars */
gym-iron: #475569     /* Iron weights */
gym-rubber: #334155   /* Rubber plates */
gym-chalk: #f1f5f9    /* Chalk dust */
gym-sweat: #0ea5e9    /* Sweat blue */
gym-energy: #fbbf24   /* Energy yellow */
```

### Neutral Colors

Grayscale palette for text, backgrounds, and borders.

```css
/* Neutral Scale */
neutral-50: #fafafa   /* Lightest backgrounds */
neutral-100: #f5f5f5  /* Light backgrounds */
neutral-200: #e5e5e5  /* Borders, dividers */
neutral-300: #d4d4d4  /* Disabled states */
neutral-400: #a3a3a3  /* Placeholder text */
neutral-500: #737373   /* Secondary text */
neutral-600: #525252   /* Body text */
neutral-700: #404040   /* Strong text */
neutral-800: #262626   /* Headings */
neutral-900: #171717   /* Primary text */
neutral-950: #0a0a0a   /* Dark backgrounds */
```

## Typography

### Font Families

#### Primary (Sans)

- **Font**: Inter
- **Usage**: Body text, buttons, forms
- **Fallbacks**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

#### Display

- **Font**: Poppins
- **Usage**: Headings, titles, hero text
- **Fallbacks**: Inter, system-ui, sans-serif

#### Mono

- **Font**: JetBrains Mono
- **Usage**: Code, numbers, technical data
- **Fallbacks**: 'Fira Code', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace

### Font Sizes

```css
/* Typography Scale */
xs: 0.75rem      /* 12px - Captions, labels */
sm: 0.875rem     /* 14px - Small text */
base: 1rem       /* 16px - Body text */
lg: 1.125rem     /* 18px - Large body */
xl: 1.25rem      /* 20px - Subheadings */
2xl: 1.5rem      /* 24px - Section headings */
3xl: 1.875rem    /* 30px - Page headings */
4xl: 2.25rem     /* 36px - Hero headings */
5xl: 3rem        /* 48px - Large hero */
6xl: 3.75rem     /* 60px - Extra large */
7xl: 4.5rem      /* 72px - Massive */
8xl: 6rem        /* 96px - Extreme */
9xl: 8rem        /* 128px - Monumental */
```

### Line Heights

- **Tight**: 1.2 (headings)
- **Normal**: 1.5 (body text)
- **Relaxed**: 1.75 (large text)

## Spacing

### Base Spacing Scale

```css
/* Spacing Scale */
0: 0px
1: 0.25rem    /* 4px */
2: 0.5rem     /* 8px */
3: 0.75rem    /* 12px */
4: 1rem       /* 16px */
5: 1.25rem    /* 20px */
6: 1.5rem     /* 24px */
8: 2rem       /* 32px */
10: 2.5rem    /* 40px */
12: 3rem      /* 48px */
16: 4rem      /* 64px */
20: 5rem      /* 80px */
24: 6rem      /* 96px */
32: 8rem      /* 128px */
40: 10rem     /* 160px */
48: 12rem     /* 192px */
56: 14rem     /* 224px */
64: 16rem     /* 256px */
```

### Custom Spacing

```css
/* Additional Spacing Values */
18: 4.5rem    /* 72px */
88: 22rem     /* 352px */
128: 32rem    /* 512px */
144: 36rem    /* 576px */
```

## Shadows

### Shadow System

```css
/* Shadow Scale */
soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)
medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
strong: 0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)
```

### Glow Effects

```css
/* Glow Shadows */
glow: 0 0 20px rgba(14, 165, 233, 0.3)           /* Primary glow */
glow-success: 0 0 20px rgba(34, 197, 94, 0.3)     /* Success glow */
glow-warning: 0 0 20px rgba(245, 158, 11, 0.3)   /* Warning glow */
glow-error: 0 0 20px rgba(239, 68, 68, 0.3)      /* Error glow */
```

## Border Radius

### Radius Scale

```css
/* Border Radius */
none: 0px
sm: 0.125rem    /* 2px */
base: 0.25rem   /* 4px */
md: 0.375rem    /* 6px */
lg: 0.5rem      /* 8px */
xl: 0.75rem     /* 12px */
2xl: 1rem       /* 16px */
3xl: 1.5rem     /* 24px */
4xl: 2rem       /* 32px */
5xl: 2.5rem     /* 40px */
full: 9999px    /* Fully rounded */
```

## Animations

### Animation Durations

```css
/* Animation Timing */
fast: 150ms
normal: 250ms
slow: 350ms
```

### Animation Curves

```css
/* Easing Functions */
ease-in-out: cubic-bezier(0.4, 0, 0.6, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in: cubic-bezier(0.4, 0, 1, 1)
```

### Keyframe Animations

```css
/* Custom Animations */
fadeIn: Opacity 0 → 1
slideUp: TranslateY(10px) → 0 with opacity
slideDown: TranslateY(-10px) → 0 with opacity
scaleIn: Scale(0.95) → 1 with opacity
bounceGentle: Gentle vertical bounce
progress: Horizontal progress bar animation
```

## Breakpoints

### Responsive Breakpoints

```css
/* Mobile-First Breakpoints */
xs: 475px      /* Extra small phones */
sm: 640px      /* Small phones */
md: 768px      /* Tablets */
lg: 1024px     /* Small laptops */
xl: 1280px     /* Large laptops */
2xl: 1536px    /* Desktop monitors */
```

## Z-Index Scale

### Layering System

```css
/* Z-Index Scale */
0: Base content
10: Dropdowns
20: Sticky headers
30: Modals
40: Tooltips
50: Popovers
60: Notifications
70: Overlays
80: Loading states
90: Toast messages
100: Maximum overlay
```

## Component Patterns

### Button Variants

```css
/* Primary Button */
.btn-primary: bg-primary-500 text-white hover:bg-primary-600

/* Secondary Button */
.btn-secondary: bg-secondary-500 text-white hover:bg-secondary-600

/* Success Button */
.btn-success: bg-success-500 text-white hover:bg-success-600

/* Warning Button */
.btn-warning: bg-warning-500 text-white hover:bg-warning-600

/* Error Button */
.btn-error: bg-error-500 text-white hover:bg-error-600

/* Outline Button */
.btn-outline: border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white
```

### Card Patterns

```css
/* Basic Card */
.card: bg-white rounded-lg shadow-soft p-6

/* Elevated Card */
.card-elevated: bg-white rounded-lg shadow-medium p-6

/* Interactive Card */
.card-interactive: bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow
```

### Form Patterns

```css
/* Input Field */
.input: border border-neutral-300 rounded-md px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200

/* Input Error */
.input-error: border border-error-300 rounded-md px-3 py-2 focus:border-error-500 focus:ring-2 focus:ring-error-200

/* Input Success */
.input-success: border border-success-300 rounded-md px-3 py-2 focus:border-success-500 focus:ring-2 focus:ring-success-200
```

## Utility Classes

### Custom Utilities

```css
/* Text Glow */
.text-glow: text-shadow with primary color glow

/* Background Gradient */
.bg-gradient-gym: Linear gradient from primary to secondary

/* Border Glow */
.border-glow: Glowing border effect

/* Soft Glow Shadow */
.shadow-soft-glow: Soft shadow with primary color tint
```

### Responsive Utilities

```css
/* Container */
.container-responsive: Responsive container with proper padding

/* Glass Effect */
.glass-effect: Backdrop blur with transparency
```

## Accessibility

### Focus States

- **Focus Outline**: 2px solid primary-400
- **Focus Offset**: 2px from element
- **Focus Color**: High contrast primary color

### Color Contrast

- **Text on Light**: Minimum 4.5:1 ratio
- **Text on Dark**: Minimum 4.5:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

### Touch Targets

- **Minimum Size**: 44x44px for mobile
- **Spacing**: Minimum 8px between interactive elements

## Dark Mode

### Dark Mode Colors

- **Background**: neutral-950
- **Surface**: neutral-900
- **Text**: neutral-100
- **Borders**: neutral-800
- **Primary**: Adjusted for dark backgrounds

### Dark Mode Implementation

- **System Preference**: Respects `prefers-color-scheme: dark`
- **Manual Toggle**: Future implementation planned
- **Color Inversion**: Automatic for primary colors

## Usage Guidelines

### Do's

- Use semantic colors for their intended purpose
- Maintain consistent spacing using the spacing scale
- Use appropriate font sizes for hierarchy
- Apply shadows consistently for depth
- Test accessibility with screen readers

### Don'ts

- Don't use colors outside their semantic meaning
- Don't create custom spacing values
- Don't override font families without reason
- Don't use shadows for non-elevated elements
- Don't ignore accessibility requirements

## Implementation

### TailwindCSS Classes

All design tokens are available as TailwindCSS utility classes:

```jsx
// Example usage
<div className='bg-primary-500 text-white p-6 rounded-lg shadow-medium'>
  <h2 className='text-2xl font-display mb-4'>Workout Complete!</h2>
  <p className='text-neutral-700'>Great job on your training session.</p>
</div>
```

### CSS Custom Properties

Design tokens are also available as CSS custom properties:

```css
.my-component {
  background-color: var(--color-primary-500);
  color: var(--color-neutral-100);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-medium);
}
```

### Component Props

Components accept design token values as props:

```jsx
<Button variant='primary' size='lg' className='shadow-glow'>
  Start Workout
</Button>
```

## Future Enhancements

### Planned Features

- **Theme Switching**: Manual light/dark mode toggle
- **Custom Themes**: User-defined color schemes
- **Component Library**: React component documentation
- **Design Tokens**: Export to design tools
- **Accessibility**: Enhanced focus management

### Version History

- **v1.0**: Initial design system with TailwindCSS integration
- **v1.1**: Enhanced accessibility and dark mode support
- **v1.2**: Component patterns and utility classes
- **v1.3**: Advanced animations and interactions

---

**Last Updated**: [Current Date]  
**Version**: 1.0  
**Maintainer**: RepMaster Development Team
