'use client';

import React, { useState, useEffect } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export const TrendChart: React.FC = () => {
  const { stats, isHydrated } = useExpenses();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isHydrated) {
    return (
      <Card className="h-[380px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </Card>
    );
  }

  const data = stats.monthlyTrend;
  const hasData = data.some((d) => d.amount > 0);

  return (
    <Card className="flex flex-col h-full min-h-[380px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Spending History (6 Months)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monthly aggregate totals
          </p>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No history yet
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Start logging your expenses to see monthly comparisons over time.
          </p>
        </div>
      ) : (
        <div className="flex-1 pt-6 pb-2 w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                className="dark:opacity-20"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(val) => (val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`)}
              />
              <Tooltip
                cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 8 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value as number;
                    return (
                      <div className="bg-slate-900 text-white px-3.5 py-2 rounded-xl shadow-xl border border-slate-800 text-xs">
                        <p className="font-semibold text-slate-400">{label}</p>
                        <p className="text-sm font-bold text-indigo-300 mt-0.5">
                          {formatCurrency(value)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="amount"
                fill="#6366F1"
                radius={[8, 8, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};
