"use client";

import { useEffect, useState } from "react";

import ItemList from "@/components/common/item_list";

import { SEARCH_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface SearchResultProps {
  query: string;
  page: number;
}

export default function SearchResult({ query, page }: SearchResultProps) {
  const [items, setItems] = useState<TItem[]>([]);

  useEffect(() => {
    if (!query) return;
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${encodeURIComponent(query)}&page=${page}`,
          {
            method: "GET",
          },
        ).then((response) => response.json());
        setItems(res);
      } catch (error) {
        console.error("검색어 아이템 리스트 fetch 실패", error);
      }
    };
    fetchItems();
  }, [query, page]);

  return <ItemList items={items} currentPage={page} title={SEARCH_TITLE} baseUrl="/search" />;
}
