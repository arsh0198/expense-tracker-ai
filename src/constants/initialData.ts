import { Expense } from '@/types/expense';

/**
 * Generates dynamic initial sample data relative to the current date
 * so that month-over-month and current month stats always look rich and alive.
 */
export const generateInitialExpenses = (): Expense[] => {
  // Helper to format YYYY-MM-DD
  const formatDate = (y: number, m: number, d: number) => {
    const dateObj = new Date(y, m, d);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${dateObj.getFullYear()}-${mm}-${dd}`;
  };

  const sampleItems: Array<{
    dayOffset: number; // Days ago from today
    category: Expense['category'];
    description: string;
    amount: number;
    notes?: string;
  }> = [
    {
      dayOffset: 0,
      category: 'Food',
      description: 'Artisan Cafe & Bakery',
      amount: 18.5,
      notes: 'Coffee and avocado toast brunch',
    },
    {
      dayOffset: 1,
      category: 'Transportation',
      description: 'Uber ride downtown',
      amount: 24.3,
      notes: 'Commute to client office',
    },
    {
      dayOffset: 2,
      category: 'Bills',
      description: 'High-speed Internet Bill',
      amount: 79.99,
      notes: 'Monthly fiber subscription',
    },
    {
      dayOffset: 3,
      category: 'Shopping',
      description: 'Noise Cancelling Headphones',
      amount: 199.0,
      notes: 'Electronics sale discount',
    },
    {
      dayOffset: 4,
      category: 'Food',
      description: 'Whole Foods Grocery Run',
      amount: 112.45,
      notes: 'Weekly fresh produce & essentials',
    },
    {
      dayOffset: 5,
      category: 'Entertainment',
      description: 'Movie IMAX Tickets & Snacks',
      amount: 38.0,
      notes: 'Weekend movie with friends',
    },
    {
      dayOffset: 7,
      category: 'Bills',
      description: 'Electric & Utilities',
      amount: 145.2,
      notes: 'City power bill',
    },
    {
      dayOffset: 9,
      category: 'Food',
      description: 'Sushi Dinner Delivery',
      amount: 64.8,
      notes: 'Friday night treat',
    },
    {
      dayOffset: 11,
      category: 'Transportation',
      description: 'Gas Station Refill',
      amount: 52.1,
      notes: 'Full tank premium gas',
    },
    {
      dayOffset: 14,
      category: 'Shopping',
      description: 'Books & Stationery',
      amount: 45.0,
      notes: 'Design inspiration books',
    },
    {
      dayOffset: 16,
      category: 'Entertainment',
      description: 'Spotify & Netflix Subscriptions',
      amount: 29.98,
      notes: 'Digital media streaming',
    },
    {
      dayOffset: 18,
      category: 'Other',
      description: 'Home Plant & Ceramic Pot',
      amount: 35.5,
      notes: 'Balcony garden setup',
    },
    {
      dayOffset: 21,
      category: 'Food',
      description: 'Farmers Market Organics',
      amount: 42.15,
      notes: 'Local honey and artisan sourdough',
    },
    {
      dayOffset: 25,
      category: 'Transportation',
      description: 'Metropolitan Subway Pass',
      amount: 80.0,
      notes: 'Monthly commuter card',
    },
    {
      dayOffset: 32,
      category: 'Bills',
      description: 'Cloud Storage & Workspace Services',
      amount: 24.0,
      notes: 'Software tools',
    },
    {
      dayOffset: 35,
      category: 'Shopping',
      description: 'Ergonomic Desk Chair',
      amount: 289.0,
      notes: 'Home office ergonomic upgrade',
    },
    {
      dayOffset: 40,
      category: 'Food',
      description: 'Italian Trattoria Dinner',
      amount: 88.5,
      notes: 'Family dinner celebration',
    },
    {
      dayOffset: 45,
      category: 'Entertainment',
      description: 'Live Concert Ticket',
      amount: 95.0,
      notes: 'Indie rock show downtown',
    },
    {
      dayOffset: 50,
      category: 'Bills',
      description: 'Mobile Carrier Phone Bill',
      amount: 65.0,
      notes: 'Unlimited 5G plan',
    },
    {
      dayOffset: 55,
      category: 'Transportation',
      description: 'Car Oil Change & Inspection',
      amount: 75.0,
      notes: 'Vehicle routine maintenance',
    },
  ];

  return sampleItems.map((item, index) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - item.dayOffset);
    const dateStr = formatDate(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );

    return {
      id: `seed-exp-${index + 1}`,
      amount: item.amount,
      category: item.category,
      description: item.description,
      date: dateStr,
      notes: item.notes,
      createdAt: new Date(targetDate.getTime() + 3600000).toISOString(),
      updatedAt: new Date(targetDate.getTime() + 3600000).toISOString(),
    };
  });
};
