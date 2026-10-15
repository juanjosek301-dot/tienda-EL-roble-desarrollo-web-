"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CustomerFields from "./CustomerFields";
import OrderSummary from "./OrderSummary";
import PaymentAndNotes from "./PaymentAndNotes";
import ProductSelection from "./ProductSelection";
import { useOrderForm } from "../hooks/useOrderForm";
import { useOrderProducts } from "../hooks/useOrderProducts";

export default function OrderForm() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { products, loading, error: productsError } = useOrderProducts();
  const form = useOrderForm(products);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!user) {
      event.preventDefault();
      router.push("/login?next=%2Fpedido");
      return;
    }
    void form.handleSubmit(event);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-5xl space-y-8">
      <ProductSelection
        products={products}
        quantities={form.quantities}
        loading={loading}
        loadError={productsError}
        selectionError={form.errors.productos}
        onToggle={form.toggleProduct}
        onQuantityChange={form.updateQuantity}
      />
      <OrderSummary total={form.total} />
      <CustomerFields contact={form.contact} errors={form.errors} onChange={form.updateContact} />
      <PaymentAndNotes
        paymentMethod={form.paymentMethod}
        observations={form.contact.observaciones}
        paymentError={form.errors.metodoPago}
        onPaymentChange={form.updatePaymentMethod}
        onObservationsChange={(value) => form.updateContact("observaciones", value)}
      />
      {form.submitError && <p className="rounded-lg bg-red-50 p-4 text-red-800" role="alert">{form.submitError}</p>}
      {form.success && <p className="rounded-lg bg-green-50 p-4 text-green-800" role="status">¡Tu pedido fue recibido! Te contactaremos para coordinar la entrega.</p>}
      {!authLoading && !user ? (
        <div className="space-y-3 text-center">
          <p className="text-sm text-slate-600">Inicia sesión para confirmar el pedido y asociarlo a tu cuenta.</p>
          <Link href="/login?next=%2Fpedido" className="inline-flex rounded-xl bg-blue-700 px-6 py-4 text-lg font-bold text-white hover:bg-blue-600">
            Iniciar sesión para continuar
          </Link>
        </div>
      ) : (
        <button
          type="submit"
          disabled={authLoading || form.submitting || loading || Boolean(productsError) || products.length === 0}
          className="w-full rounded-xl bg-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {authLoading ? "Comprobando sesión…" : form.submitting ? "Enviando pedido…" : "Confirmar pedido"}
        </button>
      )}
    </form>
  );
}
