// page : mypage?health

import type { HealthDto } from "@/application/usecases/healths/dtos";

// GET
export interface GetHealth {
  health: HealthDto;
}
