"use client";
import { HttpTypes } from "@medusajs/types";
import * as React from "react";

type CartContextValueProps = {
  cart: HttpTypes.StoreCart;
  refreshCart: () => void;
};
const CartProviderContext = React.createContext<CartContextValueProps | null>(
  null
);
type CartProviderProps = {
  children: React.ReactNode;
  cart: HttpTypes.StoreCart | null;
};

const useCart = () => {
  const context = React.useContext(CartProviderContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const CartProvider = ({ children, cart }: CartProviderProps) => {
  if (!cart) {
    return null;
  }
  return (
    <CartProviderContext.Provider value={{ cart }}>
      {children}
    </CartProviderContext.Provider>
  );
};

export { CartProvider, useCart };
