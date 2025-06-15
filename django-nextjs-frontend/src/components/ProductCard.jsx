// src/components/ProductCard.jsx
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
      <div className="w-full h-48 relative">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {product.name}
      </h3>
      <p className="mt-1 text-gray-600">${product.price.toFixed(2)}</p>
    </div>
  );
}