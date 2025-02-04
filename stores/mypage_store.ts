import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TMypagePath = "nutrition" | "personal" | "health" | "order";

export type TMypageSlice = {
  mypagePath: TMypagePath;

  setMypagePath: (mypagePath: TMypagePath) => void;
};

export const createMypageSlice: StateCreator<Partial<State>, [], [], TMypageSlice> = (set, get) => ({
  mypagePath: "nutrition",

  setMypagePath: (mypagePath) => set({ mypagePath }),
});
