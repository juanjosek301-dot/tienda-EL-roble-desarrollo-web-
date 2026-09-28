// src/features/productos/components/ProductCard.tsx
import Link from "next/link";
import { Product } from "../../productos/domain/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Imagen del producto */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Información del producto */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">
          {product.categoria}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
          {product.nombre}
        </h3>
        
        {/* Empujamos el precio y el botón hacia abajo */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <strong className="text-xl text-blue-700">
            ${product.precio.toLocaleString("es-CO")}
          </strong>
          <Link 
            href="/pedido"
            className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Pedir
          </Link>
        </div>
      </div>
    </article>
  );
}