import type { Product } from "@/features/productos/domain/types";

interface ProductSelectionProps {
  products: Product[];
  quantities: Record<number, number>;
  loading: boolean;
  loadError: string | null;
  selectionError?: string;
  onToggle: (productId: number, selected: boolean) => void;
  onQuantityChange: (productId: number, value: string) => void;
}

const money = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

export default function ProductSelection({
  products,
  quantities,
  loading,
  loadError,
  selectionError,
  onToggle,
  onQuantityChange,
}: ProductSelectionProps) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-900">1. Selecciona tus productos</h2>
      <p className="mt-2 text-slate-600">Marca los productos que deseas y especifica la cantidad.</p>
      {loading && <p className="py-8 text-center" role="status">Cargando productos…</p>}
      {loadError && <p className="py-6 text-red-700" role="alert">{loadError}</p>}
      {!loading && !loadError && products.length === 0 && <p className="py-6 text-slate-600">No hay productos disponibles.</p>}
      {!loading && !loadError && products.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {products.map((product) => {
            const selected = quantities[product.id] !== undefined;
            return (
              <div key={product.id} className="flex items-center gap-3 rounded-xl border border-blue-100 p-3">
                <input
                  id={`producto-${product.id}`}
                  type="checkbox"
                  checked={selected}
                  onChange={(event) => onToggle(product.id, event.target.checked)}
                  className="h-5 w-5 accent-blue-700"
                />
                <label htmlFor={`producto-${product.id}`} className="min-w-0 flex-1 cursor-pointer">
                  <span className="block font-semibold text-slate-800">{product.nombre}</span>
                  <span className="text-sm text-slate-600">{money(product.precio)}</span>
                </label>
                <input
                  aria-label={`Cantidad de ${product.nombre}`}
                  type="number"
                  min={1}
                  step={1}
                  disabled={!selected}
                  value={selected ? quantities[product.id] : 1}
                  onChange={(event) => onQuantityChange(product.id, event.target.value)}
                  className="w-20 rounded-lg border border-slate-300 px-2 py-2 text-center disabled:bg-slate-100"
                />
              </div>
            );
          })}
        </div>
      )}
      {selectionError && <p className="mt-3 text-sm text-red-700" role="alert">{selectionError}</p>}
    </section>
  );
}
