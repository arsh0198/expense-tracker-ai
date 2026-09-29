import { Expense } from '@/types/expense';

/**
 * Converts array of expenses into a sanitized CSV string and triggers browser download
 */
export const exportExpensesToCSV = (
  expenses: Expense[],
  filenamePrefix: string = 'expenses'
) => {
  if (!expenses || expenses.length === 0) {
    throw new Error('No expenses available to export.');
  }

  const headers = ['ID', 'Date', 'Category', 'Description', 'Amount', 'Notes', 'Created At'];

  const escapeCSV = (value: string | number | undefined | null): string => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = expenses.map((exp) => [
    escapeCSV(exp.id),
    escapeCSV(exp.date),
    escapeCSV(exp.category),
    escapeCSV(exp.description),
    escapeCSV(exp.amount.toFixed(2)),
    escapeCSV(exp.notes || ''),
    escapeCSV(exp.createdAt),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const todayStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}-${todayStr}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports all expenses as a formatted JSON backup file
 */
export const exportExpensesToJSON = (expenses: Expense[]) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(expenses, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  const todayStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `expenses-backup-${todayStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
