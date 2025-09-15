import { create } from "zustand";

type CounterStore = {
  orders_count: number;
  contact_count: number;
  reFeatch: boolean;
  setCounters: (counters: any) => void;
  setRefeatch: (reFeatch: boolean) => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  orders_count: 0,
  contact_count: 0,
  reFeatch: false,
  setCounters: (counters: any) => set({ ...counters }),
  setRefeatch: (reFeatch: boolean) => set({ reFeatch }),
}));
