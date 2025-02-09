// page : main

import type { ItemImageDto } from "@/application/usecases/Imgs/dtos/item_img_dto";

//import type { ItemDto } from "@/application/usecases/items/dtos";

// GET

export interface MainItemsDto {
  id: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  categoryCode: string;
  itemImage: ItemImageDto | null;
}
export interface GetMainItemsResponseDto {
  breakfast: MainItemsDto[];
  lunch: MainItemsDto[];
  dinner: MainItemsDto[];
}
