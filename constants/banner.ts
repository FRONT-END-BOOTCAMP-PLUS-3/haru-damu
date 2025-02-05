type Banner = {
  id: number;
  image: string;
  categoryId: number;
};
export const banners: Banner[] = [
  { id: 1, image: "/banner/bread.jpg", categoryId: 1 },
  { id: 2, image: "/banner/fish.jpg", categoryId: 2 },
  { id: 3, image: "/banner/meet.jpg", categoryId: 3 },
  { id: 4, image: "/banner/milk.jpg", categoryId: 4 },
  { id: 5, image: "/banner/side_dish.jpg", categoryId: 5 },
  { id: 6, image: "/banner/vegetable.jpg", categoryId: 6 },
];
