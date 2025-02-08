export interface Health {
  user_id: number; // FK (users)
  gender_code?: string | null; // 성별 코드 (M / F) - nullable
  weight?: number | null; // 몸무게 - nullable
  height?: number | null; // 키 - nullable
  activity_code?: number | null; // 활동 코드 (운동량) - nullable
  calorie?: number | null; // 칼로리 섭취량
  carbohydrates?: number | null; // 탄수화물
  protein?: number | null; // 단백질
  fat?: number | null; // 지방
  sodium?: number | null; // 나트륨
  is_custom: boolean; // 개인 수치 여부
  created_at: Date; // 생성일
  updated_at: Date; // 수정일
}
