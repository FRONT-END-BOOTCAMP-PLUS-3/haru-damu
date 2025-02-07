export const EDIT = "수정";
export const FIX = "고정";

export const APPROVE = "변경하기";

export const CUSTOM_TEXT = "영양소 값 커스텀 하기 ->";
export const FIX_TEXT = "권장 영양소 값으로 계산 하기 ->";

export const NUTRITION_CHART_TITLE = "하루 영양소";

export const MYPAGE_NUTRITION_LIST = [
  {
    key: "calorie",
    label: "칼로리",
    unit: "kcal",
  },
  {
    key: "carbohydrates",
    label: "탄수화물",
    unit: "g",
  },
  {
    key: "protein",
    label: "단백질",
    unit: "g",
  },
  {
    key: "fat",
    label: "지방",
    unit: "g",
  },
  {
    key: "sodium",
    label: "나트륨",
    unit: "mg",
  },
  {
    key: "sugar",
    label: "당",
    unit: "g",
  },
];

export const MYPAGE_NUTRITION_CHART_COLOR: Record<string, string> = {
  calorie: "#FF6384", // 연한 빨강 - 칼로리
  protein: "#36A2EB", // 밝은 파랑 - 단백질
  carbohydrates: "#FFCE56", // 밝은 노랑 - 탄수화물
  fat: "#FF9F40", // 주황 - 지방
  sugar: "#9966FF", // 보라 - 당류
  sodium: "#4BC0C0", // 청록 - 나트륨
} as const;
