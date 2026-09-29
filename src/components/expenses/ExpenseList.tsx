'use client';

import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseTableRow, ExpenseCard } from './ExpenseItem';
import { formatCurrency } from '@/utils/formatters';
import { Receipt, Plus, Sparkles, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ExpenseList: React.FC = () => {
  const {
    filteredExpenses,
    expenses,
    setIsAddModalOpen,
    setEditingExpense,
    setDeletingExpense,
    resetToSampleData,
    resetFilters,
  } = useExpenses();

  const totalFilteredAmount = filteredExpenses.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  // If no expenses exist at all in localStorage
  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No expenses recorded yet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Start building your budget by recording your first expense, or load sample demo data to explore the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add First Expense
          </Button>
          <Button
            variant="secondary"
            onClick={resetToSampleData}
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
          >
            Load Sample Demo Data
          </Button>
        </div>
      </div>
    );
  }

  // If expenses exist but current filter matches zero items
  if (filteredExpenses.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No matching transactions found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Try adjusting your search keywords, category filter, or date range preset.
        </p>
        <div className="mt-5">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Clear All Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
      {/* List Header / Summary */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Transactions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {filteredExpenses.length} record{filteredExpenses.length === 1 ? '' : 's'} matching criteria
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(totalFilteredAmount)}
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <ExpenseTableRow
                key={expense.id}
                expense={expense}
                onEdit={(exp) => setEditingExpense(exp)}
                onDelete={(exp) => setDeletingExpense(exp)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden p-4 space-y-3">
        {filteredExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onEdit={(exp) => setEditingExpense(exp)}
            onDelete={(exp) => setDeletingExpense(exp)}
          />
        ))}
      </div>
    </div>
  );
};
