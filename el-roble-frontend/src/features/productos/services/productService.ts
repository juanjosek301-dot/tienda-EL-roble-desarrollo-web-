import { fetchWithAuth } from "@/features/common/http";
import type { ProductResponse } from "../domain/types";

export interface ProductQuery {
  page?: number;
  categoria?: string;
  buscar?: string;
}

export async function getProducts({ page = 1, categoria, buscar }: ProductQuery = {}): Promise<ProductResponse> {
  const query = new URLSearchParams({ page: String(page) });
  if (categoria) query.set("categoria", categoria);
  if (buscar) query.set("buscar", buscar);

  const response = await fetchWithAuth(`/api/productos?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`No fue posible cargar el catálogo (${response.status}).`);
  }

  return (await response.json()) as ProductResponse;
}

export async function getAllProducts(): Promise<ProductResponse["data"]> {
  const firstPage = await getProducts({ page: 1 });
  if (firstPage.pagination.totalPages <= 1) return firstPage.data;

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.pagination.totalPages - 1 }, (_, index) =>
      getProducts({ page: index + 2 }),
    ),
  );

  return [...firstPage.data, ...remainingPages.flatMap((response) => response.data)];
}
