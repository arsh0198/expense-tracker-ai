'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  Expense,
  ExpenseFilter,
  ExpenseStats,
} from '@/types/expense';
import { generateInitialExpenses } from '@/constants/initialData';
import { calculateExpenseStats } from '@/utils/calculations';
import { getPresetDateRange } from '@/utils/formatters';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'expense_tracker_ai_data_v1';

interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilter;
  stats: ExpenseStats;
  isHydrated: boolean;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  editingExpense: Expense | null;
  setEditingExpense: (expense: Expense | null) => void;
  deletingExpense: Expense | null;
  setDeletingExpense: (expense: Expense | null) => void;
  addExpense: (data: {
    amount: number;
    category: Expense['category'];
    description: string;
    date: string;
    notes?: string;
  }) => void;
  updateExpense: (
    id: string,
    data: {
      amount: number;
      category: Expense['category'];
      description: string;
      date: string;
      notes?: string;
    }
  ) => void;
  deleteExpense: (id: string) => void;
  resetToSampleData: () => void;
  clearAllExpenses: () => void;
  setFilter: (filter: Partial<ExpenseFilter>) => void;
  resetFilters: () => void;
}

const defaultFilters: ExpenseFilter = {
  search: '',
  category: 'ALL',
  datePreset: 'all',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const [filters, setFiltersState] = useState<ExpenseFilter>(defaultFilters);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  // Initialize from localStorage or seed initial data
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExpenses(parsed);
        } else {
          const seeds = generateInitialExpenses();
          setExpenses(seeds);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
        }
      } else {
        const seeds = generateInitialExpenses();
        setExpenses(seeds);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
      }
    } catch (e) {
      console.error('Error loading expenses from localStorage', e);
      setExpenses(generateInitialExpenses());
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on state change
  const saveToStorage = useCallback((data: Expense[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, []);

  const addExpense = useCallback(
    (data: {
      amount: number;
      category: Expense['category'];
      description: string;
      date: string;
      notes?: string;
    }) => {
      const newExpense: Expense = {
        id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        amount: Number(data.amount),
        category: data.category,
        description: data.description.trim(),
        date: data.date,
        notes: data.notes?.trim() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setExpenses((prev) => {
        const updated = [newExpense, ...prev];
        saveToStorage(updated);
        return updated;
      });

      showToast(`Added expense "${newExpense.description}"`, 'success');
      setIsAddModalOpen(false);
    },
    [saveToStorage, showToast]
  );

  const updateExpense = useCallback(
    (
      id: string,
      data: {
        amount: number;
        category: Expense['category'];
        description: string;
        date: string;
        notes?: string;
      }
    ) => {
      setExpenses((prev) => {
        const updated = prev.map((exp) =>
          exp.id === id
            ? {
                ...exp,
                amount: Number(data.amount),
                category: data.category,
                description: data.description.trim(),
                date: data.date,
                notes: data.notes?.trim() || '',
                updatedAt: new Date().toISOString(),
              }
            : exp
        );
        saveToStorage(updated);
        return updated;
      });

      showToast(`Updated expense "${data.description}"`, 'success');
      setEditingExpense(null);
    },
    [saveToStorage, showToast]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => {
        const itemToDelete = prev.find((e) => e.id === id);
        const updated = prev.filter((exp) => exp.id !== id);
        saveToStorage(updated);
        if (itemToDelete) {
          showToast(`Deleted expense "${itemToDelete.description}"`, 'info');
        }
        return updated;
      });
      setDeletingExpense(null);
    },
    [saveToStorage, showToast]
  );

  const resetToSampleData = useCallback(() => {
    const seeds = generateInitialExpenses();
    setExpenses(seeds);
    saveToStorage(seeds);
    showToast('Reset to demo sample data', 'info');
  }, [saveToStorage, showToast]);

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
    saveToStorage([]);
    showToast('Cleared all expense records', 'info');
  }, [saveToStorage, showToast]);

  const setFilter = useCallback((partial: Partial<ExpenseFilter>) => {
    setFiltersState((prev) => {
      const next = { ...prev, ...partial };
      // If preset changed, auto-compute start and end dates
      if (partial.datePreset && partial.datePreset !== 'custom') {
        const { startDate, endDate } = getPresetDateRange(partial.datePreset);
        next.startDate = startDate;
        next.endDate = endDate;
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  // Filter and sort expenses
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((exp) => {
        // Category filter
        if (filters.category !== 'ALL' && exp.category !== filters.category) {
          return false;
        }

        // Search filter (description, notes, category)
        if (filters.search.trim() !== '') {
          const q = filters.search.toLowerCase();
          const matchesDesc = exp.description.toLowerCase().includes(q);
          const matchesNotes = exp.notes?.toLowerCase().includes(q);
          const matchesCat = exp.category.toLowerCase().includes(q);
          if (!matchesDesc && !matchesNotes && !matchesCat) {
            return false;
          }
        }

        // Date range filter
        if (filters.startDate && exp.date < filters.startDate) {
          return false;
        }
        if (filters.endDate && exp.date > filters.endDate) {
          return false;
        }

        // Amount range filter
        if (filters.minAmount !== undefined && exp.amount < filters.minAmount) {
          return false;
        }
        if (filters.maxAmount !== undefined && exp.amount > filters.maxAmount) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let compare = 0;
        if (filters.sortBy === 'date') {
          compare = a.date.localeCompare(b.date);
        } else if (filters.sortBy === 'amount') {
          compare = a.amount - b.amount;
        } else if (filters.sortBy === 'category') {
          compare = a.category.localeCompare(b.category);
        } else if (filters.sortBy === 'description') {
          compare = a.description.localeCompare(b.description);
        }
        return filters.sortOrder === 'asc' ? compare : -compare;
      });
  }, [expenses, filters]);

  // Overall statistics calculated from filtered or total expenses
  const stats = useMemo(() => {
    return calculateExpenseStats(expenses);
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        filters,
        stats,
        isHydrated,
        isAddModalOpen,
        setIsAddModalOpen,
        editingExpense,
        setEditingExpense,
        deletingExpense,
        setDeletingExpense,
        addExpense,
        updateExpense,
        deleteExpense,
        resetToSampleData,
        clearAllExpenses,
        setFilter,
        resetFilters,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
