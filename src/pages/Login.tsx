import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/UI/Button';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const login = useAuthStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ibadah Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Masuk untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              placeholder='nama kesayangan...'
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder='rahasia hati...'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Masuk
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Setiap hari adalah kesempatan baru. Mulai sekarang!<br/>
            Masuk untuk melanjutkan aktivitasmu<br/>
            Siap capai target hari ini? ( Aryan / Nayla )
          </p>
        </div>
      </div>
    </div>
  );
};