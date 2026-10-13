"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/features/productos/domain/types";
import { getAllProducts } from "@/features/productos/services/productService";

export function useOrderProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;

    getAllProducts()
      .then((data) => {
        if (vigente) setProducts(data);
      })
      .catch(() => {
        if (vigente) setError("No se pudo cargar el catálogo para crear el pedido.");
      })
      .finally(() => {
        if (vigente) setLoading(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  return { products, loading, error };
}
