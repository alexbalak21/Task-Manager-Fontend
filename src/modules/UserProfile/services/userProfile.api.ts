import { api } from "../../../services/api";

export interface UserProfileDto {
	id: number;
	name: string;
	email: string;
	role?: string;
	profileImage?: string | null;
	profile_image?: string | null;
}

export interface UpdateUserProfilePayload {
	name?: string;
	email?: string;
}

export interface UpdateUserPasswordPayload {
	password: string;
	newPassword: string;
}

export interface ProfileImageResponse {
	success: boolean;
	message: string;
	profileImage?: string;
}

export const normalizeUserProfile = (user: UserProfileDto): UserProfileDto => ({
	...user,
	profileImage: user.profileImage ?? user.profile_image ?? null,
});

export const getCurrentUserProfile = async (): Promise<UserProfileDto> => {
	const response = await api.get("/api/user");
	return normalizeUserProfile(response.data as UserProfileDto);
};

export const updateCurrentUserProfile = async (
	payload: UpdateUserProfilePayload,
): Promise<UserProfileDto> => {
	const response = await api.put("/api/user", payload);
	return normalizeUserProfile(response.data as UserProfileDto);
};

export const updateCurrentUserPassword = async (
	payload: UpdateUserPasswordPayload,
): Promise<{ success: boolean; message: string }> => {
	const response = await api.put("/api/user/password", {
		password: payload.password,
		new_password: payload.newPassword,
	});
	return response.data;
};

export const uploadProfileImage = async (file: File): Promise<ProfileImageResponse> => {
	const formData = new FormData();
	formData.append("profile_image", file);

	const response = await api.post("/api/user/image", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data as ProfileImageResponse;
};

export const deleteProfileImage = async (): Promise<{ success: boolean; message: string }> => {
	const response = await api.delete("/api/user/image");
	return response.data;
};