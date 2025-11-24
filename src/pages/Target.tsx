import React from 'react';
import TargetList from '../components/TargetList';
import {type TargetItem } from '../types/index';

interface TargetProps {
  targets: TargetItem[];
  onEditTarget: (target: TargetItem) => void;
  onDeleteTarget: (id: string) => void;
  onToggleTargetComplete: (id: string) => void;
}

const Target: React.FC<TargetProps> = ({
  targets,
  onEditTarget,
  onDeleteTarget,
  onToggleTargetComplete,
}) => {
  const completedCount = targets.filter(t => t.completed).length;
  const totalCount = targets.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getMotivationMessage = () => {
    if (totalCount === 0) return "Mulai dengan menambahkan target pertama kamu!";
    if (progressPercentage === 0) return "Ayo mulai kerjakan targetmu hari ini! 💪";
    if (progressPercentage === 100) return "Luar biasa! Semua target sudah selesai! 🎉";
    if (progressPercentage >= 50) return "Mantap! Lanjutkan semangatmu! 🔥";
    return "Kamu bisa melakukannya! Semangat! ✨";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 safe-area-bottom">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Target Harian</h1>
          <p className="text-gray-600">Capai targetmu hari ini!</p>
        </div>

        {/* Progress Summary Card */}
        {totalCount > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Progress Harian</span>
              <span className="text-sm font-bold text-purple-600">
                {completedCount}/{totalCount} ({Math.round(progressPercentage)}%)
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Motivation Message */}
            <p className="text-sm text-center text-gray-600 font-medium">
              {getMotivationMessage()}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{completedCount}</div>
                <div className="text-xs text-green-600">Selesai</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{totalCount - completedCount}</div>
                <div className="text-xs text-orange-600">Belum Selesai</div>
              </div>
            </div>
          </div>
        )}

        {/* Target List - PERBAIKAN DI SINI */}
        <TargetList
          targets={targets}
          onEdit={onEditTarget}  // Ubah dari onEditTarget menjadi onEdit
          onDelete={onDeleteTarget} // Ubah dari onDeleteTarget menjadi onDelete
          onToggleComplete={onToggleTargetComplete} // Tetap sama
        />

        {/* Empty State */}
        {totalCount === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Belum Ada Target
            </h3>
            <p className="text-gray-600 mb-4 max-w-sm mx-auto">
              Tambahkan target harianmu untuk melacak progres dan mencapai tujuan hari ini!
            </p>
            <div className="text-sm text-gray-500 bg-gray-100 rounded-lg p-3 inline-block">
              💡 Tips: Target yang spesifik lebih mudah dicapai!
            </div>
          </div>
        )}

        {/* Quick Actions for Completed Targets */}
        {completedCount > 0 && completedCount === totalCount && totalCount > 0 && (
          <div className="fixed bottom-32 left-4 right-4 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🎉</span>
                <span className="text-sm font-medium text-green-800">
                  Semua target selesai!
                </span>
              </div>
              <button 
                onClick={() => {
                  // Reset all targets for tomorrow
                  const reset = window.confirm('Reset semua target untuk besok?');
                  if (reset) {
                    targets.forEach(target => {
                      onToggleTargetComplete(target.id);
                    });
                  }
                }}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Target;