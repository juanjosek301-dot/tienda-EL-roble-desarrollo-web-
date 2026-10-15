"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function sessionActions(mobile = false) {
    if (isLoading) return null;
    if (!user) {
      return <Link href="/login" className="rounded-lg bg-blue-700 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-600">Ingresar</Link>;
    }
    return (
      <div className={`flex ${mobile ? "flex-col items-stretch" : "items-center"} gap-3`}>
        <span className={`text-sm font-medium text-slate-600 ${mobile ? "" : "hidden lg:inline"}`}>Hola, {user.nombre}</span>
        <button type="button" onClick={logout} className="rounded-lg bg-slate-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600">Salir</button>
      </div>
    );
  }

  const links = [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/sobre-nosotros", label: "Sobre nosotros" },
    { href: "/pedido", label: "Realizar pedido" },
    ...(user ? [{ href: "/mis-pedidos", label: "Mis pedidos" }] : []),
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Administración" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-blue-100 bg-white shadow-md">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-700 transition-colors hover:text-blue-500 sm:text-2xl">
          🏪 El roble
        </Link>
        <ul className="hidden items-center gap-5 text-sm lg:flex">
          {links.map((link) => <li key={link.href}><Link href={link.href} className="font-bold text-gray-800 transition-colors hover:text-blue-700">{link.label}</Link></li>)}
          <li>{sessionActions()}</li>
        </ul>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 text-2xl text-blue-800 hover:bg-blue-50 lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </nav>
      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-blue-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <ul className="mx-auto flex max-w-[1200px] flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700">{link.label}</Link>
              </li>
            ))}
            <li className="px-3 py-2">{sessionActions(true)}</li>
          </ul>
        </div>
      )}
    </header>
  );
}
