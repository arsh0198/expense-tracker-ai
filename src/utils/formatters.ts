import { DateRangePreset } from '@/types/expense';

/**
 * Formats a number into standard localized currency ($XX.XX)
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD'
): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a date string (YYYY-MM-DD) into user-friendly representation
 */
export const formatDate = (
  dateStr: string,
  style: 'short' | 'medium' | 'long' | 'relative' = 'medium'
): string => {
  if (!dateStr) return '';
  // Split to prevent timezone shift issues with new Date(str)
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const dateObj = new Date(year, month, day);

  if (isNaN(dateObj.getTime())) return dateStr;

  if (style === 'relative') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(year, month, day);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === -1) return 'Tomorrow';
    if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  }

  if (style === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  if (style === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Formats percentage with sign (+12.5% or -8.2%)
 */
export const formatPercentage = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0.0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

/**
 * Helper to compute start and end dates for quick filter presets
 */
export const getPresetDateRange = (
  preset: DateRangePreset
): { startDate: string; endDate: string } => {
  const now = new Date();
  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = formatYMD(now);

  if (preset === 'all') {
    return { startDate: '', endDate: '' };
  }

  if (preset === 'this_month') {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { startDate: formatYMD(firstDay), endDate: formatYMD(lastDay) };
  }

  if (preset === 'last_month') {
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
    return { startDate: formatYMD(firstDay), endDate: formatYMD(lastDay) };
  }

  if (preset === 'last_30_days') {
    const past30 = new Date(now);
    past30.setDate(past30.getDate() - 30);
    return { startDate: formatYMD(past30), endDate: todayStr };
  }

  if (preset === 'this_year') {
    const firstDay = new Date(now.getFullYear(), 0, 1);
    const lastDay = new Date(now.getFullYear(), 11, 31);
    return { startDate: formatYMD(firstDay), endDate: formatYMD(lastDay) };
  }

  return { startDate: '', endDate: '' };
};
