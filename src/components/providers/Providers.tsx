'use client';

import React from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { ExpenseProvider } from '@/context/ExpenseContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </ToastProvider>
  );
};
