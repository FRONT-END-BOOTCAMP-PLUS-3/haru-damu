import ItemList from "@/components/common/item_list";

import { CATEGORY_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface CategoryResultProps {
  items: TItem[];
  totalItems: number;
}

export default function CategoryResult({ items, totalItems }: CategoryResultProps) {
  return <ItemList items={items} totalItems={totalItems} title={CATEGORY_TITLE} baseUrl="/category" />;
}
