import type { UUID } from "crypto";

export interface Cart {
  userId: number; // FK (users)
  itemId: number; // FK (items)
  wrapperId: UUID; // uuid
  quantity: number; // 수량
  wrapperId: UUID; // uuid
  isChecked: boolean; // 선택 여부 (체크된 상태인지)
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
}
