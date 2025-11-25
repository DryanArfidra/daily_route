import React, { useState } from 'react';
import { useSavingsStore } from '../../stores/savingsStore';
import { Button } from '../UI/Button';

export const SavingsForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  const { addTransaction } = useSavingsStore();

  const categories = ['Tabungan Reguler', 'Tabungan Khusus', 'Tabungan Darurat', 'Lainnya'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && category) {
      addTransaction(numAmount, category, description);
      setAmount('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Tambah Tabungan
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Jumlah
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Masukkan jumlah"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kategori
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Pilih Kategori</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Keterangan (Opsional)
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tambahkan keterangan"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Simpan Tabungan
      </Button>
    </form>
  );
};