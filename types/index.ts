export type TDateForm = `${number}. ${string}. ${string}.`;

export type TItem = {
  item_id: number;
  store_id: number;
  item_name: string;
  item_price: number;
  img: string | undefined;
  blurImg: string | undefined;
  description: string;
  category_code: string;
  item_code: number;
  unit_type: TUnit;
  volume: number;
  nutrition: TNutrition;
  created_at: string;
  updated_at: string;
};

export type TUnit = "g" | "ml" | "l" | "입";

export type TNutrition = {
  g: number;
  calorie: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  sugar: number;
};
