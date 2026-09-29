import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: 'positive' | 'negative' | 'neutral';
  };
  iconColorClass?: string;
  iconBgClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  iconColorClass = 'text-indigo-600 dark:text-indigo-400',
  iconBgClass = 'bg-indigo-500/10 dark:bg-indigo-500/20',
}) => {
  return (
    <Card hoverEffect className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={clsx('p-3 rounded-2xl shrink-0', iconBgClass, iconColorClass)}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        {badge && (
          <span
            className={clsx(
              'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md border',
              badge.variant === 'positive' &&
                'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
              badge.variant === 'negative' &&
                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
              badge.variant === 'neutral' &&
                'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            )}
          >
            {badge.text}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </span>
        )}
      </div>
    </Card>
  );
};
