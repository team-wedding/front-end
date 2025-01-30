import { create } from 'zustand';

interface RSVPDetails {
  rsvpTitle: string;
  rsvpDescription: string;
  rsvpIncludeMeal: boolean;
  rsvpIncludePopulation: boolean;
  setRSVPonChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setRSVPDetails: (details: {
    rsvpTitle: string;
    rsvpDescription: string;
  }) => void;
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
  setRSVPonChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    set((state) => ({
      ...state,
      [name]: value,
    }));
  },
  setRSVPDetails: (content: Partial<RSVPDetails>) =>
    set(() => ({
      rsvpTitle: content.rsvpTitle,
      rsvpDescription: content.rsvpDescription,
    })),
  setRSVPIncludeMeal: (meal: boolean) => set(() => ({ rsvpIncludeMeal: meal })),
  setRSVPIncludePopulation: (population: boolean) =>
    set(() => ({ rsvpIncludePopulation: population })),
  reset: () => set(() => initialState),
}));

export default useRSVPStore;
