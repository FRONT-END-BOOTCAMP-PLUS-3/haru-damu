// 0 : 매우 적음 | 1 : 가벼운 | 2 : 보통 | 3 : 활발한 | 4 : 매우 활발
export type TActivityCode = 0 | 1 | 2 | 3 | 4;

export interface HealthDto {
  gender_code: "M" | "F";
  age?: number;
  weight?: number;
  height?: number;
  activity_code?: TActivityCode;
  calorie?: number;
  carbohydrates?: number;
  protein?: number;
  fat?: number;
  sodium?: number;
  sugar?: number;
  is_custom: boolean;
  created_at: string;
  updated_at: string;
}
