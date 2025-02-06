import ItemList from "@/components/common/item_list";

import { SEARCH_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface SearchResultProps {
  items: TItem[];
  totalItems: number;
}

export default function SearchResult({ items, totalItems }: SearchResultProps) {
  return <ItemList items={items} totalItems={totalItems} title={SEARCH_TITLE} baseUrl="/search" />;
}
