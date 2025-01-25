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
};

const useAccountStore = create<StoreState>((set) => ({
  accounts: [
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
  ],
  updateAccountInfo: (index, field, value) =>
    set((state) => {
      const updateAccounts = [...state.accounts];
      updateAccounts[index] = {
        ...updateAccounts[index],
        [field]: value,
      };
      return { accounts: updateAccounts };
    }),
}));

export default useAccountStore;
