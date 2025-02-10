import type { ItemImage } from "@/domain/entities/item_image";
import type { Item, TestItem, TestItemImage } from "@/domain/entities/item";

// 상품 리포지토리
export interface ItemRepository {
  findOneById(id: number): Promise<Item & { itemImage: ItemImage | null }>;
  findByPage(page: number, limit: number): Promise<(Item & { itemImage: ItemImage | null })[]>;
  findByCategory(category: string, page: number, limit: number): Promise<(Item & { itemImage: ItemImage | null })[]>;
  findByQuery(query: string, page: number, limit: number): Promise<(Item & { itemImage: ItemImage | null })[]>;

  create(item: Item): Promise<Item>;
  updateById(id: number, item: Partial<Item>): Promise<Item>;
  deleteById(id: number): Promise<void>;

  //findRandomByCategory(category: string): Promise<(Item & { itemImage: ItemImage | null }) | null>;
  findRandomByCategory(category: string): Promise<(TestItem & { itemImage: TestItemImage | null }) | null>;
}
