import React from 'react';
import { ShieldCheck, HardDrive } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 py-8 bg-white/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-indigo-500" />
          <span>
            Storage: <strong className="text-slate-700 dark:text-slate-300">Client localStorage</strong>
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Private & Local
          </span>
        </div>

        <div>
          SpendFlow Expense Tracker • Built with Next.js 14, Tailwind CSS & TypeScript
        </div>
      </div>
    </footer>
  );
};
