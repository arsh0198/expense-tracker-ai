'use client';

import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { StatCard } from './StatCard';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import {
  DollarSign,
  Calendar,
  PieChart as PieChartIcon,
  ReceiptText,
} from 'lucide-react';
import { getCategoryConfig } from '@/constants/categories';

export const SpendingOverview: React.FC = () => {
  const { stats, expenses } = useExpenses();

  // Determine month-over-month trend badge
  const momVal = stats.monthOverMonthPercentage;
  let momBadgeVariant: 'positive' | 'negative' | 'neutral' = 'neutral';
  let momText = '0%';
  if (momVal > 0) {
    // Spending more is technically an increase (negative financial impact usually, but we clearly label it)
    momBadgeVariant = 'negative';
    momText = `${formatPercentage(momVal)} vs last month`;
  } else if (momVal < 0) {
    momBadgeVariant = 'positive';
    momText = `${formatPercentage(momVal)} vs last month`;
  } else {
    momText = 'Same as last month';
  }

  const topCategoryConfig = stats.topCategory
    ? getCategoryConfig(stats.topCategory.category)
    : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* 1. Total Spending */}
      <StatCard
        title="Total Spending"
        value={formatCurrency(stats.totalSpending)}
        subtitle={`Across ${expenses.length} transaction${expenses.length === 1 ? '' : 's'}`}
        icon={DollarSign}
        iconBgClass="bg-indigo-500/10 dark:bg-indigo-500/20"
        iconColorClass="text-indigo-600 dark:text-indigo-400"
      />

      {/* 2. This Month's Spending */}
      <StatCard
        title="This Month"
        value={formatCurrency(stats.thisMonthSpending)}
        icon={Calendar}
        badge={{
          text: momText,
          variant: momBadgeVariant,
        }}
        iconBgClass="bg-emerald-500/10 dark:bg-emerald-500/20"
        iconColorClass="text-emerald-600 dark:text-emerald-400"
      />

      {/* 3. Top Category */}
      <StatCard
        title="Top Category"
        value={stats.topCategory ? stats.topCategory.category : 'N/A'}
        subtitle={
          stats.topCategory
            ? `${formatCurrency(stats.topCategory.amount)} (${stats.topCategory.percentage}% of spend)`
            : 'No transactions yet'
        }
        icon={topCategoryConfig ? topCategoryConfig.icon : PieChartIcon}
        iconBgClass={topCategoryConfig ? topCategoryConfig.bgClass : 'bg-slate-100'}
        iconColorClass={topCategoryConfig ? topCategoryConfig.textClass : 'text-slate-600'}
      />

      {/* 4. Average Transaction */}
      <StatCard
        title="Avg. Transaction"
        value={formatCurrency(stats.avgTransaction)}
        subtitle={
          stats.highestExpense
            ? `Max: ${formatCurrency(stats.highestExpense.amount)}`
            : 'No data'
        }
        icon={ReceiptText}
        iconBgClass="bg-amber-500/10 dark:bg-amber-500/20"
        iconColorClass="text-amber-600 dark:text-amber-400"
      />
    </div>
  );
};
