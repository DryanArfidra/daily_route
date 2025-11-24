import React from 'react';
import type { ScheduleItem, TargetItem } from '../types/index';

interface StatisticsProps {
  schedules: ScheduleItem[];
  targets: TargetItem[];
}

const Statistics: React.FC<StatisticsProps> = ({ schedules, targets }) => {
  const completedSchedules = schedules.filter(s => s.completed).length;
  const completedTargets = targets.filter(t => t.completed).length;
  
  const schedulePercentage = schedules.length > 0 ? (completedSchedules / schedules.length) * 100 : 0;
  const targetPercentage = targets.length > 0 ? (completedTargets / targets.length) * 100 : 0;
  
  const overallPercentage = schedules.length + targets.length > 0 
    ? ((completedSchedules + completedTargets) / (schedules.length + targets.length)) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Statistik Harian</h1>
          <p className="text-gray-600">Lihat progres harianmu</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6C63FF"
                strokeWidth="3"
                strokeDasharray={`${overallPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">
                {Math.round(overallPercentage)}%
              </span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Progress Keseluruhan</h3>
          <p className="text-gray-600 text-sm">
            {completedSchedules + completedTargets} dari {schedules.length + targets.length} aktivitas selesai
          </p>
        </div>

        {/* Schedule Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Jadwal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Selesai</span>
              <span className="font-semibold">
                {completedSchedules}/{schedules.length} ({Math.round(schedulePercentage)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${schedulePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Target Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Target</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Selesai</span>
              <span className="font-semibold">
                {completedTargets}/{targets.length} ({Math.round(targetPercentage)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${targetPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
              <div className="text-sm text-blue-600">Total Jadwal</div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{targets.length}</div>
              <div className="text-sm text-green-600">Total Target</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;