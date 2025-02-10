import type { NutritionDto } from "@/application/usecases/healths/dtos";

export type TCategoryCode = "bread" | "fish" | "meet" | "milk" | "side_dish" | "vegetable";

// 0 : 판매 | 1 : 품절 | 2 : 삭제
export type TItemCode = 0 | 1 | 2;

export type TUnit = "mg" | "g" | "kg" | "ml" | "l" | "입";

export interface ItemDto {
  itemId: number;
  storeId: number;
  itemName: string;
  itemPrice: string;
  img?: string;
  blurImg?: string;
  description?: string;
  categoryCode: TCategoryCode;
  itemCode: TItemCode;
  unitType: TUnit;
  volume: number;
  nutrition: NutritionDto;
  createdAt: string;
  updatedAt: string;
}
