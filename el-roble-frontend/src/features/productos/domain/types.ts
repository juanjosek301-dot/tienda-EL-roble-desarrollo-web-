// src/features/productos/domain/types.ts

/**
 * Interfaz que define qué es un Producto en el sistema.
 * Esta es la "regla vital del negocio" según Arquitectura Limpia.
 */
export interface Product {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
}

/**
 * Respuesta paginada de la API.
 * Sigue el formato que exige la rúbrica: { pagination, data }
 */
export interface ProductResponse {
    pagination: {
        page: number;
        totalPages: number;
        totalItems: number;
    };
    data: Product[];
}