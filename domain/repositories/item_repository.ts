import type { Item } from "@/domain/entities/item";
import type { ItemImage } from "@/domain/entities/item_image";

// 상품 리포지토리
export interface ItemRepository {
  findOneById(id: number): Promise<Item & { itemImage: ItemImage | null }>;
  findByPage(
    page: number,
    limit: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }>;
  findByCategory(
    category: string,
    page: number,
    limit: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }>;
  findByQuery(
    query: string,
    page: number,
    limit: number,
  ): Promise<{ items: (Item & { itemImage: ItemImage | null })[]; totalCount: number }>;

  create(item: Item): Promise<Item>;
  updateById(id: number, item: Partial<Item>): Promise<Item>;
  deleteById(id: number): Promise<void>;

  LatestCategory(category: string): Promise<(Item & { itemImage: ItemImage | null })[]>;
}
