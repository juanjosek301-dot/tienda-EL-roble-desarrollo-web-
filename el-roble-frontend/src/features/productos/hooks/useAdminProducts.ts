"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../domain/types";
import type { ProductInput } from "../services/productService";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../services/productService";

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setError("");
    try {
      setProducts(await getAllProducts());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No fue posible cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getAllProducts()
      .then((data) => { if (active) setProducts(data); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "No fue posible cargar el catálogo.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function save(product: ProductInput, id?: number) {
    setSaving(true);
    setError("");
    try {
      if (id === undefined) await createProduct(product);
      else await updateProduct(id, product);
      await reload();
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No fue posible guardar el producto.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    setSaving(true);
    setError("");
    try {
      await deleteProduct(id);
      await reload();
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No fue posible eliminar el producto.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { products, loading, saving, error, save, remove };
}
