import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { MenuItem } from "@/data/menuData";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartBounce: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPON = "SECTOR14";
const COUPON_DISCOUNT = 0.10; // 10%

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const addItem = useCallback((item: MenuItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    // Trigger bounce animation
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    setItems(prev => 
      prev.map(i => i.id === itemId ? { ...i, quantity } : i)
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    if (code.toUpperCase() === VALID_COUPON) {
      setCouponCode(VALID_COUPON);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = couponCode ? subtotal * COUPON_DISCOUNT : 0;
  const total = subtotal - discount;

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      discount,
      total,
      couponCode,
      applyCoupon,
      removeCoupon,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      cartBounce,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
