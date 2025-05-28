import { create } from 'zustand';

interface RSVPDetails {
  rsvpTitle: string;
  rsvpDescription: string;
  rsvpIncludeMeal: boolean;
  rsvpIncludePopulation: boolean;
  setRSVPTitle: (RSVPTitle: string) => void;
  setRSVPDescription: (RSVPDescriptions: string) => void;
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
  setRSVPTitle: (RSVPtitle: string) => {
    set(() => ({
      rsvpTitle: RSVPtitle,
    }));
  },
  setRSVPDescription: (RSVPDescription: string) => {
    set(() => ({
      rsvpDescription: RSVPDescription,
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
