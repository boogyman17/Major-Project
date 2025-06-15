'use client';

import Carousel from '../../components/ui/carousel';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

const slides = [
  <img
    src="/img/test.jpg"
    alt="Wooden workshop table with various woodworking tools..."
    key="slide1"
    className="w-full h-64 object-contain rounded"
  />,
  <img
    src="/img/phillip-goldsberry-fZuleEfeA1Q-unsplash.jpg"
    alt="Carpenter sanding a wooden plank..."
    key="slide2"
    className="w-full h-64 object-contain rounded"
  />,
  <img
    src="/img/kam-idris-_HqHX3LBN18-unsplash.jpg"
    alt="Closeup of hands measuring a piece of wood..."
    key="slide3"
    className="w-full h-64 object-contain rounded"
  />,
];

export default function Dashboard() {
  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Wintons Teak
      </h1>

      {/* Carousel */}
      
      <Carousel slides={slides} />

      {/* Products grid */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
