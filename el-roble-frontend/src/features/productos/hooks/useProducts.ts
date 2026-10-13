// src/features/productos/hooks/useProducts.ts

"use client"; // Necesario porque usa hooks de React (cliente)

import { useEffect, useState } from "react";
import type { Product } from "../domain/types";
import { getProducts } from "../services/productService";

/**
 * Hook personalizado para manejar el estado de productos.
 * 
 * Aplica los patrones de tus PDFs:
 * - useState: Memoria del componente (productos, loading, error, page)
 * - useEffect: Efecto secundario (llamar a la API cuando cambia la página)
 */
export function useProducts(page = 1, categoria?: string, buscar?: string) {
  // Estados (memoria del componente)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // Efecto: Cargar productos cuando cambia la página
  useEffect(() => {
    setLoading(true);
    setError(null);

    let vigente = true;

    getProducts({ page, categoria, buscar })
      .then((response) => {
        if (!vigente) return;
        setProducts(response.data);
        setTotalPages(response.pagination.totalPages);
      })
      .catch((error: unknown) => {
        if (!vigente) return;
        setError("Error al cargar los productos");
      })
      .finally(() => {
        if (vigente) setLoading(false);
      });

    return () => {
      vigente = false;
    };
  }, [page, categoria, buscar]);

  return { products, loading, error, page, totalPages };
}
