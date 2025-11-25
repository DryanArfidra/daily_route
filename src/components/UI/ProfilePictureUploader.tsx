import React, { useRef } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from './Button';

interface ProfilePictureUploaderProps {
  onImageChange?: (imageUrl: string) => void;
}

export const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({ 
  onImageChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const { setProfilePicture, getProfilePicture } = useProfileStore();

  const currentProfilePicture = user ? getProfilePicture(user.id) : '';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('Harap pilih file gambar');
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar harus kurang dari 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfilePicture(user.id, imageUrl);
        onImageChange?.(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    if (user) {
      setProfilePicture(user.id, '');
      onImageChange?.('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Picture Display */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600">
          {currentProfilePicture ? (
            <img 
              src={currentProfilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              {user?.name?.charAt(0)}
            </span>
          )}
        </div>
        
        {/* Edit Button */}
        <button
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
        >
          Ganti Foto
        </Button>
        
        {currentProfilePicture && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemovePicture}
            className="text-red-600 hover:text-red-700 border-red-300"
          >
            Hapus
          </Button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Format: JPG, PNG, GIF (maks 5MB)
      </p>
    </div>
  );
};