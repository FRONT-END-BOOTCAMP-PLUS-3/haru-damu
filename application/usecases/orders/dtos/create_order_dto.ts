// page : mypage?order

import type { Cart } from "@/domain/entities"; // 임시로 설정

import type { CartDto } from "@/application/usecases/carts/dtos";
import type { OrderDto } from "@/application/usecases/orders/dtos";

// POST
export interface CreateOrderRequestDto {
  userId: number;
  order: {
    orderAddress: string;
    totalPrice: number;
    orderList: CartDto[] | Cart[];
  };
}

export interface CreateOrderResponseDto {
  order: OrderDto;
}
