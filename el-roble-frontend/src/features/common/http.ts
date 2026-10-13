// src/features/common/http.ts

import { API_BASE_URL } from "./config";

/**
 * Cliente HTTP centralizado que:
 * 1. Agrega el token JWT automáticamente a cada petición
 * 2. Maneja errores 401 (token expirado) redirigiendo al login
 * 3. Centraliza la URL base de la API
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // This client is called by client-side services/hooks. Guard access so it is
  // also safe if a caller is rendered during server-side work.
  const token = typeof window === "undefined" ? null : window.localStorage.getItem("token");

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Si hay token, agregarlo al header Authorization
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Si el token expiró o es inválido (401), limpiar sesión y redirigir a login
  if (response.status === 401 && !endpoint.startsWith("/api/auth/")) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.location.assign("/login");
    }
  }

  return response;
}
