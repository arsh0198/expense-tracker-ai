'use client';

import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SpendingOverview } from '@/components/dashboard/SpendingOverview';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseModal } from '@/components/expenses/ExpenseModal';
import { DeleteDialog } from '@/components/expenses/DeleteDialog';
import { Button } from '@/components/ui/Button';
import { Plus, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const { isHydrated, setIsAddModalOpen, resetToSampleData } =
    useExpenses();

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 animate-pulse">
        <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80" />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          <div className="h-36 rounded-3xl bg-indigo-950/40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[380px] rounded-2xl bg-slate-200/60 dark:bg-slate-800/60" />
            <div className="h-[380px] rounded-2xl bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Welcome & Quick Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Smart Financial Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Personal Expense Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-xl">
              Track your daily spending, analyze category distributions, and monitor your monthly financial habits effortlessly.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              onClick={resetToSampleData}
              icon={<Sparkles className="w-4 h-4 text-amber-500" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md text-xs"
            >
              Demo Data
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
              className="bg-white text-indigo-900 hover:bg-slate-100 shadow-lg shadow-black/20 text-xs sm:text-sm"
            >
              + Add Expense
            </Button>
          </div>
        </div>

        {/* 1. Spending Overview (KPI Cards) */}
        <section aria-labelledby="overview-title">
          <h2 id="overview-title" className="sr-only">
            Spending Overview
          </h2>
          <SpendingOverview />
        </section>

        {/* 2. Visual Analytics (Charts Section) */}
        <section aria-labelledby="analytics-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              id="analytics-title"
              className="text-lg font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Spending Analytics
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryChart />
            <TrendChart />
          </div>
        </section>

        {/* 3. Expense Management & Table */}
        <section aria-labelledby="transactions-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="transactions-title"
                className="text-lg font-bold text-slate-900 dark:text-white tracking-tight"
              >
                Expense Records
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Filter, search, edit, and organize all transactions
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <ExpenseFilters />

          {/* Transactions List / Table */}
          <ExpenseList />
        </section>
      </main>

      {/* Global Modals & Dialogs */}
      <ExpenseModal />
      <DeleteDialog />

      {/* Footer */}
      <Footer />
    </div>
  );
}
