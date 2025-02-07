// page : cart

import type { CartDto } from "@/application/usecases/carts/dtos";

export interface PutCartItemsRequestDto {
  cart: CartDto[];
}

export interface PutCartItemsResponseDto {
  cart: CartDto[];
}
