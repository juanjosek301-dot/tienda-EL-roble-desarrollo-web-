// src/features/productos/hooks/useProducts.ts

"use client"; // Necesario porque usa hooks de React (cliente)

import { useState, useEffect } from "react";
import { Product } from "../domain/types";
import { getProducts } from "../application/getProducts";

/**
 * Hook personalizado para manejar el estado de productos.
 * 
 * Aplica los patrones de tus PDFs:
 * - useState: Memoria del componente (productos, loading, error, page)
 * - useEffect: Efecto secundario (llamar a la API cuando cambia la página)
 */
export function useProducts() {
  // Estados (memoria del componente)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Efecto: Cargar productos cuando cambia la página
  useEffect(() => {
    setLoading(true);
    setError(null);

    getProducts(page)
      .then((response) => {
        setProducts(response.data);
        setTotalPages(response.pagination.totalPages);
      })
      .catch(() => {
        setError("Error al cargar los productos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]); // Solo se re-ejecuta cuando cambia 'page'

  return { products, loading, error, page, totalPages, setPage };
}