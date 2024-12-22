import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 청첩장 정보 - 제목
interface USERSTATE {
  token: string;
  refreshToken: string;
}
interface USERACTION {
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useUserStore = create(
  persist<USERSTATE & USERACTION>(
    (set) => ({
      token: '',
      refreshToken: '',
      setRefreshToken: (refresToken) => set({ refreshToken: refresToken }),
      setToken: (token) => set({ token: token }),
    }),
    {
      name: 'userTokenStorage',
    },
  ),
);
