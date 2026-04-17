import { create } from "zustand";
import { getAllUsers, updateUser as updateUserApi } from "../services/users.api";
import type { UpdateUserDto, UserDto } from "../services/users.api";

interface UsersState {
  users: UserDto[];
  loading: boolean;
  error: string | null;

  loadUsers: () => Promise<void>;
  updateUser: (user: UpdateUserDto) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  loadUsers: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getAllUsers();
      set({ users: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateUser: async (user: UpdateUserDto) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateUserApi(user);
      set({
        users: get().users.map(u => u.id === updated.id ? updated : u),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
