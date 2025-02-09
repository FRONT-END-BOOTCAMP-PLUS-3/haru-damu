// page : order/detail/[id]

import type { OrderDto } from "@/application/usecases/orders/dtos";

// GET
export interface GetOrderByIdResponseDto {
  order: OrderDto;
}
