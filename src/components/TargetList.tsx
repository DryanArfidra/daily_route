import React from 'react';
import { type TargetItem } from '../types/index';

interface TargetListProps {
  targets: TargetItem[];
  onEdit: (target: TargetItem) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TargetList: React.FC<TargetListProps> = ({
  targets,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  if (targets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Belum ada target hari ini</p>
        <p className="text-sm">Tap + untuk menambahkan target</p>
      </div>
    );
  }

  const completedCount = targets.filter(t => t.completed).length;
  const progressPercentage = targets.length > 0 ? (completedCount / targets.length) * 100 : 0;

  return (
    <div>
      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress Harian</span>
          <span className="text-sm font-bold text-purple-600">
            {completedCount}/{targets.length} ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Target List */}
      <div className="space-y-3">
        {targets.map((target) => (
          <div
            key={target.id}
            className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-200 ${
              target.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => onToggleComplete(target.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    target.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-transparent'
                  }`}
                >
                  ✓
                </button>
                <span className={`font-medium ${
                  target.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {target.title}
                </span>
              </div>
              
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => onEdit(target)}
                  className="p-2 text-blue-600 bg-blue-50 rounded-full transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(target.id)}
                  className="p-2 text-red-600 bg-red-50 rounded-full transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetList;