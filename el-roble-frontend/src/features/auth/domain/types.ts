export type UserRole = "admin" | "user";

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  nombre: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
