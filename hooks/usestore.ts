//import type { State } from "@app/shared/types";
//import createTabSlice from "@app/tab/create-slice";
import type { StateStorage } from "zustand/middleware";

import { create } from "zustand";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { persist, createJSONStorage, subscribeWithSelector } from "zustand/middleware";

const storage: StateStorage = {
  removeItem: async (name: string): Promise<void> => {
    window.store.delete(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    window.store.set(name, JSON.parse(value));
  },
  getItem: async (name: string): Promise<string | null> => {
    const value = window.store.get(name);
    return value !== undefined ? JSON.stringify(value) : null;
  },
};

export const useStore = create<State>()(
  subscribeWithSelector(
    /*
    persist(
      (...a) => ({
        ...createTabSlice(...a),
      }),
      */
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
