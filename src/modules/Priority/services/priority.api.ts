import type { PriorityDto } from "../types/priority.dto";
import { api } from "../../../services/api";

export const PriorityAPI = {
  getAll: () => api.get<PriorityDto[]>("/api/priorities"),
};
