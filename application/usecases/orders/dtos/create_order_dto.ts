// page : mypage?order

import type { CartDto } from "@/application/usecases/carts/dtos";
import type { OrderDto } from "@/application/usecases/orders/dtos";

// POST
export interface CreateOrderRequestDto {
  userId: number;
  order: {
    orderAddress: string;
    totalPrice: number;
    orderList: CartDto[];
  };
}

export interface CreateOrderResponseDto {
  order: OrderDto;
}
