"use client";

import { useRouter } from "next/navigation";

import Pagination from "@/components/common/pagination";
import VerticalItem from "@/components/common/vertical_item";

import { useStore } from "@/hooks/usestore";

import styles from "@/components/common/item_list.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ItemListProps {
  title: string;
  items: TItem[];
  currentPage: number;
  totalPage: number;
  baseUrl?: string;
  onchange?: (page: number) => void;
}

export default function ItemList({ title, items, currentPage, totalPage, onchange }: ItemListProps) {
  const { isShrunk } = useStore();

  const onClickHandler = (page: number) => {
    if (onchange) {
      onchange(page);
    }
  };

  return (
    <div className={cx("container", "item_list__page", isShrunk && "item_list__page__padding_top")}>
      <h1 className={cx("item_list__title", "title-lg-b")}>{title}</h1>
      <ul className={cx("item_list__item_list")}>
        {items.map((item) => (
          <VerticalItem key={item.itemId} item={item} />
        ))}
      </ul>

      <div className={cx("item_list__pagination")}>
        <Pagination current={currentPage} total={totalPage} onClick={onClickHandler} />
      </div>
    </div>
  );
}
