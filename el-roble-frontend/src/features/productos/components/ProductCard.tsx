// src/features/productos/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../domain/types";

interface ProductCardProps {
  product: Product;
  variant?: "catalog" | "featured";
}

export default function ProductCard({ product, variant = "catalog" }: ProductCardProps) {
  const featured = variant === "featured";

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 ${featured ? "border-blue-100 bg-white shadow-md hover:border-blue-300 hover:shadow-xl" : "border-blue-100 bg-white shadow-md hover:shadow-xl"}`}>
      <div className={`relative flex h-48 items-center justify-center overflow-hidden ${featured ? "bg-white" : "bg-gray-100"}`}>
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
          className={`h-full w-full ${featured ? "object-contain" : "object-cover"}`}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className={`mb-2 text-xs font-bold uppercase tracking-wider ${featured ? "text-center" : ""} text-blue-600`}>
          {product.categoria}
        </span>
        <h3 className={`mb-2 text-lg font-bold leading-tight text-gray-800 ${featured ? "text-center" : ""}`}>
          {product.nombre}
        </h3>

        <div className={`mt-auto flex items-center justify-between gap-3 pt-4 ${featured ? "flex-col" : ""}`}>
          <strong className="text-xl text-blue-700">
            ${product.precio.toLocaleString("es-CO")}
          </strong>
          <Link
            href="/pedido"
            className={`rounded-lg py-2 text-center text-sm font-bold text-white transition-colors ${featured ? "w-full bg-blue-600 px-4 hover:bg-blue-500" : "bg-blue-600 px-4 hover:bg-blue-700"}`}
          >
            {featured ? "Pedir ahora" : "Pedir"}
          </Link>
        </div>
      </div>
    </article>
  );
}
