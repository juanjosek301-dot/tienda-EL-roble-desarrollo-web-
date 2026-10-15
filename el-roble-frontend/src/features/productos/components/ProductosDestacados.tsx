"use client";

import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function ProductosDestacados() {
    const { products, loading, error } = useProducts(1);
    const destacados = products.slice(0, 4);

    return (
        <section className="bg-blue-50 px-4 py-12">
        <div className="mx-auto max-w-[1200px] rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 text-center text-2xl font-bold text-blue-800">
            Productos destacados
            </h2>
            <p className="mb-8 text-center text-slate-600">
            Conoce algunos de los productos que puedes encontrar en nuestro mercado.
            </p>

            {loading && <p className="text-center text-slate-600" role="status">Cargando productos destacados…</p>}
            {error && <p className="rounded-lg bg-red-50 p-4 text-center text-red-800" role="alert">{error}</p>}
            {!loading && !error && destacados.length === 0 && (
              <p className="text-center text-slate-600">Todavía no hay productos destacados.</p>
            )}
            {!loading && !error && destacados.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
            ))}
            </div>}
        </div>
        </section>
    );
}
