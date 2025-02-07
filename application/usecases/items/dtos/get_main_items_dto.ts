// page : main

import type { ItemDto } from "@/application/usecases/items/dtos";

// GET
export interface GetMainItemsResponseDto {
  breakfast: ItemDto[];
  lunch: ItemDto[];
  dinner: ItemDto[];
}
