import { create } from "zustand";
import { getAllUsers } from "../services/users.api";
import type { UserDto } from "../services/users.api";

interface UsersState {
  users: UserDto[];
  loading: boolean;
  error: string | null;

  loadUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
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
}));
