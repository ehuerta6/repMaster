// Sidebar component for RepMaster

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  Home,
  Calendar,
  Dumbbell,
  TrendingUp,
  Calculator,
  History,
  Settings,
  Menu,
  X,
} from 'lucide-react';

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Routines',
    href: '/routines',
    icon: Calendar,
  },
  {
    name: 'Workout',
    href: '/workout',
    icon: Dumbbell,
  },
  {
    name: 'Progress',
    href: '/progress',
    icon: TrendingUp,
  },
  {
    name: 'Calculator',
    href: '/calculator',
    icon: Calculator,
  },
  {
    name: 'History',
    href: '/history',
    icon: History,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onToggle,
  className,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-lg font-bold text-gray-900">RepMaster</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
                onClick={() => {
                  // Close mobile sidebar when clicking a link
                  if (onToggle && window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-white' : 'text-gray-400'
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>RepMaster v1.0.0</p>
            <p className="mt-1">Built with Next.js & TailwindCSS</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Mobile menu button component
export const MobileMenuButton: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ isOpen, onToggle, className }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        className
      )}
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
};
