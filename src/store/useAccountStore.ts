import { create } from 'zustand';

type AccountInfo = {
  accountHolder: string; // 예금주
  bankName: string; // 은행명
  accountNumber: string; // 계좌번호
  kakaoPayQRCode: string; // 카카오송금QR링크
};

type RoleAccountInfo = {
  role: '신랑님' | '신부님'; // 신랑, 신부
  accountInfo: AccountInfo;
  fatherAccountInfo: AccountInfo;
  motherAccountInfo: AccountInfo;
};

type StoreState = {
  accounts: RoleAccountInfo[];
  updateAccountInfo: (
    index: number,
    field: keyof RoleAccountInfo,
    value: AccountInfo,
  ) => void;
  reset: () => void; // Reset 메서드 추가
};

// 초기 상태 정의
const initialAccounts: RoleAccountInfo[] = [
  {
    role: '신랑님',
    accountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
    },
    fatherAccountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
    },
    motherAccountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
    },
  },
  {
    role: '신부님',
    accountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
    },
    fatherAccountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
    },
    motherAccountInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      kakaoPayQRCode: '',
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
