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
