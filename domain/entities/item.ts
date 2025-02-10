import type { TNutrition } from "@/types";

export interface Item {
  id: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  description: string | null; // nullable
  categoryCode: string;
  itemCode: number;
  unitType: string;
  volume: number;
  nutrition: TNutrition;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestNutritionInfo {
  g: number;
  fat: number;
  sugar: number;
  sodium: number;
  calorie: number;
  protein: number;
  carbohydrates: number;
}

export interface TestItemImage {
  id: number;
  src: string;
  item_id: number;
  created_at: string;
}

export interface TestItem {
  id: number;
  store_id: number;
  item_name: string;
  item_price: number;
  description: string;
  category_code: string;
  item_code: number;
  unit_type: string;
  volume: number;
  nutrition: TestNutritionInfo;
  created_at: string;
  updated_at: string;
  item_images: TestItemImage[];
}
