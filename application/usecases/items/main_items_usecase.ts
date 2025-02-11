import type { ItemRepository } from "@/domain/repositories/item_repository";
import type { MainItemsDto, GetMainItemsResponseDto } from "@/application/usecases/items/dtos/get_main_items_dto";

export class MainItemsUseCase {
  constructor(private repository: ItemRepository) {}
  private async getRandomItems(categories: string[]): Promise<MainItemsDto[]> {
    const promises = categories.map(async (category) => {
      const items = await this.repository.LatestCategory(category); // 비동기 데이터 가져오기
      if (!items || items.length === 0) return null; // 빈 배열 체크
      return items[Math.floor(Math.random() * items.length)]; // 랜덤 값 선택 후 문자열 반환
    });

    const randomItems = await Promise.all(promises); // 모든 Promise 완료
    const filteredItems = randomItems.filter((item) => item !== null); // `null` 제거

    console.log("🔍 Randomly Selected Items:", filteredItems);

    return filteredItems
      .filter((item) => item !== null) // null 제거
      .map(({ id: itemId, storeId, itemName, itemPrice, categoryCode, itemImage }) => ({
        itemId,
        storeId,
        itemName,
        itemPrice,
        categoryCode,
        itemImage,
      }));
  }

  async execute(): Promise<GetMainItemsResponseDto> {
    return {
      breakfast: await this.getRandomItems(["bread", "fruit", "bread", "milk"]),
      lunch: await this.getRandomItems(["fish", "bread", "bread", "milk"]),
      dinner: await this.getRandomItems(["meet", "bread", "bread", "fruit"]),
    };
  }
}
