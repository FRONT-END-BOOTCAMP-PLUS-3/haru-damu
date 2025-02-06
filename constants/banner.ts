export type Banner = {
  categoryName: string;
  image: string;
  categoryId: number;
};
export const banners: Banner[] = [
  { categoryName: "bread", image: "/banner/bread.jpg", categoryId: 1 },
  { categoryName: "fish", image: "/banner/fish.jpg", categoryId: 2 },
  { categoryName: "meet", image: "/banner/meet.jpg", categoryId: 3 },
  { categoryName: "milk", image: "/banner/milk.jpg", categoryId: 4 },
  { categoryName: "side_dish", image: "/banner/side_dish.jpg", categoryId: 5 },
  { categoryName: "vegetable", image: "/banner/vegetatble.jpg", categoryId: 6 },
];
