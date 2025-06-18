// src/app/cart/page.jsx
'use client';

import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, total, clearCart } = useCart();
  const router = useRouter();

  async function submitOrder() {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems, total }),
    });
    if (res.ok) {
      clearCart();
      router.push('/orders');
    }
  }

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
            <div className="space-x-2">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={submitOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Submit Order
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
