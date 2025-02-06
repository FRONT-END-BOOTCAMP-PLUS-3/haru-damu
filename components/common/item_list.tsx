"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "@/components/common/pagination";
import VerticalItem from "@/components/common/vertical_item";
import styles from "@/components/common/item_list.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ItemListProps {
  items: TItem[];
  totalItems: number;
  title: string;
  baseUrl: string;
}

export default function ItemList({ items, totalItems, title, baseUrl }: ItemListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onClickHandler = (page: number) => {
    router.push(`${baseUrl}?page=${page}`);
  };

  return (
    <div className={cx("container", "item_list__page")}>
      <h1 className={cx("item_list__title", "title-lg-b")}>{title}</h1>
      <ul className={cx("item_list__item_list")}>
        {items.map((item) => (
          <VerticalItem key={item.item_id} item={item} />
        ))}
      </ul>

      <div className={cx("item_list__pagination")}>
        <Pagination current={currentPage} total={totalPages} onClick={onClickHandler} />
      </div>
    </div>
  );
}
