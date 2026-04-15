import { api } from "../../../services/api";

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export const getAllUsers = async (): Promise<UserDto[]> => {
  const res = await api.get("/api/users");
  return res.data.users;
};
