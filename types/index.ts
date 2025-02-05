export type TDateForm = `${number}. ${string}. ${string}.`;

export type TCart = {
  user_id: number;
  item_id: number;
  wrapper_id: string | null;
  quantity: number;
  is_checked: boolean;
  created_at: string;
  updated_at: string;
  item_name: string;
  item_price: number;
  img: string | undefined;
  blurImg: string | undefined;
};

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

export type TUser = {
  user_id: number;
  name: string;
  email: string;
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

export type THealth = {
  user_id: number;
  gender_code: "M" | "F";
  age: number;
  weight: number;
  height: number;
  activity_code: number;
  calorie: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  sugar: number;
  is_custom: boolean;
  created_at: string; // ISO 날짜 형식
  updated_at: string; // ISO 날짜 형식
};

export type ValidConversions = {
  g: "kg";
  kg: "g";
  ml: "l";
  l: "ml";
};

export type FromUnit = keyof ValidConversions;
export type ToUnit<U extends FromUnit> = ValidConversions[U];

export type UnitConversion<U extends FromUnit> = `${U} -> ${ToUnit<U>}`;

export type AllowedConversions = UnitConversion<FromUnit>;
