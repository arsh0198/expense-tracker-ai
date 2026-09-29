## 🚀 Live Demo

[**Open Expense Tracker AI →**](https://expense-tracker-ai-phi-kohl.vercel.app/)



# SpendFlow — Modern Personal Expense Tracker

A modern, intuitive, and production-ready Expense Tracking application built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Lucide React**.

---

## Features

### 1. Expense Management
- **Add & Edit Expenses**: Modal form with real-time validation (Amount > $0, Description required, Category selection, Date picker, Optional notes).
- **Delete with Confirmation**: Safeguarded deletion modal displaying the transaction details before permanent removal.
- **Customizable Categories**:
  - 🍕 **Food & Dining** (Amber/Orange)
  - 🚗 **Transportation** (Blue)
  - 🎬 **Entertainment** (Purple)
  - 🛍️ **Shopping** (Pink)
  - 🧾 **Bills & Utilities** (Emerald)
  - 📦 **Other** (Slate)

### 2. Interactive Analytics Dashboard
- **Summary KPI Cards**:
  - **Total Spending**: Aggregated amount across all transactions.
  - **This Month's Spending**: Month-to-date spending with a Month-over-Month (% increase/decrease) badge.
  - **Top Spending Category**: Highlights the highest spending category with proportion and total amount.
  - **Average Transaction**: Average amount spent per transaction along with highest single transaction.
- **Category Spending Donut Chart**: Interactive Recharts donut visualization with custom tooltips, center total label, and interactive legend list.
- **6-Month Spending History Bar Chart**: Recharts bar chart showing monthly trends over the past half-year.

### 3. Powerful Filtering & Sorting
- **Real-time Search**: Search across descriptions, notes, and category names.
- **Category Filter Pills**: Filter instantly by clicking any category badge or "All Categories".
- **Date Range Presets**:
  - All Time
  - This Month
  - Last Month
  - Last 30 Days
  - This Year
  - Custom Date Range (interactive Start & End date pickers)
- **Sorting Options**:
  - Newest First
  - Oldest First
  - Highest Amount
  - Lowest Amount
  - Description (A-Z)
- **Active Filter Counter & Quick Reset**: See exactly how many records match your criteria with a 1-click Reset button.

### 4. Data Persistence & Export
- **Local Persistence**: Stores data safely in browser `localStorage`. No accounts or server setup required; 100% private.
- **Rich Seed Data**: Automatically preloaded with realistic sample data across recent dates so the dashboard is immediately interactive upon first launch.
- **Export to CSV**: Export all transactions or currently filtered transactions into standard formatted `.csv` files.
- **Export JSON**: Full machine-readable backup.
- **Data Controls**: "Reset to Demo Data" and "Clear All Data" options in the navigation bar.
- **Feedback & Notifications**: Instant toast alerts for adding, updating, deleting, exporting, and resetting data.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **State Management**: React Context API (`ExpenseContext`, `ToastContext`) + `localStorage`

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm (or yarn / pnpm)

### Running the Application

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build and Run in Production Mode**:
   ```bash
   npm run build
   npm run start
   ```

---

## Testing Features

1. **Add an Expense**: Click `+ Add Expense` in the navigation or hero banner. Fill in the amount, description, category, and date. Submit and observe the instant toast feedback and dashboard update.
2. **Filter & Search**:
   - Type in the search box to filter by text.
   - Click category buttons (e.g. "Food") to isolate spending.
   - Select "Last 30 Days" or "Custom" from the date dropdown.
3. **Edit / Delete**:
   - Click the pencil icon on any transaction to edit it.
   - Click the trash icon to open the confirmation dialog.
4. **Export CSV**:
   - Click the `Export` dropdown in the top navbar and choose `Export All (CSV)` or `Export Filtered (CSV)`. Check the downloaded CSV file.
5. **Reset & Clear**:
   - Click the `Data` dropdown in the navbar and select `Reset to Demo Data` or `Clear All Data`.
