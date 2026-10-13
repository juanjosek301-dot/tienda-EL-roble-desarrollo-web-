"use client";

import CustomerFields from "./CustomerFields";
import OrderSummary from "./OrderSummary";
import PaymentAndNotes from "./PaymentAndNotes";
import ProductSelection from "./ProductSelection";
import { useOrderForm } from "../hooks/useOrderForm";
import { useOrderProducts } from "../hooks/useOrderProducts";

export default function OrderForm() {
  const { products, loading, error: productsError } = useOrderProducts();
  const form = useOrderForm(products);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="mx-auto max-w-5xl space-y-8">
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
      <button
        type="submit"
        disabled={form.submitting || loading || Boolean(productsError) || products.length === 0}
        className="w-full rounded-xl bg-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {form.submitting ? "Enviando pedido…" : "Confirmar pedido"}
      </button>
      <p className="text-center text-sm text-slate-600">Debes iniciar sesión para enviar el pedido.</p>
    </form>
  );
}
