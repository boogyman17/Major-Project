'use client';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    }
    fetchOrders();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="border px-2 py-1">{o.id}</td>
              <td className="border px-2 py-1">${o.total.toFixed(2)}</td>
              <td className="border px-2 py-1">{new Date(o.created).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}