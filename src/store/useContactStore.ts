import { create } from 'zustand';

type ContactInformation = {
  role: '신랑' | '신부';
  contact: string;
  fatherContact: string;
  motherContact: string;
};

type StoreState = {
  contacts: ContactInformation[];
  updateContact: (
    index: number,
    field: keyof ContactInformation,
    value: string,
  ) => void;
  reset: () => void;
};

const initialState: ContactInformation[] = [
  {
    role: '신랑',
    contact: '',
    fatherContact: '',
    motherContact: '',
  },
  {
    role: '신부',
    contact: '',
    fatherContact: '',
    motherContact: '',
  },
];

const useContactStore = create<StoreState>((set) => ({
  contacts: initialState,
  updateContact: (index, field, value) =>
    set((state) => {
      const updatedContacts = [...state.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [field]: value };
      return { contacts: updatedContacts };
    }),
  reset: () => set({ contacts: initialState }),
}));

export default useContactStore;
