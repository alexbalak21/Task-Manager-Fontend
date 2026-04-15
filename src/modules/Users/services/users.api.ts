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
