import { AccountDetail } from '@/types/invitationTypes';
import { create } from 'zustand';

// type AccountInfo = {
//   accountHolderName: string; // 예금주
//   bankName: string; // 은행명
//   accountNumber: string; // 계좌번호
//   kakaoUrl: string; // 카카오송금QR링크
// };

type RoleAccountInfo = {
  role: '신랑' | '신부'; // 신랑, 신부
  accountInfo: Omit<AccountDetail, 'order' | 'isActive'>;
  fatherAccountInfo: Omit<AccountDetail, 'order' | 'isActive'>;
  motherAccountInfo: Omit<AccountDetail, 'order' | 'isActive'>;
};

type StoreState = {
  accounts: RoleAccountInfo[];
  updateAccountInfo: (
    index: number,
    field: keyof RoleAccountInfo,
    value: Omit<AccountDetail, 'order' | 'isActive'>,
  ) => void;
  reset: () => void; // Reset 메서드 추가
};

// 초기 상태 정의
const initialAccounts: RoleAccountInfo[] = [
  {
    role: '신랑',
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
    role: '신부',
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
