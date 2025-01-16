import { create } from 'zustand';

type Person = {
  name: string;
  isDeceased: boolean;
};

type FamilyInformation = {
  father: Person;
  mother: Person;
};

type BrideGroomInformation = {
  role: '신랑' | '신부';
  name: string;
  relation: '아들' | '딸';
  family: FamilyInformation;
};

type StoreState = {
  brideGroom: BrideGroomInformation[];
  updateBrideGroom: (
    index: number,
    field: keyof BrideGroomInformation,
    value: string | boolean,
  ) => void;
  updateFamily: (
    index: number,
    parent: 'father' | 'mother',
    field: keyof Person,
    value: string | boolean,
  ) => void;
  reset: () => void; // Reset 메서드 추가
};

// 초기 상태 정의
const initialBrideGroom: BrideGroomInformation[] = [
  {
    role: '신랑',
    name: '',
    relation: '아들',
    family: {
      father: { name: '', isDeceased: false },
      mother: { name: '', isDeceased: false },
    },
  },
  {
    role: '신부',
    name: '',
    relation: '딸',
    family: {
      father: { name: '', isDeceased: false },
      mother: { name: '', isDeceased: false },
    },
  },
];

const useBrideGroomStore = create<StoreState>((set) => ({
  brideGroom: initialBrideGroom,
  updateBrideGroom: (index, field, value) =>
    set((state) => {
      const updatedBrideGroom = [...state.brideGroom];
      updatedBrideGroom[index] = {
        ...updatedBrideGroom[index],
        [field]: value,
      };
      return { brideGroom: updatedBrideGroom };
    }),
  updateFamily: (index, parent, field, value) =>
    set((state) => {
      const updatedBrideGroom = [...state.brideGroom];
      updatedBrideGroom[index].family[parent] = {
        ...updatedBrideGroom[index].family[parent],
        [field]: value,
      };
      return { brideGroom: updatedBrideGroom };
    }),
  reset: () => set({ brideGroom: initialBrideGroom }),
}));

export default useBrideGroomStore;
