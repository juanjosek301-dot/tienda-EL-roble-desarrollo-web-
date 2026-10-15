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

export interface PedidoProducto {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface Pedido {
  id: number;
  createdAt: string;
  estado: string;
  total: number;
  metodoPago: PaymentMethod;
  productos: PedidoProducto[];
}

export interface OrderContact {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  observaciones: string;
}

export type OrderFieldErrors = Partial<Record<keyof OrderContact | "productos" | "metodoPago", string>>;
