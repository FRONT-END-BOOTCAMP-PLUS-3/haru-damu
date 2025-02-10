import type { UUID } from "crypto";
import type { ItemDto } from "@/application/usecases/items/dtos";

export interface CartDto {
  itemId: number;
  item: ItemDto;
  quantity: number;
  wrapperId: UUID;
  isChecked: boolean;
  createdAt: string;
  updatedAt: string;
}
