'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={e =>
              updateQuantity(item.id, parseInt(e.target.value))
            }
            className="w-16 border rounded p-1"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
