import { Item } from "@/domain/entities/item";

export interface Order {
  id: number;
  userId: number;
  orderAddress: string;
  totalPrice: number;
  orderList: Item[];
  status: number;
  createdAt: Date;
  updatedAt: Date;
}