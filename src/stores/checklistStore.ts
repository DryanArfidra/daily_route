import { create } from 'zustand';
import { Storage } from '../utils/storage';
import type { DailyChecklist, WeeklyGoal, MonthlyAchievement } from '../types';
import { getTodayKey, getCurrentWeek, getCurrentMonth } from '../utils/dateUtils';
import { useAuthStore } from './authStore';

interface ChecklistState {
  dailyChecklists: DailyChecklist[];
  weeklyGoals: WeeklyGoal[];
  monthlyAchievements: MonthlyAchievement[];
  initialize: (userId: string) => void;
  toggleDailyChecklist: (id: string) => void;
  updateWeeklyGoal: (id: string, value: number) => void;
  resetWeeklyGoals: () => void;
  getMonthlyProgress: () => { totalChecked: number; totalItems: number };
}

const DAILY_CHECKLISTS: DailyChecklist[] = [
  // Sholat Sunnah Harian
  { id: 'qobliyah-subuh', name: 'Qobliyah Subuh', category: 'Sholat Sunnah', checked: false, time: 'Subuh' },
  { id: 'qobliyah-dzuhur', name: 'Qobliyah Dzuhur', category: 'Sholat Sunnah', checked: false, time: 'Dzuhur' },
  { id: 'badhiyah-dzuhur', name: "Ba'diyah Dzuhur", category: 'Sholat Sunnah', checked: false, time: 'Dzuhur' },
  { id: 'qobliyah-ashar', name: 'Qobliyah Ashar', category: 'Sholat Sunnah', checked: false, time: 'Ashar' },
  { id: 'badhiyah-maghrib', name: "Ba'diyah Maghrib", category: 'Sholat Sunnah', checked: false, time: 'Maghrib' },
  { id: 'badhiyah-isya', name: "Ba'diyah Isya", category: 'Sholat Sunnah', checked: false, time: 'Isya' },
  { id: 'dhuha', name: 'Dhuha', category: 'Sholat Sunnah', checked: false },
  { id: 'witir', name: 'Witir', category: 'Sholat Sunnah', checked: false },
  { id: 'tahajud', name: 'Tahajud', category: 'Sholat Sunnah', checked: false },
];

const WEEKLY_GOALS: WeeklyGoal[] = [
  { id: 'tilawah', name: 'Tilawah Quran', target: 7, current: 0, unit: 'hari' },
  { id: 'sedekah', name: 'Sedekah', target: 5, current: 0, unit: 'kali' },
  { id: 'hafalan', name: 'Hafalan Baru', target: 10, current: 0, unit: 'ayat' },
];

export const useChecklistStore = create<ChecklistState>((set, get) => ({
  dailyChecklists: [],
  weeklyGoals: [],
  monthlyAchievements: [],

  initialize: (userId: string) => {
    const todayKey = getTodayKey();
    const weekKey = getCurrentWeek();
    
    const savedDaily = Storage.get<DailyChecklist[]>(`${userId}-daily-${todayKey}`, DAILY_CHECKLISTS);
    const savedWeekly = Storage.get<WeeklyGoal[]>(`${userId}-weekly-${weekKey}`, WEEKLY_GOALS);
    const savedMonthly = Storage.get<MonthlyAchievement[]>(`${userId}-monthly`, []);

    set({ 
      dailyChecklists: savedDaily, 
      weeklyGoals: savedWeekly,
      monthlyAchievements: savedMonthly 
    });
  },

  toggleDailyChecklist: (id: string) => {
    const { dailyChecklists, monthlyAchievements } = get();
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const updated = dailyChecklists.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    set({ dailyChecklists: updated });
    Storage.set(`${userId}-daily-${getTodayKey()}`, updated);

    // Update monthly achievement
    const totalChecked = updated.filter(item => item.checked).length;
    const currentMonth = getCurrentMonth();
    const monthlyIndex = monthlyAchievements.findIndex(m => m.month === currentMonth);
    
    let updatedMonthly = [...monthlyAchievements];
    if (monthlyIndex >= 0) {
      updatedMonthly[monthlyIndex] = {
        ...updatedMonthly[monthlyIndex],
        totalChecked,
        totalItems: updated.length
      };
    } else {
      updatedMonthly.push({
        month: currentMonth,
        year: new Date().getFullYear(),
        totalChecked,
        totalItems: updated.length
      });
    }

    set({ monthlyAchievements: updatedMonthly });
    Storage.set(`${userId}-monthly`, updatedMonthly);
  },

  updateWeeklyGoal: (id: string, value: number) => {
    const { weeklyGoals } = get();
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const updated = weeklyGoals.map(goal =>
      goal.id === id ? { ...goal, current: Math.min(goal.current + value, goal.target) } : goal
    );

    set({ weeklyGoals: updated });
    Storage.set(`${userId}-weekly-${getCurrentWeek()}`, updated);
  },

  resetWeeklyGoals: () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const resetGoals = WEEKLY_GOALS.map(goal => ({ ...goal, current: 0 }));
    set({ weeklyGoals: resetGoals });
    Storage.set(`${userId}-weekly-${getCurrentWeek()}`, resetGoals);
  },

  getMonthlyProgress: () => {
    const { dailyChecklists } = get();
    const totalChecked = dailyChecklists.filter(item => item.checked).length;
    return { totalChecked, totalItems: dailyChecklists.length };
  }
}));