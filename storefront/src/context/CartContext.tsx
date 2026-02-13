"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  currencyCode: string;
  quantity: number;
  image?: string;
  handle: string;
  available?: boolean;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currencyCode: string;
  isHydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

/** Filter cart items to only those available for sale. */
export function getAvailableItems(items: CartItem[]): CartItem[] {
  return items.filter((item) => item.available !== false);
}

/** Count total quantity of available items. */
export function getCartItemCount(items: CartItem[]): number {
  return getAvailableItems(items).reduce((total, item) => total + item.quantity, 0);
}

/** Calculate subtotal of available items. */
export function getCartSubtotal(items: CartItem[]): number {
  return getAvailableItems(items).reduce((total, item) => total + item.price * item.quantity, 0);
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "createspace-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount, then refresh availability from Shopify
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    let parsedItems: CartItem[] = [];
    if (storedCart) {
      try {
        parsedItems = JSON.parse(storedCart);
        setItems(parsedItems);
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
    setIsHydrated(true);

    // Refresh availability for all cart items
    if (parsedItems.length > 0) {
      const variantIds = parsedItems.map((item) => item.variantId);
      fetch("/api/cart-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantIds }),
      })
        .then((res) => res.json())
        .then(({ availability }: { availability: Record<string, boolean> }) => {
          setItems((prev) =>
            prev.map((item) =>
              item.variantId in availability
                ? { ...item, available: availability[item.variantId] }
                : item
            )
          );
        })
        .catch((e) => {
          console.error("Failed to refresh cart availability:", e);
        });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const itemCount = getCartItemCount(items);
  const subtotal = getCartSubtotal(items);
  const currencyCode = items[0]?.currencyCode || "ZAR";

  const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.variantId === newItem.variantId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...newItem, quantity }];
    });
  };

  const removeItem = (variantId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        currencyCode,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
