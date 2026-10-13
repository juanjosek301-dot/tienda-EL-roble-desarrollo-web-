"use client";

import { useState } from "react";
import type { CreateOrderRequest } from "../domain/types";
import { createOrder } from "../services/orderService";

export function useCreateOrder() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitOrder(order: CreateOrderRequest) {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await createOrder(order);
      setSuccess(true);
      return true;
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : "No fue posible guardar el pedido.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  return { submitOrder, submitting, error, success };
}
