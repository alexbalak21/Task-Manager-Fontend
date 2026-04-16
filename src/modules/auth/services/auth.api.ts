import { api } from "../../../services/api.ts";

export const AuthAPI = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post("/api/user/register", { name, email, password }),

  refresh: (refreshToken: string) =>
    api.post("/api/auth/refresh", { refresh_token: refreshToken }),

  me: () => api.get("/api/user"),

  logout: () => api.post("/api/auth/logout"),
};
