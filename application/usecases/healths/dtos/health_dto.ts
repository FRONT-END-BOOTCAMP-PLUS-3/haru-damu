// 0 : 초기값 | 1 : 매우 적음 | 2 : 가벼운 | 3 : 보통 | 4 : 활발한 | 5 : 매우 활발
export type TActivityCode = 0 | 1 | 2 | 3 | 4 | 5;

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
