'use client';

import React, { useState, useEffect } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryConfig } from '@/constants/categories';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

export const CategoryChart: React.FC = () => {
  const { stats, isHydrated } = useExpenses();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = stats.categoryBreakdown.filter((item) => item.amount > 0);
  const hasData = chartData.length > 0;

  if (!mounted || !isHydrated) {
    return (
      <Card className="h-[380px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full min-h-[380px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Category Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Distribution of all tracked spending
          </p>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <PieChartIcon className="w-4 h-4" />
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <PieChartIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No spending data available
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Add some expenses to see your category spending breakdown.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          {/* Donut Chart */}
          <div className="w-full md:w-1/2 h-[220px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const catConfig = getCategoryConfig(data.category);
                      return (
                        <div className="bg-slate-900 text-white px-3.5 py-2 rounded-xl shadow-xl border border-slate-800 text-xs">
                          <div className="flex items-center gap-2 font-semibold">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: data.color }}
                            />
                            {catConfig.label}
                          </div>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-sm font-bold">
                              {formatCurrency(data.amount)}
                            </span>
                            <span className="text-slate-400">
                              ({data.percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="amount"
                  nameKey="category"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Total
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {formatCurrency(stats.totalSpending)}
              </span>
            </div>
          </div>

          {/* Breakdown Legend List */}
          <div className="w-full md:w-1/2 flex flex-col gap-2.5">
            {chartData.map((item) => {
              const catConfig = getCategoryConfig(item.category);
              const Icon = catConfig.icon;
              return (
                <div
                  key={item.category}
                  className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="p-1.5 rounded-lg shrink-0"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};
