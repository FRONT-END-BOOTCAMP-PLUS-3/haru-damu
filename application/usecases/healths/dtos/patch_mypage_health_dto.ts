import type { ApiResponseDto } from "@/application/shared/dto/api_response_dto";

import type { TActivityCode } from "./health_dto";

export interface PatchMypageHealthRequestDto {
  gender_code?: "M" | "F";
  age?: number;
  weight?: number;
  height?: number;
  activity_code?: TActivityCode;
  updated_at: string; // 필수
}

export interface PatchMypageNutritionRequestDto {
  calorie?: number;
  carbohydrates?: number;
  protein?: number;
  fat?: number;
  sodium?: number;
  sugar?: number;
  updated_at: string; // 필수
}

export type PatchMypageHealthResponseDto = ApiResponseDto<PatchMypageHealthRequestDto>;

export type PatchMypageNutritionResponseDto = ApiResponseDto<PatchMypageNutritionRequestDto>;
