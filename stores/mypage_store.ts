import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

export type TMypagePath = "nutrition" | "personal" | "health" | "order";

export type TMypageNutrition = {
  key: string;
  label: string;
  unit: string;
  value: number;
  recommendValue: number;
};

export type TMypageSlice = {
  //aside
  mypagePath: TMypagePath;
  setMypagePath: (mypagePath: TMypagePath) => void;

  //nutrition
  userNutrition: TMypageNutrition[];
  setUserNutrition: (userNutrition: TMypageNutrition[]) => void;
};

export const createMypageSlice: StateCreator<Partial<State>, [], [], TMypageSlice> = (set, get) => ({
  //aside
  mypagePath: "nutrition",

  setMypagePath: (mypagePath) => set({ mypagePath }),

  //nutrition
  userNutrition: [],

  setUserNutrition: (userNutrition) => set({ userNutrition }),
});
