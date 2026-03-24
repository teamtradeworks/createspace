"use client";

import { createContext, useContext } from "react";

const ProductTrackingContext = createContext<string | null>(null);

export function ProductTrackingProvider({
  handle,
  children,
}: {
  handle: string;
  children: React.ReactNode;
}) {
  return (
    <ProductTrackingContext.Provider value={handle}>
      {children}
    </ProductTrackingContext.Provider>
  );
}

export function useProductHandle() {
  return useContext(ProductTrackingContext);
}
