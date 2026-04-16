
import { api } from "../../../services/api.ts";

export type StatusDto = {
	id: number;
	name: string;
	color: string;
};

export const StatusAPI = {
	getAll: () => api.get<StatusDto[]>("/api/statuses"),
};
