
"use client";

import Link from "next/link";
import { PRODUCT_CATEGORIES } from "../domain/categories";

export default function Categorias() {
    return (
        <section className="bg-blue-50 px-4 py-12">
            <div className="mx-auto max-w-[1200px] rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 text-center text-2xl font-bold text-blue-800">
                Compra por categorías
            </h2>
            <p className="mb-6 text-center text-slate-600">
            Selecciona una categoría para encontrar los productos que necesitas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PRODUCT_CATEGORIES.map((cat) => (
                <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.id}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-3 text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-100 sm:px-4"
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
