// Header component for RepMaster

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/lib/config/constants';

export interface HeaderProps {
  user?: {
    name: string;
    email: string;
  } | null;
  onLogout?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  className,
}) => {
  return (
    <header
      className={`bg-white border-b border-gray-200 px-4 py-3 ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {APP_CONFIG.name}
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/routines"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Routines
          </Link>
          <Link
            href="/workout"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Workout
          </Link>
          <Link
            href="/progress"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Progress
          </Link>
          <Link
            href="/calculator"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/history"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            History
          </Link>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
