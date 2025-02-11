// page : cart

import type { CartDto } from "@/application/usecases/carts/dtos";

// GET
export interface GetCartItemsResponseDto {
  count: number;
  totalPrice: number;
  items: CartDto[];
}
