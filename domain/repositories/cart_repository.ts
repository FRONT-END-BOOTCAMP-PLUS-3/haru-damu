import type { User, Item, Cart, ItemImage } from "@/domain/entities";

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;

  findByUserId(userId: number): Promise<Cart[]>;

  findAll(): Promise<Cart[]>;

  findByUserIdWithUser(userId: number): Promise<Cart & { user: User }>;

  findByUserIdWithAll(userId: number): Promise<(Cart & { user: User; item: Item })[]>;

  findByUserIdWithItem(
    userId: number,
  ): Promise<{ count: number; data: (Cart & { item: Item & { itemImages: ItemImage[] } })[] }>;

  update(userId: number, itemId: number, updatedCart: Partial<Cart>): Promise<Cart>;

  delete(userId: number, itemId: number): Promise<void>;
}
