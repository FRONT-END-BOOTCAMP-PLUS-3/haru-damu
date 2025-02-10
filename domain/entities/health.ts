export interface Health {
  userId: number; // PK, FK (users)
  genderCode?: string | null; // 성별 코드 (M / F) - nullable
  weight?: number | null; // 몸무게 - nullable
  height?: number | null; // 키 - nullable
  activityCode?: number | null; // 활동 코드 (운동량) - nullable
  calorie?: number | null; // 칼로리 섭취량
  carbohydrates?: number | null; // 탄수화물
  protein?: number | null; // 단백질
  fat?: number | null; // 지방
  sodium?: number | null; // 나트륨
  isCustom: boolean; // 개인 수치 여부
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
  [key: string]: unknown;
}
