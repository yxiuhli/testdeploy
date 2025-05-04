import { CartProvider } from "@/contexts/CartContext";
import React from "react";

const StoreLayout = ({ children }) => {
  return (
    <>
      <CartProvider>
        {children}
      </CartProvider>
    </>
  );
};

export default StoreLayout;