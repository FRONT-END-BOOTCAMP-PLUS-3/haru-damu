import type { StateCreator } from "zustand";
import type { State } from "@/hooks/usestore";

// ✅ 토스트 메시지 타입
export type Message = {
  id: number;
  message: string;
  backgroundColor: string;
  onClickEvent?: () => void;
};

// ✅ 토스트 상태 타입
export type TToastSlice = {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: number) => void;
};

// ✅ 토스트 슬라이스 생성
export const createToastSlice: StateCreator<Partial<State>, [], [], TToastSlice> = (set) => ({
  messages: [], // 초기값을 빈 배열로 설정
  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...(state.messages || []), message], // messages가 undefined일 경우 빈 배열로 처리
    }));

    // ⏳ 5초 후 자동 삭제
    setTimeout(() => {
      set((state) => ({
        messages: (state.messages || []).filter((msg) => msg.id !== message.id),
      }));
    }, 5000);
  },
  removeMessage: (id: number) =>
    set((state) => ({
      messages: (state.messages || []).filter((msg) => msg.id !== id),
    })),
});
