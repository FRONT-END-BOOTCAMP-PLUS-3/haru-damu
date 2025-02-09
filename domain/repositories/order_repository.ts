import type { User } from "@/domain/entities/user";
import type { Order } from "@/domain/entities/order";

// 주문내역 리포지토리
// # 추후 주문상태(status) 정의 시 상태에 따른 조회 함수 추가 고려
export interface OrderRepository {
  findOneById(id: number): Promise<Order & { user: User }>;
  findByUserId(userId: number): Promise<(Order & { user: User })[]>;

  create(order: Order): Promise<Order>;
}
