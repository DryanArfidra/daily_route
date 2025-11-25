import React from 'react';
import { WeeklyProgress } from '../components/Checklist/WeeklyProgress';

export const Weekly: React.FC = () => {
  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Target Mingguan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Pantau progress ibadah mingguan Anda
        </p>
      </div>
      
      <WeeklyProgress />
    </div>
  );
};