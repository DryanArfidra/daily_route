import React from 'react';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-xl">☰</span>
        </button>
        
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center lg:text-left lg:ml-4">
          {title}
        </h1>
        
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {user?.name?.charAt(0)}
          </span>
        </div>
      </div>
    </header>
  );
};