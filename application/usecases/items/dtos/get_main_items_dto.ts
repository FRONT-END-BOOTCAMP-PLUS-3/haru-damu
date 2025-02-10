// page : main

import type { ItemImageDto } from "@/application/usecases/image/dtos/item_img_dto";

//import type { TCategoryCode } from "./item_dto";

//import type { ItemDto } from "@/application/usecases/items/dtos";

// GET

export interface MainItemsDto {
  itemId: number;
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

export interface TestMainItemsDto {
  item_id: number;
  store_id: number;
  item_name: string;
  item_price: number;
  category_code: string;
  item_images: ItemImageDto | null;
}
export interface TestGetMainItemsResponseDto {
  breakfast: TestMainItemsDto[];
  lunch: TestMainItemsDto[];
  dinner: TestMainItemsDto[];
}
