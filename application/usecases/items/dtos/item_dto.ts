import type { NutritionDto } from "@/application/usecases/healths/dtos";

export type TCategoryCode = "bread" | "fish" | "meet" | "milk" | "side_dish" | "vegetable";

// 0 : 판매 | 1 : 품절 | 2 : 삭제
export type TItemCode = 0 | 1 | 2;

export type TUnit = "mg" | "g" | "kg" | "ml" | "l" | "입";

export interface ItemDto {
  item_id: number;
  store_id: number;
  item_name: string;
  item_price: string;
  img: string | undefined;
  blurImg: string | undefined;
  description?: string;
  category_code: TCategoryCode;
  item_code: TItemCode;
  unit_type: TUnit;
  volume: number;
  nutrition: NutritionDto;
  created_at: string;
  updated_at: string;
}
