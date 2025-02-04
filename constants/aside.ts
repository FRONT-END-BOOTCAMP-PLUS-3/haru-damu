import type { THealth } from "@/types";
import type { TMypagePath } from "@/stores/mypage_store";

export const WELCOME_TEXT = "안녕하세요, ";
export const HONORIFIC_TEXT = "님";
export const NUTRITION_TITLE = "하루 권장 영양소";

export const ASIDE_PATH: {
  title: string;
  path: TMypagePath;
}[] = [
  { title: "권장 영양소 수정", path: "nutrition" },
  { title: "개인정보 수정", path: "personal" },
  { title: "건강 정보 수정", path: "health" },
  { title: "주문 내역 확인", path: "order" },
];

export const HEALTH_CHART_DATA: {
  eng: keyof THealth;
  kor: string;
  color: string;
}[] = [
  {
    eng: "carbohydrates",
    kor: "탄수화물",
    color: "rgba(255, 99, 132, 1)",
  },
  {
    eng: "protein",
    kor: "단백질",
    color: "rgba(54, 162, 235, 1)",
  },
  {
    eng: "fat",
    kor: "지방",
    color: "rgba(255, 206, 86, 1)",
  },
];
