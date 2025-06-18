'use client';

import Link from 'next/link';
import { useAuth } from '../authProvider';
import NavLinks, { NonUserLinks } from './NavLinks';
import BrandLink from './BrandLink';
import MobileNavbar from './MobileNavbar';
import AccountDropdown from './AccountDropdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { ThemeToggleButton } from '../themeToggleButton';
export default function Navbar({ className }) {
  const auth = useAuth();
  const { cartItems } = useCart();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const finalClass = className
    ? className
    : 'sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6';

  return (
    <header className={finalClass}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandLink displayName={true} />
        {NavLinks.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
          return shouldHide ? null : (
            <Link
              href={navLinkItem.href}
              key={`nav-links-a-${idx}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLinkItem.label}
            </Link>
          );
        })}
      </nav>

      <MobileNavbar />

      <div className="md:hidden">
        <BrandLink displayName={true} />
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim())
              router.push(`/products?search=${encodeURIComponent(search)}`);
          }}
          className="hidden md:flex items-center gap-3 ml-auto mr-10"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border px-2 py-1"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {auth.isAuthenticated ? (
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center bg-red-500 text-white text-xs w-5 h-5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Account menu */}
            <AccountDropdown />
            <ThemeToggleButton />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {NonUserLinks.map((navLinkItem, idx) => {
              const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
              return shouldHide ? null : (
                <Link
                  href={navLinkItem.href}
                  key={`nav-links-d-${idx}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {navLinkItem.label}
                </Link>
              );
            })}
            <ThemeToggleButton />
          </div>
        )}
      </div>
    </header>
  );
}
