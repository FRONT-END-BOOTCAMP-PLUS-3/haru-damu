import type { ItemImageDto } from "@/application/usecases/image/dtos/item_img_dto";

export interface MainItemsDto {
  itemId: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  categoryCode: string;
  itemImage?: ItemImageDto | null;
}
export interface GetMainItemsResponseDto {
  breakfast: MainItemsDto[] | null;
  lunch: MainItemsDto[] | null;
  dinner: MainItemsDto[] | null;
}
