import type { Cart } from "@/domain/entities/cart";

export interface CartRepository {
  create(cart: Cart): Promise<void>;

  findByUserId(user_id: number): Promise<Cart[]>;

  findAll(): Promise<Cart[]>;

  update(user_id: number, item_id: number, updatedCart: Partial<Cart>): Promise<void>;

  delete(user_id: number, item_id: number): Promise<void>;
}
