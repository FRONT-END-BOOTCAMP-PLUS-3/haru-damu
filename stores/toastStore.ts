import { uuidGenerator } from "@/utils/uuid_generator";

import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

// ✅ 토스트 메시지 타입
export type Message = {
  id: string;
  message: string;
  backgroundColor: string;
  onClickEvent?: () => void;
};

// ✅ 토스트 상태 타입
export type TToastSlice = {
  messages: Message[];
  addMessage: (message: string, backgroundColor?: string, onClickEvent?: () => void) => void;
  removeMessage: (id: string) => void;
};

// ✅ 토스트 슬라이스 생성
export const createToastSlice: StateCreator<Partial<State>, [], [], TToastSlice> = (set) => ({
  messages: [], // 초기값을 빈 배열로 설정

  addMessage: (message, backgroundColor = "var(--primary-color)", onClickEvent) => {
    const id = uuidGenerator();

    set((state) => ({
      messages: [...(state.messages || []), { id, message, backgroundColor, onClickEvent }],
    }));
  },

  removeMessage: (id) =>
    set((state) => ({
      messages: (state.messages || []).filter((msg) => msg.id !== id),
    })),
});
