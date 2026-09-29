'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseCategory } from '@/types/expense';
import { CATEGORY_LIST, getCategoryConfig } from '@/constants/categories';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { X, DollarSign, Calendar, FileText, Check } from 'lucide-react';

export const ExpenseModal: React.FC = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    editingExpense,
    setEditingExpense,
    addExpense,
    updateExpense,
  } = useExpenses();

  const isOpen = isAddModalOpen || editingExpense !== null;
  const isEditing = editingExpense !== null;

  // Form state
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // Form errors
  const [errors, setErrors] = useState<{
    description?: string;
    amount?: string;
    date?: string;
  }>({});

  const handleClose = useCallback(() => {
    setIsAddModalOpen(false);
    setEditingExpense(null);
  }, [setIsAddModalOpen, setEditingExpense]);

  // Populate or reset form whenever modal opens or active expense changes
  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNotes(editingExpense.notes || '');
      setErrors({});
    } else if (isAddModalOpen) {
      const today = new Date().toISOString().split('T')[0];
      setDescription('');
      setAmount('');
      setCategory('Food');
      setDate(today);
      setNotes('');
      setErrors({});
    }
  }, [editingExpense, isAddModalOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: {
      description?: string;
      amount?: string;
      date?: string;
    } = {};

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than $0';
    }

    if (!date) {
      newErrors.date = 'Please select a valid transaction date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));

    if (isEditing && editingExpense) {
      updateExpense(editingExpense.id, {
        description,
        amount: parsedAmount,
        category,
        date,
        notes,
      });
    } else {
      addExpense({
        description,
        amount: parsedAmount,
        category,
        date,
        notes,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isEditing
                ? 'Modify transaction details and save changes'
                : 'Enter the details of your recent transaction'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount & Date side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount */}
            <Input
              label="Amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={errors.amount}
              leftIcon={<DollarSign className="w-4 h-4" />}
              autoFocus={!isEditing}
              required
            />

            {/* Date */}
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
              leftIcon={<Calendar className="w-4 h-4" />}
              required
            />
          </div>

          {/* Description */}
          <Input
            label="Description"
            type="text"
            placeholder="e.g. Grocery Store, Netflix, Gas..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            leftIcon={<FileText className="w-4 h-4" />}
            required
          />

          {/* Category Selector with visual buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORY_LIST.map((cat) => {
                const config = getCategoryConfig(cat);
                const Icon = config.icon;
                const isSelected = category === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? `${config.badgeClass} ring-2 ring-indigo-500/50 shadow-sm`
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={2}
              placeholder="Add any extra details, tags, or payment methods..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-300 dark:border-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Save Changes' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
