import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  token: string;
  isLogedIn: () => void;
  login: (token: string) => void;
  logout: () => void;
  initlize: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  token: "",
  initlize: () => {
    set((state) => {
      const token: string | null = localStorage.getItem("admin-token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        return state;
      }
      return state;
    });
  },
  isLogedIn: () => {
    set((state) => {
      const token: string | null = localStorage.getItem("admin-token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        return state;
      }
      return state;
    });
  },
  login: (token: string) => {
    set((state) => {
      localStorage.setItem("admin-token", token);
      state.isAuthenticated = true;
      state.token = token;
      return state;
    });
  },
  logout: () => {
    set((state) => {
      localStorage.removeItem("admin-token");
      state.isAuthenticated = false;
      state.token = "";
      return state;
    });
  },
}));
