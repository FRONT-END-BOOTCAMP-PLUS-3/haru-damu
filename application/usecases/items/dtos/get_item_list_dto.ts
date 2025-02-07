// page : search?, category?

import type { ItemDto } from "@/application/usecases/items/dtos";

// GET
export interface GetItemListResponseDto {
  total: number;
  page: number;
  size: number;
  items: ItemDto[];
}
