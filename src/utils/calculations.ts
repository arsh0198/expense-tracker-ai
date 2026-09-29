import {
  Expense,
  ExpenseStats,
  ExpenseCategory,
  CategoryBreakdownItem,
  MonthlyTrendItem,
} from '@/types/expense';
import { CATEGORIES, CATEGORY_LIST } from '@/constants/categories';

export const calculateExpenseStats = (expenses: Expense[]): ExpenseStats => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 - 11

  let totalSpending = 0;
  let thisMonthSpending = 0;
  let lastMonthSpending = 0;
  let highestExpense: Expense | null = null;

  // Month identifiers: "YYYY-MM"
  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  
  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

  const categoryTotals: Record<ExpenseCategory, { amount: number; count: number }> = {
    Food: { amount: 0, count: 0 },
    Transportation: { amount: 0, count: 0 },
    Entertainment: { amount: 0, count: 0 },
    Shopping: { amount: 0, count: 0 },
    Bills: { amount: 0, count: 0 },
    Other: { amount: 0, count: 0 },
  };

  const monthlyTotals: Record<string, number> = {};

  // Initialize last 6 months in trend to guarantee order
  const last6MonthKeys: { key: string; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    last6MonthKeys.push({ key, label });
    monthlyTotals[key] = 0;
  }

  for (const exp of expenses) {
    const amt = Number(exp.amount) || 0;
    totalSpending += amt;

    // Check highest
    if (!highestExpense || amt > highestExpense.amount) {
      highestExpense = exp;
    }

    // Category aggregation
    if (categoryTotals[exp.category]) {
      categoryTotals[exp.category].amount += amt;
      categoryTotals[exp.category].count += 1;
    } else {
      categoryTotals.Other.amount += amt;
      categoryTotals.Other.count += 1;
    }

    // Month breakdown
    if (exp.date) {
      const expMonthKey = exp.date.substring(0, 7);
      if (expMonthKey === currentMonthKey) {
        thisMonthSpending += amt;
      } else if (expMonthKey === lastMonthKey) {
        lastMonthSpending += amt;
      }

      if (monthlyTotals[expMonthKey] !== undefined) {
        monthlyTotals[expMonthKey] += amt;
      } else {
        monthlyTotals[expMonthKey] = amt;
      }
    }
  }

  // Month over month percentage
  let monthOverMonthPercentage = 0;
  if (lastMonthSpending > 0) {
    monthOverMonthPercentage =
      ((thisMonthSpending - lastMonthSpending) / lastMonthSpending) * 100;
  } else if (thisMonthSpending > 0) {
    monthOverMonthPercentage = 100;
  }

  // Average transaction
  const transactionCount = expenses.length;
  const avgTransaction = transactionCount > 0 ? totalSpending / transactionCount : 0;

  // Category breakdown array
  const categoryBreakdown: CategoryBreakdownItem[] = CATEGORY_LIST.map((cat) => {
    const stat = categoryTotals[cat];
    const percentage = totalSpending > 0 ? (stat.amount / totalSpending) * 100 : 0;
    return {
      category: cat,
      amount: stat.amount,
      percentage: Number(percentage.toFixed(1)),
      count: stat.count,
      color: CATEGORIES[cat]?.color || '#64748B',
    };
  }).sort((a, b) => b.amount - a.amount);

  const topCategory =
    categoryBreakdown.length > 0 && categoryBreakdown[0].amount > 0
      ? categoryBreakdown[0]
      : null;

  // Monthly trend array for last 6 months
  const monthlyTrend: MonthlyTrendItem[] = last6MonthKeys.map(({ key, label }) => ({
    month: label,
    monthKey: key,
    amount: Math.round((monthlyTotals[key] || 0) * 100) / 100,
  }));

  return {
    totalSpending: Math.round(totalSpending * 100) / 100,
    thisMonthSpending: Math.round(thisMonthSpending * 100) / 100,
    lastMonthSpending: Math.round(lastMonthSpending * 100) / 100,
    monthOverMonthPercentage: Math.round(monthOverMonthPercentage * 10) / 10,
    avgTransaction: Math.round(avgTransaction * 100) / 100,
    transactionCount,
    highestExpense,
    topCategory,
    categoryBreakdown,
    monthlyTrend,
  };
};
