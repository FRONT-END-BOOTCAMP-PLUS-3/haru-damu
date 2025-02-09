import type { User } from "@/domain/entities/user";
import type { Item } from "@/domain/entities/item";
import type { Cart } from "@/domain/entities/cart";

export interface CartRepository {
  create(cart: Cart): Promise<void>;

  findByUserId(userId: number): Promise<Cart[]>;

  findAll(): Promise<Cart[]>;

  findByUserIdWithUser(userId: number): Promise<(Cart & { user: User })[]>;

  findByUserIdWithAll(userId: number): Promise<(Cart & { user: User; item: Item })[]>;

  findByUserIdWithItem(userId: number): Promise<(Cart & { item: Item })[]>;

  update(userId: number, itemId: number, updatedCart: Partial<Cart>): Promise<void>;

  delete(userId: number, itemId: number): Promise<void>;
}
