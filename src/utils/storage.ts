import type { ScheduleItem, TargetItem } from '../types/index';

const SCHEDULE_KEY = 'daily-schedule';
const TARGET_KEY = 'daily-targets';

export const storage = {
  // Schedule methods
  getSchedules: (): ScheduleItem[] => {
    try {
      return JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveSchedules: (schedules: ScheduleItem[]) => {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
  },

  // Target methods
  getTargets: (): TargetItem[] => {
    try {
      return JSON.parse(localStorage.getItem(TARGET_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveTargets: (targets: TargetItem[]) => {
    localStorage.setItem(TARGET_KEY, JSON.stringify(targets));
  },
};