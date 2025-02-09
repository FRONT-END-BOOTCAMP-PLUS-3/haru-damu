// 0 : 매우 적음 | 1 : 가벼운 | 2 : 보통 | 3 : 활발한 | 4 : 매우 활발
export type TActivityCode = 0 | 1 | 2 | 3 | 4;

export interface HealthDto {
  genderCode?: "M" | "F";
  age?: number;
  weight?: number;
  height?: number;
  activityCode?: TActivityCode;
  calorie?: number;
  carbohydrates?: number;
  protein?: number;
  fat?: number;
  sodium?: number;
  sugar?: number;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}
