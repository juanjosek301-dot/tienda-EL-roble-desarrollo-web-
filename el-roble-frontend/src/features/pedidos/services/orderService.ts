import { fetchWithAuth } from "@/features/common/http";
import type { CreateOrderRequest } from "../domain/types";

export async function createOrder(order: CreateOrderRequest): Promise<void> {
  const response = await fetchWithAuth("/api/pedidos", {
    method: "POST",
    body: JSON.stringify(order),
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
        ? body.message
        : "No fue posible guardar el pedido. Inténtalo de nuevo.";
    throw new Error(message);
  }

}
