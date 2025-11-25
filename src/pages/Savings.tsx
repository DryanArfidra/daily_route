import React from 'react';
import { SavingsForm } from '../components/Savings/SavingsForm';
import { SavingsHistory } from '../components/Savings/SavingsHistory';
import { SavingsChart } from '../components/Savings/SavingsChart';

export const Savings: React.FC = () => {
  return (
    <div className="pb-16 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tabungan Ibadah
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola dan pantau tabungan Anda
        </p>
      </div>
      
      <SavingsForm />
      <SavingsChart />
      <SavingsHistory />
    </div>
  );
};