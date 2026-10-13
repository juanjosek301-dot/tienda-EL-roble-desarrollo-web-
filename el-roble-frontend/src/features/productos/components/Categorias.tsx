
"use client";

import Link from "next/link";
import { PRODUCT_CATEGORIES } from "../domain/categories";

export default function Categorias() {
    return (
        <section className="py-12 px-4">
            <div className="max-w-[1200px] mx-auto bg-blue-950/50 border border-blue-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
                Compra por categorías
            </h2>
            <p className="text-gray-400 text-center mb-6">
            Selecciona una categoría para encontrar los productos que necesitas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PRODUCT_CATEGORIES.map((cat) => (
                <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.id}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border bg-slate-900 border-blue-800 text-gray-300 hover:border-blue-600 hover:text-white transition-all"
            >
            <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
            </Link>
            ))}
        </div>
    </div>
    </section>
    );
}
