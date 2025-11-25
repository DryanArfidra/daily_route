import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/UI/Button';
import { ProfilePictureUploader } from '../components/UI/ProfilePictureUploader';

export const Settings: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { initialize } = useProfileStore();
  const { isDark, toggleTheme, setTheme } = useTheme();

  // Initialize profile store
  React.useEffect(() => {
    initialize();
  }, [initialize]);

  const handleImageChange = (imageUrl: string) => {
    console.log('Profile picture updated to:', imageUrl);
    // Di sini Anda bisa menambahkan logika lain yang membutuhkan imageUrl
    // Contoh: sync dengan backend, update state global, dll.
  };

  const handleThemeChange = (dark: boolean) => {
    setTheme(dark);
    // Force update
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  return (
    <div className="pb-16 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pengaturan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola preferensi akun Anda
        </p>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Foto Profil
        </h3>
        <ProfilePictureUploader onImageChange={handleImageChange} />
      </div>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Informasi Profil
        </h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Nama</label>
            <p className="text-gray-900 dark:text-white">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Username</label>
            <p className="text-gray-900 dark:text-white">@{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Tampilan
        </h3>
        
        {/* Theme Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Mode Gelap</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isDark ? 'Saat ini aktif' : 'Saat ini nonaktif'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Manual Theme Selection */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant={!isDark ? "primary" : "outline"}
              size="sm"
              onClick={() => handleThemeChange(false)}
              className="flex-1"
            >
              ☀️ Terang
            </Button>
            <Button
              variant={isDark ? "primary" : "outline"}
              size="sm"
              onClick={() => handleThemeChange(true)}
              className="flex-1"
            >
              🌙 Gelap
            </Button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Akun
        </h3>
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 border-red-300"
          onClick={logout}
        >
          Keluar dari Aplikasi
        </Button>
      </div>
    </div>
  );
};