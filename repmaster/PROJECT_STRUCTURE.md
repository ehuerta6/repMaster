# RepMaster Project Structure

This document outlines the project structure and organization for the RepMaster application.

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── forgot-password/     # Password recovery page
│   ├── routines/                 # Routine management pages
│   │   └── create/              # Create routine page
│   ├── workout/                  # Workout execution pages
│   ├── progress/                 # Progress tracking pages
│   ├── calculator/               # Plate calculator pages
│   ├── history/                  # Workout history pages
│   ├── settings/                 # Settings pages
│   │   └── import-export/       # Import/export functionality
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx          # Button component
│   │   ├── Input.tsx           # Input component
│   │   ├── Card.tsx            # Card component
│   │   ├── Loading.tsx         # Loading states
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   ├── Modal.tsx           # Modal dialogs
│   │   └── index.ts            # UI components export
│   ├── auth/                    # Authentication components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Application header
│   │   ├── Footer.tsx          # Application footer
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── index.ts            # Layout components export
│   ├── routines/                # Routine management components
│   ├── workout/                 # Workout execution components
│   ├── progress/                # Progress tracking components
│   ├── calculator/              # Plate calculator components
│   ├── history/                 # History components
│   └── import-export/           # Import/export components
├── contexts/                     # React Context providers
├── hooks/                        # Custom React hooks
├── lib/                         # Utility libraries and configurations
│   ├── auth/                    # Authentication utilities
│   ├── db/                      # Database types and utilities
│   │   ├── types.ts            # Database type definitions
│   │   └── index.ts            # Database exports
│   ├── validation/              # Form validation schemas
│   │   ├── schemas.ts          # Zod validation schemas
│   │   └── index.ts            # Validation exports
│   ├── config/                  # Application configuration
│   │   ├── constants.ts        # App constants and config
│   │   └── index.ts            # Config exports
│   ├── utils/                   # Utility functions
│   │   ├── helpers.ts          # Common helper functions
│   │   ├── cn.ts               # Class name utility
│   │   └── index.ts            # Utils exports
│   ├── calculator/              # Plate calculator logic
│   ├── import-export/           # Import/export utilities
│   ├── offline/                 # Offline functionality
│   └── test-utils.tsx          # Testing utilities
└── __tests__/                   # Test files
    ├── basic.test.ts           # Basic tests
    ├── simple.test.ts          # Simple tests
    └── test-utils.test.tsx     # Test utilities tests
```

## Component Organization

### UI Components (`src/components/ui/`)
Base UI components that are reused throughout the application:
- **Button**: Various button styles and sizes
- **Input**: Form input fields with validation states
- **Card**: Content containers with different variants
- **Loading**: Loading states and spinners
- **ErrorBoundary**: Error handling and fallbacks
- **Modal**: Modal dialogs and overlays

### Layout Components (`src/components/layout/`)
Components that define the application structure:
- **Header**: Top navigation bar with user menu
- **Footer**: Bottom footer with links and information
- **Sidebar**: Left navigation sidebar (collapsible on mobile)

### Feature Components
Components organized by feature area:
- **Auth**: Login, registration, and password recovery
- **Routines**: Routine creation, editing, and management
- **Workout**: Workout execution and tracking
- **Progress**: Progress visualization and analytics
- **Calculator**: Plate calculator and weight distribution
- **History**: Workout history and records
- **Import/Export**: Data import/export functionality

## Library Organization (`src/lib/`)

### Configuration (`src/lib/config/`)
- **constants.ts**: Application-wide constants and configuration values
- **index.ts**: Centralized exports for configuration

### Database (`src/lib/db/`)
- **types.ts**: TypeScript interfaces for database entities
- **index.ts**: Database-related exports

### Validation (`src/lib/validation/`)
- **schemas.ts**: Zod validation schemas for forms
- **index.ts**: Validation-related exports

### Utilities (`src/lib/utils/`)
- **helpers.ts**: Common utility functions
- **cn.ts**: Class name utility for conditional styling
- **index.ts**: Utility function exports

### Specialized Libraries
- **auth/**: Authentication utilities and helpers
- **calculator/**: Plate calculation algorithms
- **import-export/**: Data import/export processing
- **offline/**: Offline functionality and sync

## Import Patterns

### Component Imports
```typescript
// Import from UI components
import { Button, Input, Card } from '@/components/ui';

// Import from layout components
import { Header, Footer, Sidebar } from '@/components/layout';

// Import specific components
import { Button } from '@/components/ui/Button';
```

### Utility Imports
```typescript
// Import utilities
import { formatDate, convertWeight } from '@/lib/utils';

// Import configuration
import { APP_CONFIG, EXERCISE_CONFIG } from '@/lib/config';

// Import validation schemas
import { loginSchema, createRoutineSchema } from '@/lib/validation';

// Import database types
import { User, Routine, Exercise } from '@/lib/db';
```

## Testing Structure

Tests are organized alongside the code they test:
- Unit tests for components in `__tests__/` directories
- Test utilities in `src/lib/test-utils.tsx`
- Jest configuration for Next.js integration

## Key Design Principles

1. **Component Reusability**: UI components are designed to be flexible and reusable
2. **Type Safety**: Full TypeScript coverage with proper interfaces
3. **Consistent Styling**: TailwindCSS with custom design system
4. **Accessibility**: ARIA labels and keyboard navigation support
5. **Mobile First**: Responsive design starting from mobile breakpoints
6. **Performance**: Optimized imports and lazy loading where appropriate

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `helpers.ts`, `dateUtils.ts`)
- **Types**: camelCase (e.g., `types.ts`, `schemas.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `APP_CONFIG`, `MAX_WEIGHT`)
- **Tests**: Same name as source file with `.test.ts` or `.test.tsx` extension

## Adding New Features

When adding new features:

1. **Create the page** in the appropriate `app/` directory
2. **Add components** to the relevant feature directory
3. **Define types** in `src/lib/db/types.ts` if needed
4. **Add validation schemas** in `src/lib/validation/schemas.ts`
5. **Update constants** in `src/lib/config/constants.ts` if needed
6. **Write tests** for new functionality
7. **Update this documentation** to reflect changes

This structure ensures maintainability, scalability, and consistency across the application.
