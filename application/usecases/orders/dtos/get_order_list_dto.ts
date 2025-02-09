// page : mypage?order

import type { OrderDto } from "@/application/usecases/orders/dtos";

// GET
export interface GetOrderListResponseDto {
  count: number; // 총 개수
  totalPage: number; // 총 페이지
  page: number; // 현재 페이지
  year: number | null; // 필터가 되는 년도 null일 경우 최근 6개월만
  size: number; // 한 페이지 당 아이템 수
  items: OrderDto[];
}
