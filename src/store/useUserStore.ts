import { getUserInfo } from '@/services/userService';
import { create } from 'zustand';

interface UserState {
    id: number | null;
    email: string | null;
    name: string | null;
    provider: string | null;
    setUser: (id: number, email: string, name: string, provider: string) => void;
    clearUser: () => void;
    fetchUserInfo: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    email: null,
    name: null,
    provider: null,

    setUser: (id, email, name, provider) => set({ id, email, name, provider }),
    clearUser: () => set({ id: null, email: null, name: null, provider: null }),
    fetchUserInfo: async () => {
        try {
            const userInfo = await getUserInfo();
            set({ id: userInfo.id, email: userInfo.email, name: userInfo.name, provider: userInfo.provider });
        } catch (error) {
            console.log('개인 정보 조회 중 오류 발생:', error);
        }
    },
}));