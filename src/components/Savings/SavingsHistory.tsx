import React from 'react';
import { useSavingsStore } from '../../stores/savingsStore';

export const SavingsHistory: React.FC = () => {
  const { savings } = useSavingsStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Riwayat Transaksi
      </h3>
      
      <div className="space-y-3">
        {savings.transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Belum ada transaksi
          </p>
        ) : (
          savings.transactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.category}
                </p>
                {transaction.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <p className="text-green-600 dark:text-green-400 font-semibold">
                +{formatCurrency(transaction.amount)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};