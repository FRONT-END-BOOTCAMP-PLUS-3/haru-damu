import type { TModalSlice } from "@/stores/modal";
import type { TUserSlice } from "@/stores/user_store";
import type { TCartSlice } from "@/stores/cart_store";
import type { StateStorage } from "zustand/middleware";
import type { TToastSlice } from "@/stores/toastStore";
import type { TMypageSlice } from "@/stores/mypage_store";

import { create } from "zustand";
import { createModalSlice } from "@/stores/modal";
import { createUserSlice } from "@/stores/user_store";
import { createCartSlice } from "@/stores/cart_store";
import { createToastSlice } from "@/stores/toastStore";
import { createMypageSlice } from "@/stores/mypage_store";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { persist, createJSONStorage, subscribeWithSelector } from "zustand/middleware";

const storage: StateStorage = {
  removeItem: async (name: string): Promise<void> => {
    window.localStorage.removeItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    window.localStorage.setItem(name, JSON.parse(value));
  },
  getItem: async (name: string): Promise<string | null> => {
    const value = window.localStorage.getItem(name);
    return value !== undefined ? JSON.stringify(value) : null;
  },
};

export type State = TModalSlice & TMypageSlice & TToastSlice & TUserSlice & TCartSlice;

export const useStore = create<State>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        ...createModalSlice(...a),
        ...createMypageSlice(...a),
        ...createToastSlice(...a),
        ...createUserSlice(...a),
        ...createCartSlice(...a),
      }),
      {
        version: 144,
        name: "haru-damu",
        storage: createJSONStorage(() => storage),
        partialize: (keys) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { ...persistData } = keys;

          return persistData;
        },
      },
    ),
  ),
);

export const selector = createSelectorFunctions(useStore);
