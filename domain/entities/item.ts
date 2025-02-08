import { TNutrition } from "@/types";

export interface Item {
  id: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  description: string;
  categoryCode: string;
  itemCode: number;
  unitType: string;
  volume: number;
  nutrition: TNutrition;
  createdAt: Date;
  updatedAt: Date;
}