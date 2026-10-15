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
  const [loadedQuery, setLoadedQuery] = useState<string | null>(null);
  const [queryError, setQueryError] = useState<{ key: string; message: string } | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const queryKey = `${page}|${categoria ?? ""}|${buscar ?? ""}`;

  // La carga depende de los filtros de la URL; el resultado anterior no se muestra como actual.
  useEffect(() => {
    let vigente = true;

    getProducts({ page, categoria, buscar })
      .then((response) => {
        if (!vigente) return;
        setProducts(response.data);
        setTotalPages(response.pagination.totalPages);
        setQueryError(null);
      })
      .catch(() => {
        if (!vigente) return;
        setQueryError({ key: queryKey, message: "Error al cargar los productos" });
      })
      .finally(() => {
        if (vigente) setLoadedQuery(queryKey);
      });

    return () => {
      vigente = false;
    };
  }, [page, categoria, buscar, queryKey]);

  const loading = loadedQuery !== queryKey;
  const error = queryError?.key === queryKey ? queryError.message : null;

  return { products, loading, error, page, totalPages };
}
