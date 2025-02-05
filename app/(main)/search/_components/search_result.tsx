"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "@/components/common/pagination";
import VerticalItem from "@/components/common/vertical_item";

import styles from "@/app/(main)/search/search_page.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface SearchResultProps {
  items: TItem[];
  totalItems: number;
}

export default function SearchResult({ items, totalItems }: SearchResultProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onClickHandler = (page: number) => {
    router.push(`/search?page=${page}`);
  };

  return (
    <div className={cx("container", "search_page")}>
      <h1 className={cx("search__title", "title-lg-b")}>검색 결과</h1>
      <ul className={cx("search__item_list")}>
        {items.map((item) => (
          <VerticalItem key={item.item_id} item={item} />
        ))}
      </ul>

      <div className={cx("search__pagination")}>
        <Pagination current={currentPage} total={totalPages} onClick={onClickHandler} />
      </div>
    </div>
  );
}
