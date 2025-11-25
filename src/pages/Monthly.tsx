import React from 'react';
import { MonthlyAchievement } from '../components/Checklist/MonthlyAchievement';

export const Monthly: React.FC = () => {
  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pencapaian Bulanan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Lihat perkembangan ibadah Anda setiap bulan
        </p>
      </div>
      
      <MonthlyAchievement />
    </div>
  );
};