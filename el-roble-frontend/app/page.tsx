// src/app/page.tsx
import Link from "next/link";
import Categorias from "@/features/productos/components/Categorias";
import ProductosDestacados from "@/features/productos/components/ProductosDestacados";
import SobreElRoble from "@/features/common/components/SobreElRoble";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">

      {/* 1. Hero Section (Bienvenida) */}
      <section className="py-16 px-4">
        <div className="max-w-[700px] mx-auto bg-blue-950/50 border border-blue-800 rounded-2xl p-10 text-center shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-4 leading-tight">
            Todo lo que necesitas para tu hogar
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Encuentra productos de la canasta familiar con precios accesibles y
            calidad garantizada en Medellín.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition-all hover:-translate-y-1 shadow-lg shadow-blue-900/50"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* 2. Sección de Categorías (Interactiva) */}
      <Categorias />

      {/* 3. Sección de Productos Destacados */}
      <ProductosDestacados />

      {/* 4. Sección Sobre El Roble */}
      <SobreElRoble />

    </div>
  );
}
