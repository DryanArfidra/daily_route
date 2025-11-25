export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
}

export interface DailyChecklist {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  time?: string;
}

export interface WeeklyGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

export interface MonthlyAchievement {
  month: string;
  year: number;
  totalChecked: number;
  totalItems: number;
  badge?: 'Gold' | 'Silver' | 'Bronze';
}

export interface SavingsTransaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface SavingsData {
  total: number;
  transactions: SavingsTransaction[];
  monthlyData: { month: string; amount: number }[];
}