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

export const ORDER_TITLE = "주문내역";
export const ORDER_DETAIL_BUTTON = "주문 상세 내역";
export const ORDER_SHIPMENT_BUTTON = "배송 조회";
export const ORDER_REVIEW_BUTTON = "리뷰 작성";
export const ORDER_SHIPMENT_AGAIN = "다시 담기";
export const ORDER_FILTER_OPTIONS = ["3개월", "6개월", "1년", "3년"];
export const ORDER_ERROR = "해당 기간의 주문이 없습니다.";

export const PERSONAL_TITLE = "개인정보";
export const PERSONAL_EMAIL = "이메일";
export const PERSONAL_BUTTON = "저장하기";
export const PERSONAL_DELETE_BUTTON = "회원 탈퇴";
export const PERSONAL_FIELDS = [
  { key: "name", label: "이름" },
  { key: "phone", label: "전화번호" },
  { key: "address", label: "주소" },
] as const;

export const HEALTH_TITLE = "건강정보";
export const HEALTH_BUTTON = "저장하기";
export const HEALTH_FIELDS = [
  { key: "age", label: "연령" },
  { key: "genderCode", label: "성별" },
  { key: "height", label: "키(cm)" },
  { key: "weight", label: "몸무게(kg)" },
  { key: "activityCode", label: "활동량" },
] as const;

export const GENDER_OPTIONS = Object.freeze([
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
]);

export const ACTIVITY_OPTIONS = Object.freeze([
  { value: 1, label: "매우 적은 활동량" },
  { value: 2, label: "가벼운 활동" },
  { value: 3, label: "보통 활동" },
  { value: 4, label: "활발한 활동" },
  { value: 5, label: "매우 활발" },
]);
