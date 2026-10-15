// src/features/common/components/SobreElRoble.tsx
    import Link from "next/link";

    export default function SobreElRoble() {
    return (
        <section className="mb-12 bg-blue-50 px-4 py-12">
        <div className="mx-auto max-w-[1200px] rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-blue-800">
            Sobre El Roble
            </h2>
            <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-slate-600">
            El Roble es un minimercado ubicado en Medellín que ofrece productos de
            la canasta básica, bebidas, lácteos, artículos de aseo y snacks para
            el hogar, con la mejor calidad y precios accesibles.
            </p>
            <Link
            href="/sobre-nosotros"
            className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors"
            >
            Conócenos
            </Link>
        </div>
        </section>
    );
    }
