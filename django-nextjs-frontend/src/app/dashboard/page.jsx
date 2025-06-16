'use client';

import Carousel from '../../components/ui/carousel';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

const slides = [
  <img
    src="/img/watch.jpg"
    alt="Wooden workshop table with various woodworking tools..."
    key="slide1"
    className="w-full h-64 object-contain rounded"
  />,
  <img
    src="/img/bag.jpg"
    alt="Carpenter sanding a wooden plank..."
    key="slide2"
    className="w-full h-64 object-contain rounded"
  />,
  <img
    src="/img/smart_watch.jpg"
    alt="Closeup of hands measuring a piece of wood..."
    key="slide3"
    className="w-full h-64 object-contain rounded"
  />,
];

export default function Dashboard() {
  const featured = products.filter(p => p.featured);
  const saleItems = products.filter(p => p.onSale);

  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Wintons Teak
      </h1>

      {/* Carousel */}
      <Carousel slides={slides} />

      {/* Featured row */}
      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {featured.map(p => (
              <div key={p.id} className="flex-shrink-0 w-60">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* On Sale section */}
      {saleItems.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">On Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {saleItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* All Products grid */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
