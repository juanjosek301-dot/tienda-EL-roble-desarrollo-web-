"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Header() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-blue-100 bg-white shadow-md">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700 transition-colors hover:text-blue-500">
          🏪 El roble
        </Link>
        <ul className="flex items-center gap-3 text-sm sm:gap-6 sm:text-base">
          <li><Link href="/catalogo" className="font-bold text-gray-800 transition-colors hover:text-blue-700">Catálogo</Link></li>
          <li className="hidden sm:block"><Link href="/sobre-nosotros" className="font-bold text-gray-800 transition-colors hover:text-blue-700">Sobre nosotros</Link></li>
          <li><Link href="/pedido" className="font-bold text-gray-800 transition-colors hover:text-blue-700">Realizar pedido</Link></li>
          {!isLoading && user && <li className="hidden md:block"><Link href="/mis-pedidos" className="font-bold text-gray-800 hover:text-blue-700">Mis pedidos</Link></li>}
          {!isLoading && user?.role === "admin" && <li className="hidden md:block"><Link href="/admin" className="font-bold text-gray-800 hover:text-blue-700">Administración</Link></li>}
          {!isLoading && (user ? (
            <li className="flex items-center gap-2">
              <span className="hidden text-sm font-medium text-slate-600 lg:inline">Hola, {user.nombre}</span>
              <button type="button" onClick={logout} className="rounded-lg bg-slate-700 px-3 py-2 font-semibold text-white transition-colors hover:bg-slate-600">Salir</button>
            </li>
          ) : (
            <li><Link href="/login" className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600">Ingresar</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
