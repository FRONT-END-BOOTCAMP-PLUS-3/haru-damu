"use client";

import { useEffect, useState } from "react";

import ItemList from "@/components/common/item_list";

import { CATEGORIES, CATEGORY_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface CategoryResultProps {
  category: string;
  page: number;
}

interface PaginationInfo {
  count: number;
  totalPage: number;
  page: number;
  size: number;
}

export default function CategoryResult({ category, page }: CategoryResultProps) {
  const [items, setItems] = useState<TItem[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    totalPage: 1,
    page: 1,
    size: 20,
  });

  const categoryTitle = CATEGORIES.find((cat) => cat.key === category)?.kor || CATEGORY_TITLE;

  useEffect(() => {
    if (!category) return;
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category?value=${encodeURIComponent(category)}&page=${page}`,
          {
            method: "GET",
          },
        ).then((response) => response.json());
        console.log("아이템 이미지 URL:", res.items[0]?.itemImages[0]?.src);
        setItems(res.items);
        setPaginationInfo({
          count: res.count,
          totalPage: res.totalPage,
          page: res.page,
          size: res.size,
        });
      } catch (error) {
        console.error("카테고리 아이템 리스트 fetch 실패", error);
      }
    };
    fetchItems();
  }, [category, page]);

  return (
    <ItemList
      items={items}
      currentPage={paginationInfo.page}
      totalPage={paginationInfo.totalPage}
      title={categoryTitle}
      baseUrl="/category"
    />
  );
}
