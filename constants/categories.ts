export type TCategory = {
  key: string;
  order: number;
  eng: string;
  kor: string;
  img: string;
};

export const CATEGORIES: TCategory[] = [
  {
    key: "bread",
    order: 1,
    eng: "Bread",
    kor: "빵",
    img: "/category/bread.png",
  },
  {
    key: "fish",
    order: 2,
    eng: "Fish",
    kor: "수산",
    img: "/category/fish.png",
  },
  {
    key: "fruit",
    order: 3,
    eng: "Fruit",
    kor: "과일",
    img: "/category/fruit.png",
  },
  {
    key: "meat",
    order: 4,
    eng: "Meat",
    kor: "축산",
    img: "/category/meat.png",
  },
  {
    key: "milk",
    order: 5,
    eng: "Milk",
    kor: "유제품",
    img: "/category/milk.png",
  },
  {
    key: "sideDish",
    order: 6,
    eng: "SideDish",
    kor: "반찬",
    img: "/category/side_dish.png",
  },
  {
    key: "snack",
    order: 7,
    eng: "Snack",
    kor: "간식",
    img: "/category/snack.png",
  },
  {
    key: "vegetable",
    order: 8,
    eng: "Vegetable",
    kor: "농산",
    img: "/category/vegetable.png",
  },
];
