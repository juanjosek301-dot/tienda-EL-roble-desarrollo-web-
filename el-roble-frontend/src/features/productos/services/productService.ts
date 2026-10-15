import { fetchWithAuth } from "@/features/common/http";
import type { Product, ProductResponse } from "../domain/types";

export type ProductInput = Omit<Product, "id">;

async function ensureSuccess(response: Response, fallback: string) {
  if (response.ok) return;
  const body: unknown = await response.json().catch(() => null);
  const message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
    ? body.message
    : fallback;
  throw new Error(message);
}

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

export async function createProduct(product: ProductInput): Promise<void> {
  const response = await fetchWithAuth("/api/productos", {
    method: "POST",
    body: JSON.stringify(product),
  });
  await ensureSuccess(response, "No fue posible crear el producto.");
}

export async function updateProduct(id: number, product: ProductInput): Promise<void> {
  const response = await fetchWithAuth(`/api/productos/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  await ensureSuccess(response, "No fue posible actualizar el producto.");
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetchWithAuth(`/api/productos/${id}`, { method: "DELETE" });
  await ensureSuccess(response, "No fue posible eliminar el producto.");
}
