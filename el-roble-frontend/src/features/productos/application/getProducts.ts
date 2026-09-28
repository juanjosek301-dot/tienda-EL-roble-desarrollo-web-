// src/features/productos/application/getProducts.ts

import { Product, ProductResponse } from "../domain/types";
import { mockProducts } from "../infrastructure/mockProducts";

/**
 * Caso de uso: Obtener productos con paginación.
 * 
 * Por ahora usa datos mock. Cuando tengamos la API real,
 * reemplazamos esto con fetchWithAuth('/api/productos?page=${page}').
 * 
 * @param page - Número de página (default: 1)
 * @returns Promise con productos paginados
 */
export async function getProducts(page: number = 1): Promise<ProductResponse> {
    const itemsPerPage = 8; // Productos por página
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Simulamos un delay de red (quitar cuando conectemos con API real)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        pagination: {
            page,
            totalPages: Math.ceil(mockProducts.length / itemsPerPage),
            totalItems: mockProducts.length,
        },

        data: mockProducts.slice(startIndex, endIndex),
        };
}