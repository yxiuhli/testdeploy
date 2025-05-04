import "./globals.css";
import { CategoriesProvider } from "@/contexts/CategoriesContext";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Cafe Management System",
  description: "Cafe Management System Webapp With Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
