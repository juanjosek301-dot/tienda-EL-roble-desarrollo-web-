"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Product } from "@/features/productos/domain/types";
import type { OrderContact, OrderFieldErrors, PaymentMethod } from "../domain/types";
import { validateOrder } from "../domain/validateOrder";
import { useCreateOrder } from "./useCreateOrder";

const initialContact: OrderContact = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  observaciones: "",
};

export function useOrderForm(products: Product[]) {
  const [contact, setContact] = useState(initialContact);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [errors, setErrors] = useState<OrderFieldErrors>({});
  const { submitOrder, submitting, error: submitError, success } = useCreateOrder();

  const selectedProducts = products.filter((product) => quantities[product.id] !== undefined);
  const total = useMemo(
    () => selectedProducts.reduce((sum, product) => sum + product.precio * quantities[product.id], 0),
    [products, quantities],
  );

  function updateContact(field: keyof OrderContact, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function toggleProduct(productId: number, selected: boolean) {
    setQuantities((current) => {
      if (!selected) {
        const next = { ...current };
        delete next[productId];
        return next;
      }
      return { ...current, [productId]: 1 };
    });
    setErrors((current) => ({ ...current, productos: undefined }));
  }

  function updateQuantity(productId: number, value: string) {
    const quantity = Math.max(1, Math.floor(Number(value)) || 1);
    setQuantities((current) => ({ ...current, [productId]: quantity }));
  }

  function updatePaymentMethod(value: PaymentMethod) {
    setPaymentMethod(value);
    setErrors((current) => ({ ...current, metodoPago: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateOrder(contact, selectedProducts.length, paymentMethod);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !paymentMethod) return;

    const created = await submitOrder({
      cliente: {
        nombre: contact.nombre.trim(),
        email: contact.email.trim(),
        telefono: contact.telefono.trim(),
        direccion: contact.direccion.trim(),
      },
      productos: selectedProducts.map((product) => ({
        productoId: product.id,
        cantidad: quantities[product.id],
      })),
      metodoPago: paymentMethod,
      observaciones: contact.observaciones.trim(),
    });

    if (created) {
      setContact(initialContact);
      setQuantities({});
      setPaymentMethod("");
      setErrors({});
    }
  }

  return {
    contact,
    quantities,
    selectedProducts,
    total,
    paymentMethod,
    errors,
    submitting,
    submitError,
    success,
    updateContact,
    toggleProduct,
    updateQuantity,
    updatePaymentMethod,
    handleSubmit,
  };
}
