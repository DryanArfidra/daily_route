import React from 'react';
import { DailyChecklistComponent } from '../components/Checklist/DailyChecklist';
import { useChecklistStore } from '../stores/checklistStore';

export const Daily: React.FC = () => {
  const { getMonthlyProgress } = useChecklistStore();
  const progress = getMonthlyProgress();

  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checklist Harian
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Progress hari ini: {progress.totalChecked} dari {progress.totalItems}
        </p>
      </div>
      
      <DailyChecklistComponent />
    </div>
  );
};