import type { Item } from "@/domain/entities/item";
import type { ItemRepository } from "@/domain/repositories/item_repository";
import type { ItemImageDto } from "@/application/usecases/image/dtos/item_img_dto";
import type { GetMainItemsResponseDto, MainItemsDto } from "@/application/usecases/items/dtos/get_main_items_dto";

export class MainItemsUseCase {
  constructor(private repository: ItemRepository) {}

  private async getRandomItems(categories: string[]): Promise<MainItemsDto[]> {
    const promises = categories.map((category) => this.repository.findRandomByCategory(category));
    const results = await Promise.all(promises);

    return results
      .filter((item): item is Item & { itemImage: ItemImageDto | null } => item !== null) // null 제거
      .map(({ id, storeId, itemName, itemPrice, categoryCode, itemImage }) => ({
        id,
        storeId,
        itemName,
        itemPrice,
        categoryCode,
        itemImage,
      }));
  }

  async execute(): Promise<GetMainItemsResponseDto> {
    return {
      breakfast: await this.getRandomItems(["bread", "snack", "fruit", "milk"]),
      lunch: await this.getRandomItems(["fish", "sideDish", "snack", "milk"]),
      dinner: await this.getRandomItems(["meat", "sideDish", "vegetable", "fruit"]),
    };
  }
}
