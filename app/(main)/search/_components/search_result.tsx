"use client";

import { useEffect, useState } from "react";

import ItemList from "@/components/common/item_list";

import { SEARCH_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface SearchResultProps {
  query: string;
  page: number;
}

interface PaginationInfo {
  count: number;
  totalPage: number;
  page: number;
  size: number;
}

export default function SearchResult({ query, page }: SearchResultProps) {
  const [items, setItems] = useState<TItem[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    totalPage: 1,
    page: 1,
    size: 20,
  });

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
        setItems(res.items);
        setPaginationInfo({
          count: res.count,
          totalPage: res.totalPage,
          page: res.page,
          size: res.size,
        });
      } catch (error) {
        console.error("검색어 아이템 리스트 fetch 실패", error);
      }
    };
    fetchItems();
  }, [query, page]);

  return (
    <ItemList
      items={items}
      currentPage={paginationInfo.page}
      totalPage={paginationInfo.totalPage}
      title={SEARCH_TITLE}
      baseUrl="/search"
    />
  );
}
