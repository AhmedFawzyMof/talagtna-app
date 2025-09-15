import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  token: string;
  favorites: number;
  initlize: () => void;
  login: (token: string, favorites: number) => void;
  logout: () => void;
  setFavorites: () => void;
  favoritesNumber: (favorites: number) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  token: "",
  favorites: 0,
  initlize: () => {
    set((state) => {
      const token: string | null = localStorage.getItem("customer-token");
      const favorites: string | null = localStorage.getItem("favorites");

      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      }

      if (favorites) {
        state.favorites = parseInt(favorites);
      }

      return state;
    });
  },
  login: (token: string, favorites: number) => {
    set((state) => {
      localStorage.setItem("customer-token", token);
      localStorage.setItem("favorites", `${favorites}`);
      state.isAuthenticated = true;
      state.token = token;
      return state;
    });
  },
  logout: () => {
    set((state) => {
      localStorage.removeItem("customer-token");
      localStorage.removeItem("favorites");
      state.isAuthenticated = false;
      state.token = "";
      return state;
    });
  },
  setFavorites: () => {
    set((state) => {
      const current = state.favorites + 1;
      localStorage.setItem("favorites", `${current}`);
      return { favorites: current };
    });
  },
  favoritesNumber: (favorites: number) => {
    localStorage.setItem("favorites", `${favorites}`);
    set(() => ({ favorites }));
  },
}));
