"use client";

import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function ProductosDestacados() {
    const { products, loading, error } = useProducts(1);
    const destacados = products.slice(0, 4);

    return (
        <section className="py-12 px-4">
        <div className="max-w-[1200px] mx-auto bg-blue-950/50 border border-blue-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
            Productos destacados
            </h2>
            <p className="text-gray-400 text-center mb-8">
            Conoce algunos de los productos que puedes encontrar en nuestro mercado.
            </p>

            {loading && <p className="text-center text-gray-300" role="status">Cargando productos destacados…</p>}
            {error && <p className="text-center text-red-300" role="alert">{error}</p>}
            {!loading && !error && destacados.length === 0 && (
              <p className="text-center text-gray-300">Todavía no hay productos destacados.</p>
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
