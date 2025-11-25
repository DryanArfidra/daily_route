import React from 'react';
import { useChecklistStore } from '../../stores/checklistStore';
import { Badge } from '../UI/Badge';
import { ProgressBar } from '../UI/ProgressBar';

export const MonthlyAchievement: React.FC = () => {
  const { monthlyAchievements, getMonthlyProgress } = useChecklistStore();
  const currentProgress = getMonthlyProgress();

  const getBadgeType = (percentage: number): 'Gold' | 'Silver' | 'Bronze' => {
    if (percentage >= 90) return 'Gold';
    if (percentage >= 70) return 'Silver';
    return 'Bronze';
  };

  const currentPercentage = (currentProgress.totalChecked / currentProgress.totalItems) * 100;
  const currentBadge = getBadgeType(currentPercentage);

  return (
    <div className="space-y-6">
      {/* Current Month Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Progress Bulan Ini
        </h3>
        <div className="flex justify-center mb-4">
          <Badge type={currentBadge}>
            {currentBadge} - {Math.round(currentPercentage)}%
          </Badge>
        </div>
        <ProgressBar 
          value={currentProgress.totalChecked} 
          max={currentProgress.totalItems} 
          label={`${currentProgress.totalChecked} / ${currentProgress.totalItems} checklist`}
        />
      </div>

      {/* History */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Riwayat Pencapaian
        </h3>
        <div className="space-y-3">
          {monthlyAchievements.slice().reverse().map((achievement, index) => {
            const percentage = (achievement.totalChecked / achievement.totalItems) * 100;
            const badgeType = getBadgeType(percentage);
            
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {achievement.month}
                  </span>
                  <Badge type={badgeType}>{badgeType}</Badge>
                </div>
                <ProgressBar 
                  value={achievement.totalChecked} 
                  max={achievement.totalItems}
                  showPercentage={false}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {achievement.totalChecked} dari {achievement.totalItems} checklist
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};