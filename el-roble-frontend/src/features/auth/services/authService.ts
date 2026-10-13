import { fetchWithAuth } from "@/features/common/http";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../domain/types";

export class AuthServiceError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "AuthServiceError";
  }
}

async function postAuth<T>(endpoint: string, payload: unknown): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
        ? body.message
        : response.status === 401
          ? "El correo o la contraseña no son correctos."
          : response.status === 409
            ? "Ya existe una cuenta con ese correo."
            : "No fue posible completar la solicitud. Inténtalo de nuevo.";
    throw new AuthServiceError(message, response.status);
  }

  return body as T;
}

export function login(credentials: LoginRequest): Promise<AuthResponse> {
  return postAuth<AuthResponse>("/api/auth/login", credentials);
}

export function register(data: RegisterRequest): Promise<unknown> {
  return postAuth<unknown>("/api/auth/register", data);
}
