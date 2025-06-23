// store/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  name: string;
  email: string;
  image: string;
  setUser: (user: Partial<UserProfile>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserProfile>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      image: '',
      setUser: (user) => set((state) => ({ ...state, ...user })),
      resetUser: () => set({ name: '', email: '', image: '' }),
    }),
    {
      name: 'user-profile-storage', // localStorage key
    }
  )
);
