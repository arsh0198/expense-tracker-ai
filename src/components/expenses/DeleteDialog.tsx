'use client';

import React, { useEffect } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, X } from 'lucide-react';

export const DeleteDialog: React.FC = () => {
  const { deletingExpense, setDeletingExpense, deleteExpense } = useExpenses();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && deletingExpense) {
        setDeletingExpense(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deletingExpense, setDeletingExpense]);

  if (!deletingExpense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Expense
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Are you sure you want to delete this expense record? This action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setDeletingExpense(null)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Expense Card Details */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              {deletingExpense.description}
            </div>
            <div className="text-slate-400 mt-0.5">
              {formatDate(deletingExpense.date, 'medium')} • {deletingExpense.category}
            </div>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(deletingExpense.amount)}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDeletingExpense(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => deleteExpense(deletingExpense.id)}
          >
            Delete Expense
          </Button>
        </div>
      </div>
    </div>
  );
};
