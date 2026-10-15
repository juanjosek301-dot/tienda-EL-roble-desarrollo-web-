import Link from "next/link";
import Categorias from "@/features/productos/components/Categorias";
import ProductosDestacados from "@/features/productos/components/ProductosDestacados";
import SobreElRoble from "./SobreElRoble";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-[700px] rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-xl sm:p-10">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-blue-800 md:text-5xl">Todo lo que necesitas para tu hogar</h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            Encuentra productos de la canasta familiar con precios accesibles y calidad garantizada en Medellín.
          </p>
          <Link href="/catalogo" className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-900/50 transition-all hover:-translate-y-1 hover:bg-blue-500">
            Ver catálogo completo
          </Link>
        </div>
      </section>
      <Categorias />
      <ProductosDestacados />
      <SobreElRoble />
    </div>
  );
}
