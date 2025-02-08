import type { ApiResponseDto } from "@/application/shared/dto/api_response_dto";

export interface PatchMypageUserRequestDto {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export type PatchMypageHealthResponseDto = ApiResponseDto<PatchMypageUserRequestDto>;
