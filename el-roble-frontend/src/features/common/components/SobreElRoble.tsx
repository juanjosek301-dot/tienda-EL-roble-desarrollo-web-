// src/features/common/components/SobreElRoble.tsx
    import Link from "next/link";

    export default function SobreElRoble() {
    return (
        <section className="py-12 px-4 mb-12">
        <div className="max-w-[1200px] mx-auto bg-blue-950/50 border border-blue-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
            Sobre El Roble
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
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