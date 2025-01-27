import { AccountDetail } from '@/types/invitationType';
import { create } from 'zustand';

type RoleAccountInfo = {
  role: '신랑님' | '신부님'; // 신랑, 신부
  accountInfo: AccountDetail;
  fatherAccountInfo: AccountDetail;
  motherAccountInfo: AccountDetail;
};

type StoreState = {
  accounts: RoleAccountInfo[];
  updateAccountInfo: (
    index: number,
    field: keyof RoleAccountInfo,
    value: AccountDetail,
  ) => void;
  reset: () => void; // Reset 메서드 추가
};

// 초기 상태 정의
const initialAccounts: RoleAccountInfo[] = [
  {
    role: '신랑님',
    accountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    fatherAccountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    motherAccountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
  },
  {
    role: '신부님',
    accountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    fatherAccountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    motherAccountInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
  },
];

const useAccountStore = create<StoreState>((set) => ({
  accounts: initialAccounts,
  updateAccountInfo: (index, field, value) =>
    set((state) => {
      const updateAccounts = [...state.accounts];
      updateAccounts[index] = {
        ...updateAccounts[index],
        [field]: value,
      };
      return { accounts: updateAccounts };
    }),
  reset: () => set({ accounts: initialAccounts }), // Reset 메서드 구현
}));

export default useAccountStore;
