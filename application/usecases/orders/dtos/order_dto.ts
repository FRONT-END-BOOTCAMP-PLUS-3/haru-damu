import type { CartDto } from "@/application/usecases/carts/dtos";

// 0 : 결제전 | 1 : 결재 완료 | 2 : 배송준비중 | 3 : 배송중 | 4: 배송완료 | 5 : 주문취소 | 6: 반품
export type TOrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OrderDto {
  order_id: number;
  order_address: string;
  total_price: number;
  order_list: CartDto[];
  status: TOrderStatus;
  created_at: string;
  updated_at: string;
}
