// page : mypage?personal

import type { UserDto } from "@/application/usecases/users/dtos";

// PUT
export interface PutPersonalResponseDto {
  user: UserDto;
}
