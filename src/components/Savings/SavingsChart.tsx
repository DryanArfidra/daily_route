import React from 'react';
import { useSavingsStore } from '../../stores/savingsStore';

export const SavingsChart: React.FC = () => {
  const { savings, getMonthlyData } = useSavingsStore();
  const monthlyData = getMonthlyData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const maxAmount = Math.max(...monthlyData.map(d => d.amount), 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Grafik Tabungan Bulanan
      </h3>
      
      <div className="mb-4 text-center">
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {formatCurrency(savings.total)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Tabungan</p>
      </div>

      <div className="space-y-3">
        {monthlyData.slice().reverse().map((data, index) => {
          const percentage = (data.amount / maxAmount) * 100;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{data.month}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {formatCurrency(data.amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};