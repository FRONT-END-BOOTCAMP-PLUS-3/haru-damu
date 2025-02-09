import type { Cart } from "@/domain/entities";

export interface Order {
  id: number;
  userId: number;
  orderAddress: string;
  totalPrice: number;
  orderList: Cart[];
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
