"use client";

import { Suspense, useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProductCategory } from "../domain/categories";
import { PRODUCT_CATEGORIES } from "../domain/categories";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

function CatalogoContenido() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageValue = Number(searchParams.get("page") ?? "1");
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const categoriaParam = searchParams.get("categoria") ?? "";
  const categoria = PRODUCT_CATEGORIES.some((item) => item.id === categoriaParam)
    ? (categoriaParam as ProductCategory)
    : undefined;
  const buscar = searchParams.get("buscar")?.trim() ?? "";
  const { products, loading, error, totalPages } = useProducts(page, categoria, buscar);

  function updateQuery(values: Record<string, string>) {
    const query = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(values)) {
      if (value) query.set(key, value);
      else query.delete(key);
    }
    router.push(`/catalogo?${query.toString()}`);
  }

  return (
    <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-300 sm:text-4xl">Catálogo de productos</h1>
        <p className="mt-3 text-slate-300">Encuentra los productos disponibles en nuestro mercado El Roble.</p>
      </header>

      <section className="mb-6 rounded-2xl border border-blue-900 bg-blue-950/50 p-5" aria-label="Filtros del catálogo">
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => updateQuery({ categoria: "", page: "1" })} className="rounded-full border border-blue-700 px-4 py-2 text-sm hover:bg-blue-800">Todas</button>
          {PRODUCT_CATEGORIES.map((item) => (
            <button key={item.id} type="button" onClick={() => updateQuery({ categoria: item.id, page: "1" })} aria-pressed={categoria === item.id} className="rounded-full border border-blue-700 px-4 py-2 text-sm hover:bg-blue-800 aria-pressed:bg-blue-700">
              {item.name}
            </button>
          ))}
        </div>
        <SearchForm key={buscar} initialValue={buscar} onSearch={(value) => updateQuery({ buscar: value, page: "1" })} />
      </section>

      {loading && <p className="py-12 text-center" role="status">Cargando productos…</p>}
      {error && <p className="py-12 text-center text-red-300" role="alert">{error}. Verifica que la API esté disponible e inténtalo de nuevo.</p>}
      {!loading && !error && products.length === 0 && <p className="py-12 text-center text-slate-300">No encontramos productos con esos filtros.</p>}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <nav className="mt-9 flex items-center justify-center gap-4" aria-label="Paginación del catálogo">
            <button type="button" disabled={page <= 1} onClick={() => updateQuery({ page: String(page - 1) })} className="rounded-lg border border-blue-700 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
            <span aria-live="polite">Página {page} de {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => updateQuery({ page: String(page + 1) })} className="rounded-lg border border-blue-700 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
          </nav>
        </>
      )}
    </div>
  );
}

function SearchForm({ initialValue, onSearch }: { initialValue: string; onSearch: (value: string) => void }) {
  const [value, setValue] = useState(initialValue);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form onSubmit={submitSearch} className="mx-auto flex max-w-xl gap-2">
      <label className="sr-only" htmlFor="buscar-producto">Buscar producto</label>
      <input id="buscar-producto" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Buscar producto, por ejemplo: arroz" className="min-w-0 flex-1 rounded-lg border border-blue-800 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Buscar</button>
    </form>
  );
}

export default function CatalogoCliente() {
  return (
    <Suspense fallback={<p className="py-12 text-center text-slate-200" role="status">Cargando catálogo…</p>}>
      <CatalogoContenido />
    </Suspense>
  );
}
