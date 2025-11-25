import React from 'react';
import { useChecklistStore } from '../../stores/checklistStore';

export const DailyChecklistComponent: React.FC = () => {
  const { dailyChecklists, toggleDailyChecklist } = useChecklistStore();

  const categories = Array.from(new Set(dailyChecklists.map(item => item.category)));

  const handleToggle = (id: string) => {
    toggleDailyChecklist(id);
  };

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            {category}
          </h3>
          <div className="space-y-2">
            {dailyChecklists
              .filter(item => item.category === category)
              .map(item => (
                <label
                  key={item.id}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggle(item.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                  {item.time && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.time}
                    </span>
                  )}
                </label>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};