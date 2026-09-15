import { api } from "../../../services/api";

export interface TeamMemberDto {
	id: number;
	team_id: number;
	user_id: number;
	name: string;
	email: string;
	joined_at: string;
}

export interface TeamDto {
	id: number;
	name: string;
	description: string | null;
	created_by: number;
	manager_name: string | null;
	created_at: string;
	member_count: number;
	members?: TeamMemberDto[];
}

export interface InviteCodeDto {
	id: number;
	code: string;
	team_id: number;
	is_active: boolean;
	created_at: string;
}

export const TeamsAPI = {
	list: () => api.get<TeamDto[]>("/api/teams"),

	get: (teamId: number) => api.get<TeamDto>(`/api/teams/${teamId}`),

	create: (name: string, description?: string) =>
		api.post<TeamDto>("/api/teams", { name, description }),

	update: (teamId: number, data: { name?: string; description?: string }) =>
		api.put<TeamDto>(`/api/teams/${teamId}`, data),

	remove: (teamId: number) => api.delete(`/api/teams/${teamId}`),

	addMember: (teamId: number, userId: number) =>
		api.post<TeamMemberDto>(`/api/teams/${teamId}/members`, { user_id: userId }),

	removeMember: (teamId: number, userId: number) =>
		api.delete(`/api/teams/${teamId}/members/${userId}`),

	getInviteCode: (teamId: number) => api.get<InviteCodeDto>(`/api/teams/${teamId}/invite-code`),

	regenerateInviteCode: (teamId: number) =>
		api.post<InviteCodeDto>(`/api/teams/${teamId}/invite-code/regenerate`),
};
