export interface ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
}
