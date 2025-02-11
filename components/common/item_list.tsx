"use client";

import { useRouter } from "next/navigation";

import Pagination from "@/components/common/pagination";
import VerticalItem from "@/components/common/vertical_itemss";

import { useStore } from "@/hooks/usestore";

import styles from "@/components/common/item_list.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ItemListProps {
  title: string;
  baseUrl: string;
  items: TItem[];
  currentPage: number;
}

export default function ItemList({ title, baseUrl, items, currentPage }: ItemListProps) {
  const { isShrunk } = useStore();
  const router = useRouter();

  const onClickHandler = (page: number) => {
    router.push(`${baseUrl}?page=${page}`);
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
        <Pagination current={currentPage} total={10} onClick={onClickHandler} />
      </div>
    </div>
  );
}
