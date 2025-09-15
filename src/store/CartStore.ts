import { create } from "zustand";
import { CartProduct } from "@/config/types";
import { discount } from "@/config/types";

type CartStore = {
  cart: CartProduct[];
  discount: discount;
  dilivery: number;
  coins: number;
  setCoins: (coins: number) => void;
  setDiscount: (code: string, value: number) => void;
  addToCart: (product: CartProduct) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalQuantity: () => number;
  clearCart: () => void;
  setDilivery: (dilivery: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  discount: { code: "", value: 0 } as discount,
  dilivery: 0,
  coins: 0,

  setCoins: (coins: number) => {
    set((state) => {
      state.coins = coins;
      return { coins: state.coins };
    });
  },
  setDiscount: (code: string, value: number) => {
    set((state) => {
      state.discount = { code: code, value: value };
      return { discount: state.discount };
    });
  },
  addToCart: (product: CartProduct) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === product.id);
      if (!item) {
        const updatedCart = [...state.cart, { ...product }];
        if (product.with_coins) {
          return { cart: updatedCart, coins: state.coins - product.price };
        }
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  incrementQuantity: (id: number) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === id);
      if (item) {
        const updatedCart = state.cart.map((i: CartProduct) => {
          if (i.id === id) {
            if (i.quantity < 20) {
              return { ...i, quantity: i.quantity + 1 };
            }
          }
          return i;
        });
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  decrementQuantity: (id: number) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === id);
      if (item) {
        const updatedCart = state.cart.map((i: CartProduct) => {
          if (i.id === id) {
            if (i.quantity > 1) {
              return { ...i, quantity: i.quantity - 1 };
            }
          }
          return i;
        });
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  removeFromCart: (id: number) => {
    set((state) => {
      const updatedCart = state.cart.filter((i: CartProduct) => i.id !== id);
      return { cart: updatedCart };
    });
  },
  getTotalQuantity: () => {
    const state = useCartStore.getState();
    const totalQuantity: number = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  },
  clearCart: () => {
    set(() => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { cart: [] };
    });
  },
  setDilivery: (dilivery: number) => {
    set((state) => {
      state.dilivery = dilivery;
      return { dilivery: state.dilivery };
    });
  },
}));
