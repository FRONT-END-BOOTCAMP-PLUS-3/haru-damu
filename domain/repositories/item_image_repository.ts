import type { ItemImage } from "@/domain/entities/item_image";

// 상품 이미지 리포지토리
export interface ItemImageRepository {
  create(itemImage: ItemImage): Promise<ItemImage>;
  updateById(id: number, itemImage: Partial<ItemImage>): Promise<ItemImage>;
  deleteById(id: number): Promise<void>;
}
