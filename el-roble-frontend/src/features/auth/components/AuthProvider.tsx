"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { login as loginRequest, register as registerRequest } from "../services/authService";
import type { AuthContextValue } from "../hooks/authContext";
import { AuthContext } from "../hooks/authContext";
import type { LoginRequest, RegisterRequest, User } from "../domain/types";

const USER_STORAGE_KEY = "user";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = window.localStorage.getItem("token");
      const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
      if (token && storedUser) setUser(JSON.parse(storedUser) as User);
      else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function login(credentials: LoginRequest) {
    const result = await loginRequest(credentials);
    if (!result?.token || !result.user) throw new Error("La respuesta del servidor no contiene una sesión válida.");
    window.localStorage.setItem("token", result.token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
    setUser(result.user);
  }

  async function register(data: RegisterRequest) {
    await registerRequest(data);
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(() => ({ user, isLoading, login, register, logout }), [user, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
