import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthUser, UserRole } from "@/types";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  login: (token: string, role: UserRole, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      initialize: () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const user: AuthUser | null = userStr ? JSON.parse(userStr) : null;
        set({ token, user, isAuthenticated: !!token, isInitialized: true });
      },

      login: (token, role, email) => {
        const user: AuthUser = { email, role };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ token, user, isAuthenticated: true, isInitialized: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    { name: "AuthStore" }
  )
);
