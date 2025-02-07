// page : login

import type { UserDto } from "@/application/usecases/users/dtos";

// POST
export interface LoginResponseDto {
  user: UserDto;
}
