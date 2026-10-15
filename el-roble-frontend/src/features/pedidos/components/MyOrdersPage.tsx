"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import type { Pedido } from "../domain/types";

const money = (amount: number) => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
}).format(amount);

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getMyOrders()
      .then((data) => { if (active) setOrders(data); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "No fue posible cargar tus pedidos.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900">Mis pedidos</h1>
        <p className="mt-2 text-slate-600">Consulta el estado y el detalle de tus pedidos.</p>
      </header>
      {loading && <p className="rounded-xl bg-white p-6 text-slate-700" role="status">Cargando tus pedidos…</p>}
      {error && <p className="rounded-xl bg-red-50 p-5 text-red-800" role="alert">{error}</p>}
      {!loading && !error && orders.length === 0 && <p className="rounded-xl bg-white p-6 text-slate-700">Todavía no tienes pedidos.</p>}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-5">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Pedido #{order.id}</h2>
                  <p className="mt-1 text-sm text-slate-600">{new Date(order.createdAt).toLocaleString("es-CO")}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold capitalize text-blue-800">{order.estado}</span>
              </div>
              <ul className="space-y-2 py-4">
                {order.productos.map((item) => (
                  <li key={item.productoId} className="flex justify-between gap-4 text-sm text-slate-700">
                    <span>{item.nombre} × {item.cantidad}</span>
                    <span>{money(item.precio * item.cantidad)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap justify-between gap-2 border-t border-slate-100 pt-4 text-sm">
                <span className="capitalize text-slate-600">Pago: {order.metodoPago}</span>
                <span className="font-bold text-blue-900">Total: {money(order.total)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
