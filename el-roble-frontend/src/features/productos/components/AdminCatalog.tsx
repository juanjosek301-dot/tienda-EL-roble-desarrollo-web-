"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "../domain/categories";
import type { Product } from "../domain/types";
import type { ProductInput } from "../services/productService";
import { useAdminProducts } from "../hooks/useAdminProducts";

const emptyForm: ProductInput = { nombre: "", precio: 0, categoria: PRODUCT_CATEGORIES[0].id, imagen: "" };
const money = (amount: number) => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
}).format(amount);

export default function AdminCatalog() {
  const { products, loading, saving, error, save, remove } = useAdminProducts();
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  function edit(product: Product) {
    setEditingId(product.id);
    setForm({ nombre: product.nombre, precio: product.precio, categoria: product.categoria, imagen: product.imagen });
    setFormError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setNotice("");
    if (!form.nombre.trim()) {
      setFormError("Escribe el nombre del producto.");
      return;
    }
    if (!Number.isFinite(form.precio) || form.precio <= 0) {
      setFormError("El precio debe ser mayor que cero.");
      return;
    }
    if (!form.imagen.trim()) {
      setFormError("Indica la URL de la imagen del producto.");
      return;
    }

    const saved = await save({ ...form, nombre: form.nombre.trim(), imagen: form.imagen.trim() }, editingId ?? undefined);
    if (saved) {
      setNotice(editingId === null ? "Producto creado." : "Producto actualizado.");
      resetForm();
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`¿Eliminar “${product.nombre}” del catálogo?`)) return;
    const deleted = await remove(product.id);
    if (deleted) setNotice("Producto eliminado.");
  }

  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900">Administración del catálogo</h1>
        <p className="mt-2 text-slate-600">Crea, edita y elimina productos del minimercado.</p>
      </header>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
        <h2 className="text-xl font-bold text-blue-900 sm:col-span-2">{editingId === null ? "Nuevo producto" : `Editar producto #${editingId}`}</h2>
        <div>
          <label htmlFor="admin-product-name" className="mb-1 block text-sm font-semibold">Nombre</label>
          <input id="admin-product-name" required value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="admin-product-price" className="mb-1 block text-sm font-semibold">Precio (COP)</label>
          <input id="admin-product-price" type="number" min="1" step="1" required value={form.precio || ""} onChange={(event) => setForm({ ...form, precio: Number(event.target.value) })} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="admin-product-category" className="mb-1 block text-sm font-semibold">Categoría</label>
          <select id="admin-product-category" value={form.categoria} onChange={(event) => setForm({ ...form, categoria: event.target.value })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2">
            {PRODUCT_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="admin-product-image" className="mb-1 block text-sm font-semibold">URL de imagen</label>
          <input id="admin-product-image" type="url" required value={form.imagen} onChange={(event) => setForm({ ...form, imagen: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="https://…" />
        </div>
        {formError && <p className="text-sm text-red-700 sm:col-span-2" role="alert">{formError}</p>}
        {error && <p className="text-sm text-red-700 sm:col-span-2" role="alert">{error}</p>}
        {notice && <p className="text-sm text-green-800 sm:col-span-2" role="status">{notice}</p>}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-60">{saving ? "Guardando…" : editingId === null ? "Crear producto" : "Guardar cambios"}</button>
          {editingId !== null && <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Cancelar edición</button>}
        </div>
      </form>

      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-blue-900">Productos</h2>
        <span className="text-sm text-slate-600">{products.length} en el catálogo</span>
      </div>
      {loading && <p className="rounded-xl bg-white p-6" role="status">Cargando productos…</p>}
      {!loading && products.length === 0 && <p className="rounded-xl bg-white p-6 text-slate-700">No hay productos para administrar.</p>}
      {!loading && products.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id} className="flex flex-col rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <Image src={product.imagen} alt={product.nombre} width={640} height={360} unoptimized className="mb-4 h-40 w-full rounded-lg bg-slate-50 object-contain" />
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{product.categoria}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{product.nombre}</h3>
              <p className="mt-1 text-slate-700">{money(product.precio)}</p>
              <div className="mt-auto flex gap-2 pt-5">
                <button type="button" disabled={saving} onClick={() => edit(product)} className="flex-1 rounded-lg border border-blue-200 px-3 py-2 font-semibold text-blue-800 hover:bg-blue-50 disabled:opacity-50">Editar</button>
                <button type="button" disabled={saving} onClick={() => void handleDelete(product)} className="flex-1 rounded-lg border border-red-200 px-3 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
