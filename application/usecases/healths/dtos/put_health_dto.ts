// page : mypage?health

import type { HealthDto } from "@/application/usecases/healths/dtos";

// PUT
export interface PutHealthRequestDto {
  health: HealthDto;
}

export interface PutHealthResponseDto {
  health: HealthDto;
}
