import type { Cart } from "@/domain/entities"; // 빌드때문에 임시로 넣어둠둠

import type { CartDto } from "@/application/usecases/carts/dtos";

// 0 : 결제전 | 1 : 결재 완료 | 2 : 배송준비중 | 3 : 배송중 | 4: 배송완료 | 5 : 주문취소 | 6: 반품
export type TOrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OrderDto {
  orderId: number;
  orderAddress: string;
  totalPrice: number;
  orderList: CartDto[] | Cart[];
  status: TOrderStatus | number; // 임시 넘버설정 해둠
  createdAt: Date | string;
  updatedAt: Date | string;
}
