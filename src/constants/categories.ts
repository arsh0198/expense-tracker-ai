import { ExpenseCategory } from '@/types/expense';
import {
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Receipt,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react';

export interface CategoryConfig {
  id: ExpenseCategory;
  label: string;
  icon: LucideIcon;
  color: string; // Hex for charts
  bgClass: string;
  textClass: string;
  borderClass: string;
  badgeClass: string;
  glowClass: string;
}

export const CATEGORIES: Record<ExpenseCategory, CategoryConfig> = {
  Food: {
    id: 'Food',
    label: 'Food & Dining',
    icon: Utensils,
    color: '#F97316', // Orange 500
    bgClass: 'bg-orange-500/10 dark:bg-orange-500/20',
    textClass: 'text-orange-600 dark:text-orange-400',
    borderClass: 'border-orange-200 dark:border-orange-800/60',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
    glowClass: 'shadow-orange-500/20',
  },
  Transportation: {
    id: 'Transportation',
    label: 'Transportation',
    icon: Car,
    color: '#3B82F6', // Blue 500
    bgClass: 'bg-blue-500/10 dark:bg-blue-500/20',
    textClass: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-200 dark:border-blue-800/60',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    glowClass: 'shadow-blue-500/20',
  },
  Entertainment: {
    id: 'Entertainment',
    label: 'Entertainment',
    icon: Film,
    color: '#8B5CF6', // Purple 500
    bgClass: 'bg-purple-500/10 dark:bg-purple-500/20',
    textClass: 'text-purple-600 dark:text-purple-400',
    borderClass: 'border-purple-200 dark:border-purple-800/60',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
    glowClass: 'shadow-purple-500/20',
  },
  Shopping: {
    id: 'Shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    color: '#EC4899', // Pink 500
    bgClass: 'bg-pink-500/10 dark:bg-pink-500/20',
    textClass: 'text-pink-600 dark:text-pink-400',
    borderClass: 'border-pink-200 dark:border-pink-800/60',
    badgeClass: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
    glowClass: 'shadow-pink-500/20',
  },
  Bills: {
    id: 'Bills',
    label: 'Bills & Utilities',
    icon: Receipt,
    color: '#10B981', // Emerald 500
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-200 dark:border-emerald-800/60',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    glowClass: 'shadow-emerald-500/20',
  },
  Other: {
    id: 'Other',
    label: 'Other',
    icon: MoreHorizontal,
    color: '#64748B', // Slate 500
    bgClass: 'bg-slate-500/10 dark:bg-slate-500/20',
    textClass: 'text-slate-600 dark:text-slate-400',
    borderClass: 'border-slate-200 dark:border-slate-800/60',
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800',
    glowClass: 'shadow-slate-500/20',
  },
};

export const CATEGORY_LIST: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const getCategoryConfig = (category: ExpenseCategory): CategoryConfig => {
  return (
    CATEGORIES[category] || {
      id: 'Other',
      label: category || 'Other',
      icon: MoreHorizontal,
      color: '#64748B',
      bgClass: 'bg-slate-500/10',
      textClass: 'text-slate-600',
      borderClass: 'border-slate-200',
      badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
      glowClass: 'shadow-slate-500/20',
    }
  );
};
