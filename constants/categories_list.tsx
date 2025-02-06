import type { TCategory } from "@/types/type";

import { Cpu, Shirt, Home } from "lucide-react";

const categoryList: TCategory[] = [
  { id: 1, category: "전자기기", icon: <Cpu width={16} height={16} />, path: "/category/electronics" },
  { id: 2, category: "패션", icon: <Shirt width={16} height={16} />, path: "/category/fashion" },
  { id: 3, category: "홈", icon: <Home width={16} height={16} />, path: "/category/home" },
];
export default categoryList;
