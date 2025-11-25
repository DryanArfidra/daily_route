import { create } from 'zustand';
import { Storage } from '../utils/storage';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,

  setTheme: (isDark: boolean) => {
    console.log('Setting theme to:', isDark);
    set({ isDark });
    Storage.set('darkMode', isDark);
    applyTheme(isDark);
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.isDark;
      console.log('Toggling theme to:', newTheme);
      
      Storage.set('darkMode', newTheme);
      applyTheme(newTheme);
      
      return { isDark: newTheme };
    });
  }
}));

// Fungsi helper untuk apply theme
function applyTheme(isDark: boolean) {
  const html = document.documentElement;
  
  if (isDark) {
    html.classList.add('dark');
    html.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark');
    html.style.colorScheme = 'light';
  }
  
  // Force reflow untuk memastikan perubahan diterapkan
  document.body.getBoundingClientRect();
}