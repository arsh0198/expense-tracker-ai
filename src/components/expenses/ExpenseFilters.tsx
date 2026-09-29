'use client';

import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseFilter, DateRangePreset } from '@/types/expense';
import { CATEGORY_LIST, getCategoryConfig } from '@/constants/categories';
import {
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  RotateCcw,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ExpenseFilters: React.FC = () => {
  const { filters, setFilter, resetFilters, filteredExpenses, expenses } =
    useExpenses();

  const isFiltered =
    filters.search !== '' ||
    filters.category !== 'ALL' ||
    filters.datePreset !== 'all' ||
    filters.startDate !== '' ||
    filters.endDate !== '' ||
    filters.sortBy !== 'date' ||
    filters.sortOrder !== 'desc';

  const datePresets: { id: DateRangePreset; label: string }[] = [
    { id: 'all', label: 'All Time' },
    { id: 'this_month', label: 'This Month' },
    { id: 'last_month', label: 'Last Month' },
    { id: 'last_30_days', label: 'Last 30 Days' },
    { id: 'this_year', label: 'This Year' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Row: Search and Quick Controls */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by description, notes, or category..."
            value={filters.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => setFilter({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Date Preset Dropdown and Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Range Selector */}
          <div className="relative flex items-center">
            <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={filters.datePreset}
              onChange={(e) =>
                setFilter({ datePreset: e.target.value as DateRangePreset })
              }
              className="pl-8 pr-7 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
            >
              {datePresets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-');
                setFilter({
                  sortBy: by as ExpenseFilter['sortBy'],
                  sortOrder: order as ExpenseFilter['sortOrder'],
                });
              }}
              className="pl-8 pr-7 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
              <option value="description-asc">Description (A-Z)</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Custom Date Inputs (only if datePreset === 'custom') */}
      {filters.datePreset === 'custom' && (
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            From:
          </span>
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => setFilter({ startDate: e.target.value })}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
          />
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            To:
          </span>
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => setFilter({ endDate: e.target.value })}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
          />
        </div>
      )}

      {/* Category Pills Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setFilter({ category: 'ALL' })}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filters.category === 'ALL'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Categories
        </button>

        {CATEGORY_LIST.map((cat) => {
          const config = getCategoryConfig(cat);
          const Icon = config.icon;
          const isSelected = filters.category === cat;

          return (
            <button
              key={cat}
              onClick={() => setFilter({ category: isSelected ? 'ALL' : cat })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? `${config.badgeClass} ring-2 ring-indigo-500/40 shadow-sm`
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Matching Results Count bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Showing{' '}
          <strong className="text-slate-800 dark:text-slate-200">
            {filteredExpenses.length}
          </strong>{' '}
          of {expenses.length} transaction{expenses.length === 1 ? '' : 's'}
        </span>
        {isFiltered && (
          <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
            <Filter className="w-3 h-3" /> Filters active
          </span>
        )}
      </div>
    </div>
  );
};
