// Footer component for RepMaster

import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config/constants';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-gray-50 border-t border-gray-200 px-4 py-8 ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              {APP_CONFIG.description}
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/routines"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Routines
                </Link>
              </li>
              <li>
                <Link
                  href="/workout"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Workout
                </Link>
              </li>
              <li>
                <Link
                  href="/progress"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-500">
                Version {APP_CONFIG.version}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
