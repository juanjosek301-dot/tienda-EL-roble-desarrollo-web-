import type { Metadata } from "next";
import "./globals.css";
import Header from "@/features/common/components/Header";
import Footer from "@/features/common/components/Footer";
import AuthProvider from "@/features/auth/components/AuthProvider";

export const metadata: Metadata = {
  title: "El Roble - Minimercado",
  description: "Productos de la canasta familiar con precios accesibles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-blue-50 text-gray-800 font-sans flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
