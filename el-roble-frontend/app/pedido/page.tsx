import OrderForm from "@/features/pedidos/components/OrderForm";

export default function PedidoPage() {
  return (
    <main className="min-h-[70vh] bg-blue-50 px-4 py-10 sm:px-6">
      <header className="mx-auto mb-8 max-w-5xl text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">Realizar pedido</h1>
        <p className="mt-3 text-slate-700">Selecciona los productos que deseas y completa tus datos para finalizar la compra.</p>
      </header>
      <OrderForm />
    </main>
  );
}
