import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useProfileStore } from '../../stores/profileStore';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../UI/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();
  const { getProfilePicture } = useProfileStore();
  const { isDark, toggleTheme } = useTheme();

  const profilePicture = user ? getProfilePicture(user.id) : '';

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    // Tambahkan delay kecil untuk memastikan theme berubah
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden border-2 border-blue-300 dark:border-blue-700">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {user?.name?.charAt(0)}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">@{user?.username}</p>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleThemeToggle}
            >
              {isDark ? (
                <>
                  <span className="mr-2">☀️</span>
                  Mode Terang
                </>
              ) : (
                <>
                  <span className="mr-2">🌙</span>
                  Mode Gelap
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <span className="mr-2">🚪</span>
              Keluar
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};