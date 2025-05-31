import { create } from 'zustand';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'utils/token';

type TokenState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  initToken: () => void;
};

export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  setToken: (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token);
    set({ token });
  },
  clearToken: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    set({ token: null });
  },
  initToken: () => {
    const token = Cookies.get(ACCESS_TOKEN_KEY) || null;
    set({ token });
  },
}));
