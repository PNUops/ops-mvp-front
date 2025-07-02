import { create } from 'zustand';

interface ContestStore {
  selectedContestId: number | null;
  setSelectedContestId: (contestId: number | null) => void;
}

const useContestStore = create<ContestStore>((set) => ({
  selectedContestId: null,
  setSelectedContestId: (contestId) => set({ selectedContestId: contestId }),
}));

export default useContestStore;