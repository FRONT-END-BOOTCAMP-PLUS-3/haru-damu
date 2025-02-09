// page : search?, category?

import type { ItemDto } from "@/application/usecases/items/dtos";

// GET
export interface GetItemListResponseDto {
  count: number; // 총 개수
  totalPage: number; // 총 페이지
  page: number; // 현재 페이지
  size: number; // 한 페이지의 아이템 수
  items: ItemDto[];
}
