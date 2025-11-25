import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  label, 
  showPercentage = true 
}) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};