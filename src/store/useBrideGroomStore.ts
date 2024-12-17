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
};

const useBrideGroomStore = create<StoreState>((set) => ({
  brideGroom: [
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
  ],
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
}));

export default useBrideGroomStore;
