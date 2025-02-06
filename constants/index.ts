export type TPayment = {
  paymentName: string;
  brandColor: string;
};

export const BRAND_NAMES = {
  KOREAN: "하루담은",
  PASCALCASE_ENGLISH: "Haru-Damu",
  LOWERCASE_ENGLISH: "haru-damu",
} as const;

export const EXTERNAL_URLS = {
  GITHUB: "https://github.com/FRONT-END-BOOTCAMP-PLUS-3/haru-damu",
} as const;

export const MAIN_MEAL = {
  breakfast: {
    title: "아침식사",
    description: "건강한 아침 한끼를 완성해보세요.",
  },
  lunch: {
    title: "점심식사",
    description: "든든한 점심 한끼를 챙겨보세요.",
  },
  dinner: {
    title: "저녁식사",
    description: "가볍고 맛있는 저녁을 즐겨보세요.",
  },
} as const;

export const DRAGGABLE_TYPES = ["cart-item", "meal-cart-item"] as const;
export const DROPPABLE_ONLY_TYPES = ["cart-list-box", "meal-cart-area"] as const;

export const WRAPPING_ALL_MEAL_ITEMS_BUTTON = "한끼 장바구니 그룹화 하기";
export const REMOVE_ALL_MEAL_ITEMS_BUTTON = "한끼 장바구니 모두 제거";

export const UPDATE_SUCCESS_MESSAGE = "업데이트에 성공하였습니다.";
export const ERROR_MESSAGE = "죄송합니다! 잠시 후 다시 시도 해주세요!";
export const PAYMENTS: TPayment[] = [
  {
    paymentName: "NAVER PAY",
    brandColor: "#00DE5A",
  },
];
