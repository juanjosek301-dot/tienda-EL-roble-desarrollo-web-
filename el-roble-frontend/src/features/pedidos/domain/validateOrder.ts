import type { OrderContact, OrderFieldErrors, PaymentMethod } from "./types";

export function validateOrder(
  contact: OrderContact,
  selectedProductCount: number,
  paymentMethod: PaymentMethod | "",
): OrderFieldErrors {
  const errors: OrderFieldErrors = {};

  if (contact.nombre.trim().length < 3) {
    errors.nombre = "Ingresa tu nombre completo (mínimo 3 caracteres).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  if (!/^\d{7,10}$/.test(contact.telefono.trim())) {
    errors.telefono = "Ingresa un teléfono válido de 7 a 10 dígitos.";
  }
  if (contact.direccion.trim().length < 5) {
    errors.direccion = "La dirección debe tener al menos 5 caracteres.";
  }
  if (selectedProductCount === 0) errors.productos = "Selecciona al menos un producto.";
  if (!paymentMethod) errors.metodoPago = "Selecciona un método de pago.";

  return errors;
}
