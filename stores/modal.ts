import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

// 모달 상태를 위한 타입 정의
export type TModalSlice = {
  isOpenModal: boolean;
  closeModal: () => void;
};

// 모달 상태를 위한 슬라이스 생성
export const createModalSlice: StateCreator<Partial<State>, [], [], TModalSlice> = (set) => ({
  isOpenModal: false,
  closeModal: () =>
    set(() => ({
      isOpenModal: false,
    })),
});
