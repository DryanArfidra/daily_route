import { create } from 'zustand';
import { Storage } from '../utils/storage';

interface ProfileState {
  profilePictures: Record<string, string>;
  setProfilePicture: (userId: string, imageUrl: string) => void;
  getProfilePicture: (userId: string) => string;
  initialize: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profilePictures: {},

  initialize: () => {
    const savedPictures = Storage.get<Record<string, string>>('profilePictures', {});
    set({ profilePictures: savedPictures });
  },

  setProfilePicture: (userId: string, imageUrl: string) => {
    const { profilePictures } = get();
    const updatedPictures = { ...profilePictures, [userId]: imageUrl };
    
    set({ profilePictures: updatedPictures });
    Storage.set('profilePictures', updatedPictures);
  },

  getProfilePicture: (userId: string) => {
    const { profilePictures } = get();
    return profilePictures[userId] || '';
  }
}));