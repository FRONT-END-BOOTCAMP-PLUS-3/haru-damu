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
  isCustom: boolean;
  userNutrition: TMypageNutrition[];
  setIsCustom: (isCustom: boolean) => void;
  setUserNutrition: (userNutrition: TMypageNutrition[]) => void;
  updateUserNutrition: (key: keyof TMypageNutrition, value: number) => void;
};

export const createMypageSlice: StateCreator<Partial<State>, [], [], TMypageSlice> = (set, get) => ({
  //aside
  mypagePath: "nutrition",

  setMypagePath: (mypagePath) => set({ mypagePath }),

  //nutrition
  isCustom: false,
  userNutrition: [],

  setIsCustom: (isCustom) =>
    set({
      isCustom,
    }),
  setUserNutrition: (userNutrition) => set({ userNutrition }),
  updateUserNutrition: (key, value) =>
    set(() => {
      return {
        userNutrition: get().userNutrition?.map((nutrition) => {
          if (nutrition.key === key)
            return {
              ...nutrition,
              value,
            };
          return nutrition;
        }),
      };
    }),
});
