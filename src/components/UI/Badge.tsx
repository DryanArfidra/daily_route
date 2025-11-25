import React from 'react';

interface BadgeProps {
  type: 'Gold' | 'Silver' | 'Bronze' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const colors = {
    Gold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Silver: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Bronze: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[type]}`}>
      {children}
    </span>
  );
};