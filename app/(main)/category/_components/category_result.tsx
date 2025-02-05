"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "@/components/common/pagination";
import VerticalItem from "@/components/common/vertical_item";

import styles from "@/app/(main)/category/category_page.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface CategoryResultProps {
  items: TItem[];
  totalItems: number;
}

export default function CategoryResult({ items, totalItems }: CategoryResultProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onClickHandler = (page: number) => {
    router.push(`/category?page=${page}`);
  };

  return (
    <div className={cx("container", "category_page")}>
      <h1 className={cx("category__title", "title-lg-b")}>카테고리</h1>
      <ul className={cx("category__item_list")}>
        {items.map((item) => (
          <VerticalItem key={item.item_id} item={item} />
        ))}
      </ul>

      <div className={cx("category__pagination")}>
        <Pagination current={currentPage} total={totalPages} onClick={onClickHandler} />
      </div>
    </div>
  );
}
