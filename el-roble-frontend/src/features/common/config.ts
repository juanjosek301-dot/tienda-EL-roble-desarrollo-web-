// src/features/common/config.ts

// URL base de la API. Se lee de la variable de entorno NEXT_PUBLIC_API_HOST
// Si no existe, usa localhost:3001 por defecto (para desarrollo local)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

