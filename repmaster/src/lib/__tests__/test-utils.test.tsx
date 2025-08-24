import React from 'react';
import { render, screen } from '@/lib/test-utils';
import { createMockUser, createMockRoutine, setupAllMocks } from '@/lib/test-utils';

// Test component for testing
const TestComponent: React.FC = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('Test Utils', () => {
  beforeEach(() => {
    setupAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Custom Render Function', () => {
    it('should render component with providers', () => {
      render(<TestComponent />);
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should render component with correct text', () => {
      render(<TestComponent />);
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });
  });

  describe('Mock Data Factories', () => {
    it('should create mock user with default values', () => {
      const user = createMockUser();
      
      expect(user).toEqual({
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });
    });

    it('should create mock user with custom overrides', () => {
      const user = createMockUser({
        name: 'Custom User',
        email: 'custom@example.com',
      });
      
      expect(user.name).toBe('Custom User');
      expect(user.email).toBe('custom@example.com');
      expect(user.id).toBe('test-user-id'); // Default value preserved
    });

    it('should create mock routine with default values', () => {
      const routine = createMockRoutine();
      
      expect(routine).toEqual({
        id: 'test-routine-id',
        name: 'Test Routine',
        description: 'A test routine for testing',
        frequency: 'every-2-days',
        user_id: 'test-user-id',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });
    });

    it('should create mock routine with custom overrides', () => {
      const routine = createMockRoutine({
        name: 'Custom Routine',
        frequency: 'every-day',
      });
      
      expect(routine.name).toBe('Custom Routine');
      expect(routine.frequency).toBe('every-day');
      expect(routine.id).toBe('test-routine-id'); // Default value preserved
    });
  });

  describe('Test Environment Setup', () => {
    it('should setup all mocks correctly', () => {
      setupAllMocks();
      
      // Check that IntersectionObserver is mocked
      expect(window.IntersectionObserver).toBeDefined();
      
      // Check that ResizeObserver is mocked
      expect(window.ResizeObserver).toBeDefined();
      
      // Check that matchMedia is mocked
      expect(window.matchMedia).toBeDefined();
      
      // Check that fetch is mocked
      expect(global.fetch).toBeDefined();
    });
  });
});

// Test for Jest configuration
describe('Jest Configuration', () => {
  it('should have correct test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('should support async/await', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });

  it('should support ES6 modules', () => {
    const testModule = { test: 'value' };
    expect(testModule.test).toBe('value');
  });
});

// Test for React Testing Library
describe('React Testing Library', () => {
  it('should support screen queries', () => {
    render(<TestComponent />);
    
    // Test different query methods
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.queryByText('Non-existent')).not.toBeInTheDocument();
  });

  it('should support user interactions', () => {
    const TestButton: React.FC = () => (
      <button onClick={() => alert('clicked')}>Click me</button>
    );
    
    render(<TestButton />);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });
});
