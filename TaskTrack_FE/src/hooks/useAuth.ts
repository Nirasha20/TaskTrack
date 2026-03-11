import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export function useAuth() {
  const { user, isAuthenticated, isInitialized, login, logout, initialize } = useAuthStore();
  const router = useRouter();

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data } = await authService.login({ email, password });
      login(data.token, data.role, email);
      router.replace("/tasks");
    },
    [login, router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string, role: 'USER' | 'ADMIN') => {
      const { data } = await authService.register({ name, email, password, role });
      login(data.token, data.role, email);
      router.replace("/tasks");
    },
    [login, router]
  );

  const signOut = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  return { user, isAuthenticated, isInitialized, initialize, signIn, register, signOut };
}
