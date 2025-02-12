import type { UUID } from "crypto";
import type { ItemDto } from "@/application/usecases/items/dtos";

export interface CartDto {
  itemId: number;
  item: ItemDto;
  quantity: number;
  wrapperId: UUID | string;
  isChecked: boolean;
  createdAt: Date | string; // 임시로 설정
  updatedAt: Date | string; // 임시로 설정
}
