import { api } from "../../../services/api.ts";

export type PriorityDto = {
	id: number;
	name: string;
	color: string;
};

export const PriorityAPI = {
	getAll: () => api.get<PriorityDto[]>("/api/priorities"),
};
