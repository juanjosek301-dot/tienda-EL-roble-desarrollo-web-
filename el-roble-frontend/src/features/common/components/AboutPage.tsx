import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-5xl px-4 py-12 text-slate-800 sm:px-6">
      <header className="mb-10 rounded-2xl bg-blue-950 px-6 py-12 text-center text-white sm:px-10">
        <h1 className="text-3xl font-extrabold text-blue-200 sm:text-4xl">Sobre nosotros</h1>
        <p className="mt-3 text-slate-200">Conoce más sobre El Roble, nuestro propósito y lo que ofrecemos.</p>
      </header>
      <div className="space-y-6">
        <section className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800">¿Quiénes somos?</h2>
          <p className="mt-3 leading-7 text-slate-700">El Roble es un minimercado ubicado en Medellín que busca ofrecer productos de la canasta familiar de manera práctica y accesible. Contamos con diferentes productos para satisfacer las necesidades básicas de nuestros clientes.</p>
        </section>
        <section className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800">¿Qué ofrecemos?</h2>
          <p className="mt-3 text-slate-700">En nuestro mercado puedes encontrar diferentes categorías de productos:</p>
          <ul className="mt-3 grid list-inside list-disc grid-cols-1 gap-2 text-slate-700 sm:grid-cols-2">
            <li>Abarrotes</li><li>Bebidas</li><li>Productos de aseo</li><li>Lácteos</li><li>Snacks</li>
          </ul>
        </section>
        <section className="rounded-xl border border-blue-100 bg-white p-6 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800">Nuestro compromiso</h2>
          <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-700">Nuestro objetivo es brindar productos de calidad y una atención cercana a nuestros clientes, facilitando sus compras del día a día.</p>
          <Link href="/catalogo" className="mt-6 inline-flex rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-600">Ver catálogo</Link>
        </section>
      </div>
    </div>
  );
}
