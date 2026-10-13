export type PaymentMethod = "efectivo" | "nequi";

export interface OrderProductInput {
  productoId: number;
  cantidad: number;
}

export interface CreateOrderRequest {
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
  };
  productos: OrderProductInput[];
  metodoPago: PaymentMethod;
  observaciones: string;
}

export interface OrderContact {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  observaciones: string;
}

export type OrderFieldErrors = Partial<Record<keyof OrderContact | "productos" | "metodoPago", string>>;
