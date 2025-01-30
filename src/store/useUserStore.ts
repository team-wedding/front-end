import { getUserInfo } from '@/services/userService';
import { create } from 'zustand';

interface UserState {
    email: string | null;
    name: string | null;
    setUser: (email: string, name: string) => void;
    clearUser: () => void;
    fetchUserInfo: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    email: null,
    name: null,

    setUser: (email, name) => set({ email, name }),
    clearUser: () => set({ email: null, name: null }),
    fetchUserInfo: async () => {
        try {
            const userInfo = await getUserInfo();
            set({ email: userInfo.email, name: userInfo.name });
        } catch (error) {
            console.log('개인 정보 조회 중 오류 발생:', error);
        }
    },
}));