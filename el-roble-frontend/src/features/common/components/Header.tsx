// src/features/common/components/Header.tsx
"use client"; // Necesario porque más adelante le pondremos interactividad (menú móvil)

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-blue-100 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center px-10 py-4 max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-blue-700 text-2xl font-bold hover:text-blue-500 transition-colors flex items-center gap-2">
          🏪 El roble
        </Link>

        {/* Menú de navegación (Desktop) */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link href="/catalogo" className="text-gray-800 font-bold hover:text-blue-700 transition-colors">
              Catálogo
            </Link>
          </li>
          <li>
            <Link href="/sobre-nosotros" className="text-gray-800 font-bold hover:text-blue-700 transition-colors">
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link href="/pedido" className="text-gray-800 font-bold hover:text-blue-700 transition-colors">
              Realizar pedido
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}