'use client';

import React from 'react';
import { Expense } from '@/types/expense';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Edit2, Trash2 } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export const ExpenseTableRow: React.FC<ExpenseItemProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
      {/* Date */}
      <td className="py-3.5 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {formatDate(expense.date, 'medium')}
          </span>
          <span className="text-[11px] text-slate-400">
            {formatDate(expense.date, 'relative')}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <Badge category={expense.category} size="sm" />
      </td>

      {/* Description & Notes */}
      <td className="py-3.5 px-4 text-sm text-slate-900 dark:text-slate-100 max-w-xs">
        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
          {expense.description}
        </div>
        {expense.notes && (
          <div className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-sm">
            {expense.notes}
          </div>
        )}
      </td>

      {/* Amount */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
          {formatCurrency(expense.amount)}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(expense)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="Edit expense"
            aria-label="Edit expense"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(expense)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete expense"
            aria-label="Delete expense"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export const ExpenseCard: React.FC<ExpenseItemProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <Badge category={expense.category} size="sm" />
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
            {expense.description}
          </h4>
          {expense.notes && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {expense.notes}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(expense.amount)}
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {formatDate(expense.date, 'short')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span className="text-slate-400">
          {formatDate(expense.date, 'relative')}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(expense)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(expense)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
