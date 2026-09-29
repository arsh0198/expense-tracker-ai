import React from 'react';
import { ExpenseCategory } from '@/types/expense';
import { getCategoryConfig } from '@/constants/categories';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  category: ExpenseCategory;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  category,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const config = getCategoryConfig(category);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-lg border font-medium transition-colors',
          config.badgeClass,
          sizeClasses[size],
          className
        )
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </span>
  );
};
