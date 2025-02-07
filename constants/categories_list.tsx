import type { TCategory } from "@/types/type";

import { Croissant, Fish, Apple, Beef, Milk, Utensils, Cookie, Wheat } from "lucide-react";

const categoryList: TCategory[] = [
  { id: 1, category: "빵", icon: <Croissant width={16} height={16} />, path: "bread" },
  { id: 2, category: "수산", icon: <Fish width={16} height={16} />, path: "fish" },
  { id: 3, category: "과일", icon: <Apple width={16} height={16} />, path: "fruit" },
  { id: 4, category: "축산", icon: <Beef width={16} height={16} />, path: "meat" },
  { id: 5, category: "유제품", icon: <Milk width={16} height={16} />, path: "milk" },
  { id: 6, category: "반찬", icon: <Utensils width={16} height={16} />, path: "sideDish" },
  { id: 7, category: "간식", icon: <Cookie width={16} height={16} />, path: "snack" },
  { id: 8, category: "농산", icon: <Wheat width={16} height={16} />, path: "vegetable" },
];

export default categoryList;
