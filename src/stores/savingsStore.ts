import { create } from 'zustand';
import { Storage } from '../utils/storage';
import type { SavingsData, SavingsTransaction } from '../types';
import { getCurrentMonth } from '../utils/dateUtils';
import { useAuthStore } from './authStore';

interface SavingsState {
  savings: SavingsData;
  initialize: (userId: string) => void;
  addTransaction: (amount: number, category: string, description?: string) => void;
  getMonthlyData: () => { month: string; amount: number }[];
}

const INITIAL_SAVINGS: SavingsData = {
  total: 0,
  transactions: [],
  monthlyData: []
};

export const useSavingsStore = create<SavingsState>((set, get) => ({
  savings: INITIAL_SAVINGS,

  initialize: (userId: string) => {
    const savedSavings = Storage.get<SavingsData>(`${userId}-savings`, INITIAL_SAVINGS);
    set({ savings: savedSavings });
  },

  addTransaction: (amount: number, category: string, description?: string) => {
    const { savings } = get();
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const newTransaction: SavingsTransaction = {
      id: Date.now().toString(),
      amount,
      category,
      date: new Date().toISOString(),
      description
    };

    const updatedSavings: SavingsData = {
      total: savings.total + amount,
      transactions: [newTransaction, ...savings.transactions],
      monthlyData: updateMonthlyData(savings.monthlyData, amount)
    };

    set({ savings: updatedSavings });
    Storage.set(`${userId}-savings`, updatedSavings);
  },

  getMonthlyData: () => {
    return get().savings.monthlyData;
  }
}));

function updateMonthlyData(monthlyData: { month: string; amount: number }[], amount: number) {
  const currentMonth = getCurrentMonth();
  const data = [...monthlyData];
  const monthIndex = data.findIndex(item => item.month === currentMonth);
  
  if (monthIndex >= 0) {
    data[monthIndex].amount += amount;
  } else {
    data.push({ month: currentMonth, amount });
  }
  
  return data;
}