
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/themeProvider";
import { AuthProvider } from "../components/authProvider.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import BaseLayout from "../components/layout/BaseLayout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wintons Teak",
  description: "wintons Teak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <AuthProvider>
              <CartProvider>
                <BaseLayout className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40">
                  {children}
                </BaseLayout>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
