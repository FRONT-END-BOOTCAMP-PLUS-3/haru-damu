import type { StateCreator } from "zustand";
import type { StateStorage } from "zustand/middleware";

import { create } from "zustand";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { persist, createJSONStorage, subscribeWithSelector } from "zustand/middleware";

const storage: StateStorage = {
  removeItem: async (name: string): Promise<void> => {
    window.localStorage.removeItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    window.localStorage.setItem(name, JSON.stringify(value)); // JSON 변환 추가
  },
  getItem: async (name: string): Promise<string | null> => {
    const item = window.localStorage.getItem(name);
    return item ? JSON.parse(item) : null; // JSON 파싱 추가
  },
};

// 모달 상태를 위한 타입 정의
type TModalSlice = {
  modal: {
    isOpen: boolean;
  };
  closeModal: () => void;
};

// 기존 상태 타입에 모달 상태 추가
type State = TModalSlice;

// 모달 상태를 위한 슬라이스 생성
const createModalSlice: StateCreator<State> = (set) => ({
  modal: {
    isOpen: false,
  },
  closeModal: () => set((state) => ({ modal: { ...state.modal, isOpen: false } })),
});

export const modalStore = create<State>()(
  subscribeWithSelector(
    persist(
      (set, get, store) => ({
        ...createModalSlice(set, get, store), // 3개 인자 전달
      }),
      {
        version: 144,
        name: "haru-damu",
        storage: createJSONStorage(() => storage),
        partialize: (state) => ({ modal: state.modal }),
      },
    ),
  ),
);

export const selector = createSelectorFunctions(modalStore);
