import { create } from 'zustand';

interface RSVPDetails {
  rsvpTitle: string;
  rsvpDescription: string;
  rsvpIncludeMeal: boolean;
  rsvpIncludePopulation: boolean;
  setRSVPDetail: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setRSVPIncludeMeal: (meal: boolean) => void;
  setRSVPIncludePopulation: (population: boolean) => void;
  reset: () => void;
}
const initialState = {
  rsvpTitle: '',
  rsvpDescription: '',
  rsvpIncludeMeal: false,
  rsvpIncludePopulation: false,
};

const useRSVPStore = create<RSVPDetails>((set) => ({
  ...initialState,
  setRSVPDetail: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    set((state) => ({
      ...state,
      [name]: value,
    }));
  },
  setRSVPIncludeMeal: (meal: boolean) => set(() => ({ rsvpIncludeMeal: meal })),
  setRSVPIncludePopulation: (population: boolean) =>
    set(() => ({ rsvpIncludePopulation: population })),
  reset: () => set(() => initialState),
}));

export default useRSVPStore;
