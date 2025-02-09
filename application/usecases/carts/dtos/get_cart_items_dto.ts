// page : cart

import type { CartDto } from "@/application/usecases/carts/dtos";

// GET
export interface GetCartItemsResponseDto {
  totalPrice: number;
  items: CartDto[];
}
