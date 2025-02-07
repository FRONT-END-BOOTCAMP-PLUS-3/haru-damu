// page : mypage?nutrition

import type { NutritionDto } from "@/application/usecases/healths/dtos";

// PUT
export interface PutNutritionRequestDto {
  is_custom: boolean;
  customNutrition: NutritionDto;
}

export interface PutNutritionResponseDto {
  is_custom: boolean;
  customNutrition: NutritionDto;
}
