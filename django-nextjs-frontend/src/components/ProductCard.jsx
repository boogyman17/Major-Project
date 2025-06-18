// src/components/ProductCard.jsx
'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [success, setSuccess] = useState('');

  function handleAdd() {
    addToCart(product);
    setSuccess('Item added to cart!');
  }
  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
        {success && (
          <div className="fixed top-5 right-5 z-50 max-w-xs bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="ml-4 font-bold hover:text-green-900">
              ×
            </button>
          </div>
        )}
      {product.onSale && (
        <span className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs px-2 py-1 rounded">
          SALE
        </span>
      )}
      <div className="relative w-full h-48 overflow-hidden rounded-md">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {product.name}
      </h3>
      <div className="mt-1 flex items-baseline space-x-2">
        {product.onSale ? (
          <>
            <span className="text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-red-600 font-semibold">
              ${product.salePrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-gray-600">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>
      <button
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
        +
      </button>

    </div>
  );
}
