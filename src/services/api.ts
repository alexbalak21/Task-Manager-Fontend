import axios from "axios";
import { useAuthStore } from "../modules/auth/state/auth.store";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        await useAuthStore.getState().refresh();
        return api(original);
      } catch {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
