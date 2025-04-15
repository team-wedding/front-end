// stores/useDebouncedInputStore.ts
import { create } from 'zustand';
import { DebouncedInputHandle } from '@/components/common/DebounceInput/DebounceInput';

type DebouncedInputStore = {
  inputs: Set<DebouncedInputHandle>;
  register: (ref: DebouncedInputHandle) => void;
  unregister: (ref: DebouncedInputHandle) => void;
  flushAll: () => void;
};

export const useDebouncedInputStore = create<DebouncedInputStore>(
  (set, get) => ({
    inputs: new Set(),

    register: (ref) => {
      const newSet = new Set(get().inputs);
      newSet.add(ref);
      set({ inputs: newSet });
    },

    unregister: (ref) => {
      const newSet = new Set(get().inputs);
      newSet.delete(ref);
      set({ inputs: newSet });
    },

    flushAll: () => {
      get().inputs.forEach((ref) => ref.flush());
    },
  }),
);
