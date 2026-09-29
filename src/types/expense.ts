export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // YYYY-MM-DD
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DateRangePreset =
  | 'all'
  | 'this_month'
  | 'last_month'
  | 'last_30_days'
  | 'this_year'
  | 'custom';

export interface ExpenseFilter {
  search: string;
  category: ExpenseCategory | 'ALL';
  datePreset: DateRangePreset;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy: 'date' | 'amount' | 'category' | 'description';
  sortOrder: 'asc' | 'desc';
}

export interface CategoryBreakdownItem {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  count: number;
  color: string;
}

export interface MonthlyTrendItem {
  month: string; // e.g. "Aug 2026"
  monthKey: string; // e.g. "2026-08"
  amount: number;
}

export interface ExpenseStats {
  totalSpending: number;
  thisMonthSpending: number;
  lastMonthSpending: number;
  monthOverMonthPercentage: number;
  avgTransaction: number;
  transactionCount: number;
  highestExpense: Expense | null;
  topCategory: CategoryBreakdownItem | null;
  categoryBreakdown: CategoryBreakdownItem[];
  monthlyTrend: MonthlyTrendItem[];
}
