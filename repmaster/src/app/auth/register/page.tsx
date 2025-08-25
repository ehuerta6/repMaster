import React from 'react';
import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account - RepMaster',
  description:
    'Join RepMaster to start tracking your fitness journey with personalized routines and progress tracking.',
};

export default function RegisterPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <RegisterForm />
      </div>
    </div>
  );
}
