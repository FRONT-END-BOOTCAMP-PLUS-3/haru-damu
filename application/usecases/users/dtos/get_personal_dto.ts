// page : mypage?personal

import type { UserDto } from "@/application/usecases/users/dtos";

// GET
export interface GetPersonalResponseDto {
  user: UserDto;
}
