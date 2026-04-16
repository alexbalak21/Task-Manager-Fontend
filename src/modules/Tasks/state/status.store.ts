
import { create } from "zustand";
import { StatusAPI, type StatusDto } from "../services/status.api";

type StatusState = {
	statuses: StatusDto[];
	loading: boolean;
	error: string | null;
	loadStatuses: () => Promise<void>;
};

export const useStatusStore = create<StatusState>((set) => ({
	statuses: [],
	loading: false,
	error: null,

	loadStatuses: async () => {
		set({ loading: true, error: null });
		try {
			const response = await StatusAPI.getAll();
			set({ statuses: response.data, loading: false });
		} catch {
			set({ error: "Could not load statuses", loading: false });
		}
	},
}));
