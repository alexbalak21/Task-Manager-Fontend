// Delete profile image
export const deleteProfileImage = async (): Promise<{ success: boolean; message: string }> => {
  const res = await api.delete("/api/user/image");
  return res.data;
};
// Upload profile image
export const uploadProfileImage = async (file: File): Promise<{ success: boolean; message: string; profileImage?: string }> => {
  const formData = new FormData();
  formData.append("profile_image", file);
  const res = await api.post("/api/user/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
import { api } from "../../../services/api";

export interface UserDto {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

export interface UpdateUserDto {
  id: number;
  name?: string;
  email?: string;
  profileImage?: string;
  password?: string;
}

export const getAllUsers = async (): Promise<UserDto[]> => {
  const res = await api.get("/api/users");
  return res.data;
};

export const updateUser = async (user: UpdateUserDto): Promise<UserDto> => {
  const res = await api.put(`/api/users/${user.id}`, user);
  return res.data;
};
