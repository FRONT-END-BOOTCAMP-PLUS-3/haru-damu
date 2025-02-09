// page : mypage?nutrition

import type { NutritionDto } from "@/application/usecases/healths/dtos";

// PUT
export interface PutNutritionRequestDto {
  isCustom: boolean;
  customNutrition: NutritionDto;
}

export interface PutNutritionResponseDto {
  isCustom: boolean;
  customNutrition: NutritionDto;
}
