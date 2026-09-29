'use client';

import React, { useState } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { useToast } from '@/context/ToastContext';
import { exportExpensesToCSV, exportExpensesToJSON } from '@/utils/exportCsv';
import { Button } from '@/components/ui/Button';
import {
  Wallet,
  Plus,
  Download,
  RotateCcw,
  Trash2,
  Menu,
  X,
  FileSpreadsheet,
  FileJson,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    expenses,
    filteredExpenses,
    setIsAddModalOpen,
    resetToSampleData,
    clearAllExpenses,
  } = useExpenses();
  const { showToast } = useToast();

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleExportCSV = (filteredOnly: boolean = false) => {
    const listToExport = filteredOnly ? filteredExpenses : expenses;
    if (listToExport.length === 0) {
      showToast('No expenses to export', 'error');
      return;
    }
    try {
      exportExpensesToCSV(
        listToExport,
        filteredOnly ? 'expenses-filtered' : 'expenses-all'
      );
      showToast(
        `Successfully exported ${listToExport.length} expenses to CSV`,
        'success'
      );
      setIsExportMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err: unknown) {
      showToast(
        err instanceof Error ? err.message : 'Failed to export CSV',
        'error'
      );
    }
  };

  const handleExportJSON = () => {
    if (expenses.length === 0) {
      showToast('No expenses to export', 'error');
      return;
    }
    exportExpensesToJSON(expenses);
    showToast(`Exported full backup (${expenses.length} records)`, 'success');
    setIsExportMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  SpendFlow
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  AI Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
                Personal Expense & Budget Tracker
              </p>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Export Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsExportMenuOpen(!isExportMenuOpen);
                  setIsDataMenuOpen(false);
                }}
                icon={<Download className="w-4 h-4" />}
              >
                Export
              </Button>

              {isExportMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsExportMenuOpen(false)}
                >
                  <button
                    onClick={() => handleExportCSV(false)}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold">Export All (CSV)</div>
                      <div className="text-[10px] text-slate-400">
                        {expenses.length} total transactions
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExportCSV(true)}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
                    <div>
                      <div className="font-semibold">Export Filtered (CSV)</div>
                      <div className="text-[10px] text-slate-400">
                        {filteredExpenses.length} currently visible
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={handleExportJSON}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <FileJson className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold">Export JSON Backup</div>
                      <div className="text-[10px] text-slate-400">
                        Full machine-readable backup
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Manage Data Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsDataMenuOpen(!isDataMenuOpen);
                  setIsExportMenuOpen(false);
                }}
                className="text-xs text-slate-600 dark:text-slate-400"
              >
                Data
              </Button>

              {isDataMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsDataMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      resetToSampleData();
                      setIsDataMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Reset to Demo Data</span>
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to clear all expenses? This will wipe your localStorage data.'
                        )
                      ) {
                        clearAllExpenses();
                        setIsDataMenuOpen(false);
                      }
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Data</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action: Add Expense */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Expense
            </Button>
          </div>

          {/* Mobile Right Quick Action & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
              className="px-3"
            >
              Add
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 dark:border-slate-800 space-y-1 animate-in fade-in duration-150">
            <button
              onClick={() => handleExportCSV(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Export All as CSV</span>
            </button>
            <button
              onClick={() => handleExportCSV(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
              <span>Export Visible/Filtered as CSV</span>
            </button>
            <button
              onClick={() => {
                resetToSampleData();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>Reset to Demo Data</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear all stored transactions?')) {
                  clearAllExpenses();
                  setIsMobileMenuOpen(false);
                }
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Data</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
