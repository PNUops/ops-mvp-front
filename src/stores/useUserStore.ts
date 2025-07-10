import { User } from 'types/User';
import { create } from 'zustand';

type UserState = {
  user: User | null;
  isUserInit: boolean;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isUserInit: false,
  setUser: (user: User | null) => set({ user, isUserInit: true }),
}));
