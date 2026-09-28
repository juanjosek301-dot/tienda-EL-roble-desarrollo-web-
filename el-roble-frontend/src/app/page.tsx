import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-blue-50 py-20 px-4 text-center relative overflow-hidden">
      <div className="bg-white/95 p-10 rounded-2xl shadow-xl max-w-[650px] mx-auto backdrop-blur-sm border border-blue-200 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
          Todo lo que necesitas para tu hogar
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Encuentra productos de la canasta familiar con precios accesibles y calidad garantizada.
        </p>
        <Link
          href="/catalogo"
          className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-lg text-lg"
        >
          Ver catálogo completo
        </Link>
      </div>
    </section>
  );
}