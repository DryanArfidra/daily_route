export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category?: string;
  completed: boolean;
}

export interface TargetItem {
  id: string;
  title: string;
  completed: boolean;
}

export type ActiveTab = 'home' | 'target' | 'statistics';
export type ModalMode = 'add' | 'edit';
export type ItemType = 'schedule' | 'target';