import React from 'react';
import {type ScheduleItem } from '../types/index';

interface ScheduleListProps {
  schedules: ScheduleItem[];
  onEdit: (schedule: ScheduleItem) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const sortedSchedules = [...schedules].sort((a, b) => a.time.localeCompare(b.time));

  if (sortedSchedules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Belum ada jadwal hari ini</p>
        <p className="text-sm">Tap + untuk menambahkan jadwal</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedSchedules.map((schedule) => (
        <div
          key={schedule.id}
          className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
            schedule.completed 
              ? 'border-green-400 opacity-75' 
              : 'border-purple-400'
          } transition-all duration-200`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {schedule.time}
                </span>
                {schedule.category && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {schedule.category}
                  </span>
                )}
              </div>
              <h3 className={`font-medium ${
                schedule.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}>
                {schedule.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => onToggleComplete(schedule.id)}
                className={`p-2 rounded-full transition-colors ${
                  schedule.completed 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-400 bg-gray-50'
                }`}
              >
                {schedule.completed ? '✓' : '○'}
              </button>
              <button
                onClick={() => onEdit(schedule)}
                className="p-2 text-blue-600 bg-blue-50 rounded-full transition-colors"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(schedule.id)}
                className="p-2 text-red-600 bg-red-50 rounded-full transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;