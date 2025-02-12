"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import ItemList from "@/components/common/item_list";

import { CATEGORIES, CATEGORY_TITLE } from "@/constants/categories";

import type { TItem } from "@/types";

interface PaginationInfo {
  count: number;
  totalPage: number;
  page: number;
  size: number;
}

export default function CategoryResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("value") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [items, setItems] = useState<TItem[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    totalPage: 1,
    page: 1,
    size: 20,
  });

  const categoryTitle = CATEGORIES.find((cat) => cat.key === category)?.kor || CATEGORY_TITLE;

  const pageChangeHandler = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set("value", category);
    params.set("page", String(page));
    router.push(`/category?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!category) return;
    const fetchItems = async () => {
      try {
        setItems([]);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category?value=${encodeURIComponent(category)}&page=${page}`,
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
      onchange={pageChangeHandler}
    />
  );
}
