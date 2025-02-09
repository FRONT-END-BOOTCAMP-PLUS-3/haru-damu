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
