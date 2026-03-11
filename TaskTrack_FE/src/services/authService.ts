import apiClient from "@/lib/axios";
import { AuthResponse } from "@/types";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  login: (data: LoginData) => apiClient.post<AuthResponse>("/auth/login", data),
  register: (data: RegisterData) => apiClient.post<AuthResponse>("/auth/register", data),
};
