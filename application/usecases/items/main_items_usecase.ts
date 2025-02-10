import type { Item, TestItem, TestItemImage } from "@/domain/entities";
import type { ItemRepository } from "@/domain/repositories/item_repository";
//import type { ItemImageDto } from "@/application/usecases/image/dtos/item_img_dto";
import type {
  MainItemsDto,
  //GetMainItemsResponseDto,
  TestGetMainItemsResponseDto,
  TestMainItemsDto,
  //MainItemsDto,
} from "@/application/usecases/items/dtos/get_main_items_dto";

export class MainItemsUseCase {
  constructor(private repository: ItemRepository) {}

  private async getRandomItems(categories: string[]): Promise<TestMainItemsDto[]> {
    const promises = categories.map((category) => this.repository.findRandomByCategory(category));
    const results = await Promise.all(promises);

    console.log("🔍 results:", results);
    return results
      .filter((item) => item !== null) // null 제거
      .map(({ id: item_id, store_id, item_name, item_price, category_code, item_images }) => ({
        item_id,
        store_id,
        item_name,
        item_price,
        category_code,
        item_images,
      }));
  }

  async execute(): Promise<TestGetMainItemsResponseDto> {
    return {
      breakfast: await this.getRandomItems(["bread"]),
      lunch: [], //await this.getRandomItems(["fish", "sideDish", "snack", "milk"]),
      dinner: [], //await this.getRandomItems(["meat", "sideDish", "vegetable", "fruit"]),
    };
  }
}
