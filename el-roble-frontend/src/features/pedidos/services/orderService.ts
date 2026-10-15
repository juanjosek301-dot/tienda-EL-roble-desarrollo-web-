import { fetchWithAuth } from "@/features/common/http";
import type { CreateOrderRequest, Pedido } from "../domain/types";

async function readError(response: Response, fallback: string) {
  const body: unknown = await response.json().catch(() => null);
  if (typeof body === "object" && body !== null && "message" in body && typeof body.message === "string") {
    return body.message;
  }
  return fallback;
}

export async function createOrder(order: CreateOrderRequest): Promise<void> {
  const response = await fetchWithAuth("/api/pedidos", {
    method: "POST",
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(await readError(response, "No fue posible guardar el pedido. Inténtalo de nuevo."));
  }

}

export async function getMyOrders(): Promise<Pedido[]> {
  const response = await fetchWithAuth("/api/pedidos/mias");
  if (!response.ok) {
    throw new Error(await readError(response, "No fue posible cargar tus pedidos."));
  }

  const body: unknown = await response.json();
  if (Array.isArray(body)) return body as Pedido[];
  if (typeof body === "object" && body !== null && "data" in body && Array.isArray(body.data)) {
    return body.data as Pedido[];
  }
  throw new Error("La respuesta de la API de pedidos no tiene el formato esperado.");
}
