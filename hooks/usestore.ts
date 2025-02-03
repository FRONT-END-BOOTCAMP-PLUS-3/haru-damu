//import type { State } from "@app/shared/types";
import type { StateCreator } from "zustand";
//import createTabSlice from "@app/tab/create-slice";
import type { TModalSlice } from "@/stores/modal";
import type { StateStorage } from "zustand/middleware";

import { create } from "zustand";
import { createModalSlice } from "@/stores/modal";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { persist, createJSONStorage, subscribeWithSelector } from "zustand/middleware";

const storage: StateStorage = {
  removeItem: async (name: string): Promise<void> => {
    window.localStorage.delete(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    window.localStorage.set(name, JSON.parse(value));
  },
  getItem: async (name: string): Promise<string | null> => {
    const value = window.localStorage.get(name);
    return value !== undefined ? JSON.stringify(value) : null;
  },
};

// TODO : 예시/ 삭제 예정
type TExSlice = {
  ex: string;
};

// TODO : 예시/ 삭제 예정 + 모달 상태 추가
export type State = TExSlice & TModalSlice;

// TODO : 예시/ 삭제 예정
const createExSlice: StateCreator<Partial<State>, [], [], TExSlice> = (set, get) => ({
  ex: "",
});

export const useStore = create<State>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        ...createExSlice(...a),
        ...createModalSlice(...a),
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
