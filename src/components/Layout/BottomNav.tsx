import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/daily', icon: '📅', label: 'Harian' },
    { path: '/weekly', icon: '📊', label: 'Mingguan' },
    { path: '/monthly', icon: '🏆', label: 'Bulanan' },
    { path: '/savings', icon: '💰', label: 'Tabungan' },
    { path: '/settings', icon: '⚙️', label: 'Pengaturan' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
      <div className="flex justify-around">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 flex-1 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};