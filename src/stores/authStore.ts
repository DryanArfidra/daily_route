import { create } from 'zustand';
import { Storage } from '../utils/storage';
import {type User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  initialize: () => void;
}

// Dummy users
const USERS: User[] = [
  { id: '1', username: 'r_xanz', password: '@ry4n313', name: 'Dryan' },
  { id: '2', username: 'nayfazh_', password: 'jaganay', name: 'Nayla' }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  initialize: () => {
    const savedUser = Storage.get<User | null>('currentUser', null);
    if (savedUser) {
      set({ user: savedUser, isAuthenticated: true });
    }
  },

  login: (username: string, password: string) => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      set({ user, isAuthenticated: true });
      Storage.set('currentUser', user);
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    Storage.remove('currentUser');
  }
}));