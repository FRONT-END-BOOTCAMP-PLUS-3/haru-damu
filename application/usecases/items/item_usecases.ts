import getBlurImg from "@/utils/get_blur_img";

import type { Item, ItemImage } from "@/domain/entities";
import type { SbItemRepository } from "@/infrastructure/repositories";
import type {
  GetItemListResponseDto,
  ItemDto,
  TCategoryCode,
  TItemCode,
  TUnit,
} from "@/application/usecases/items/dtos";

export class ItemUsecases {
  private sbItemRepository: SbItemRepository;

  constructor(itemRepository: SbItemRepository) {
    this.sbItemRepository = itemRepository;
  }

  async getItemById(id: number): Promise<ItemDto | null> {
    const item = await this.sbItemRepository.findOneById(id);
    if (!item) return null;

    const img = item.itemImage?.src;
    const blurImg: string | undefined = img ? await getBlurImg(img) : undefined;

    return {
      ...item,
      itemId: item.id,
      img: img ?? undefined,
      blurImg,
      description: item.description ?? undefined,
      categoryCode: item.categoryCode as TCategoryCode,
      itemCode: item.itemCode as TItemCode,
      unitType: item.unitType as TUnit,
      updatedAt: item.updatedAt.toISOString(),
      createdAt: item.createdAt.toISOString(),
    };
  }
  async getItemsByCategory(categoryCode: string, page: number, limit: number): Promise<GetItemListResponseDto> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    const items = await this.sbItemRepository.findByCategory(categoryCode, startIndex, endIndex);
    return this.mapItemsToDto(items.items, items.totalCount, page, limit);
  }

  async getItemsByQuery(query: string, page: number, limit: number): Promise<GetItemListResponseDto> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    const items = await this.sbItemRepository.findByQuery(query, startIndex, endIndex);
    return this.mapItemsToDto(items.items, items.totalCount, page, limit);
  }

  private async mapItemsToDto(
    items: (Item & { itemImage: ItemImage | null })[],
    totalItems: number,
    page: number,
    limit: number,
  ): Promise<GetItemListResponseDto> {
    const itemsWithBlurImg = await Promise.all(
      items.map(async (item) => {
        const img = item.itemImage?.src;
        const blurImg: string | undefined = img ? await getBlurImg(img) : undefined;

        return {
          ...item,
          itemId: item.id,
          storeId: item.storeId,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          img: img ?? undefined,
          blurImg,
          description: item.description ?? undefined,
          categoryCode: item.categoryCode as TCategoryCode,
          itemCode: item.itemCode as TItemCode,
          unitType: item.unitType as TUnit,
          volume: item.volume,
          nutrition: item.nutrition,
          // updatedAt: item.updatedAt.toISOString(),
          // createdAt: item.createdAt.toISOString(),
        };
      }),
    );

    return {
      count: totalItems,
      totalPage: Math.ceil(totalItems / limit),
      page: page,
      size: limit,
      items: itemsWithBlurImg,
    };
  }
}
