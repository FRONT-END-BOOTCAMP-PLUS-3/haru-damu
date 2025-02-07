// page : mypage?order

import type { OrderDto } from "@/application/usecases/orders/dtos";

// GET
export interface GetOrderListResponseDto {
  total: number;
  page: number;
  year: number | null;
  size: number;
  items: OrderDto[];
}
