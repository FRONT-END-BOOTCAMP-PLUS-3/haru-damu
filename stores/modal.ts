import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

// 모달 상태를 위한 타입 정의
export type TModalSlice = {
  modal: {
    isOpen: boolean;
  };
  closeModal: () => void;
};

// 모달 상태를 위한 슬라이스 생성
export const createModalSlice: StateCreator<Partial<State>, [], [], TModalSlice> = (set) => ({
  modal: {
    isOpen: false,
  },
  closeModal: () => set((state) => ({ modal: { ...state.modal, isOpen: false } })),
});
