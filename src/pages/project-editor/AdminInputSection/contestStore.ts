import { create } from 'zustand';

interface ContestStore {
  selectedContestId: number | null;
  setSelectedContestId: (id: number) => void;
}

export const useContestStore = create<ContestStore>((set) => ({
  selectedContestId: null,
  setSelectedContestId: (id) => set({ selectedContestId: id }),
}));
