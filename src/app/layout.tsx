import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SpendFlow — Personal Expense Tracker & Analytics',
  description:
    'A modern, intuitive personal finance and expense tracking web application with interactive charts and analytics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
