import { create } from "zustand";
import type { PriorityDto } from "../types/priority.dto";
import { PriorityAPI } from  "../services/priority.api.ts";

type PriorityState = {
  priorities: PriorityDto[];
  loading: boolean;
  error: string | null;
  loadPriorities: () => Promise<void>;
};

export const usePriorityStore = create<PriorityState>((set) => ({
  priorities: [],
  loading: false,
  error: null,

  loadPriorities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await PriorityAPI.getAll();
      set({ priorities: response.data, loading: false });
    } catch {
      set({ error: "Could not load priorities", loading: false });
    }
  },
}));
