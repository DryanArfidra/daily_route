import React from 'react';
import { useChecklistStore } from '../../stores/checklistStore';
import { ProgressBar } from '../UI/ProgressBar';
import { Button } from '../UI/Button';

export const WeeklyProgress: React.FC = () => {
  const { weeklyGoals, updateWeeklyGoal, resetWeeklyGoals } = useChecklistStore();

  const handleIncrement = (goalId: string) => {
    updateWeeklyGoal(goalId, 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Target Mingguan
        </h2>
        <Button variant="outline" size="sm" onClick={resetWeeklyGoals}>
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {weeklyGoals.map(goal => (
          <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {goal.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {goal.current} / {goal.target} {goal.unit}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleIncrement(goal.id)}
                disabled={goal.current >= goal.target}
              >
                +1
              </Button>
            </div>
            <ProgressBar value={goal.current} max={goal.target} />
          </div>
        ))}
      </div>
    </div>
  );
};