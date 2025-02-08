export class Health {
  user_id: number; // FK (users)
  gender_code?: string; // 성별 코드 (M / F) - nullable
  weight?: number; // 몸무게 - nullable
  height?: number; // 키 - nullable
  activity_code?: number; // 활동 코드 (운동량) - nullable
  calorie?: number; // 칼로리 섭취량
  carbohydrates?: number; // 탄수화물
  protein?: number; // 단백질
  fat?: number; // 지방
  sodium?: number; // 나트륨
  is_custom: boolean; // 개인 수치 여부
  created_at: string; // 생성일
  updated_at: string; // 수정일

  // 기본 생성자 추가
  constructor(
    user_id: number,
    is_custom: boolean,
    gender_code?: string,
    weight?: number,
    height?: number,
    activity_code?: number,
    calorie?: number,
    carbohydrates?: number,
    protein?: number,
    fat?: number,
    sodium?: number,
  ) {
    this.user_id = user_id;
    this.is_custom = is_custom;
    this.gender_code = gender_code;
    this.weight = weight;
    this.height = height;
    this.activity_code = activity_code;
    this.calorie = calorie;
    this.carbohydrates = carbohydrates;
    this.protein = protein;
    this.fat = fat;
    this.sodium = sodium;
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }
}
