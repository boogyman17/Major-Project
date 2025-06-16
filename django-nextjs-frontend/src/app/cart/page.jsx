// src/app/cart/page.jsx
'use client';

import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, total, clearCart } = useCart();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </span>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
