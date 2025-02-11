import type { Item, ItemImage } from "@/domain/entities";
import type { SbItemRepository } from "@/infrastructure/repositories";

//dto로 수정 필요요

export class ItemPageUsecase {
  constructor(private itemRepository: SbItemRepository) {}
  async getItemPage(itemId: number): Promise<Item & { itemImage: ItemImage | null }> {
    const item = await this.itemRepository.findOneById(itemId);
    return item;
  }
}
