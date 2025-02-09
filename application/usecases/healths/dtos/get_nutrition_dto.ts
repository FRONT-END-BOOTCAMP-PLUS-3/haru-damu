// page : mypage?nutrition

import type { HealthDto, NutritionDto } from "@/application/usecases/healths/dtos";

// GET
export interface GetNutritionResponseDto {
  health: HealthDto;
  customNutrition: NutritionDto;
  recommendedNutrition: NutritionDto;
}
