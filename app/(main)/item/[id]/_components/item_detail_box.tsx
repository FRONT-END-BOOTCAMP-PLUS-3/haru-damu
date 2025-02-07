"use client";

import Image from "next/image";

import { useState } from "react";
import type { ReactNode } from "react";

import Button from "@/components/common/button";

import styles from "@/app/(main)/item/[id]/_components/item_detail_box.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";
import { ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";

interface ItemDetailBoxProps {
  item: TItem;
}

const cx = classNames.bind(styles);

export default function ItemDetailBox({ item }: ItemDetailBoxProps) {
  return (
    <div className={cx("item")}>
      <Image width={390} height={520} alt="제품이미지" src={item.img ?? "/default_items.jpg"} />
      <ItemInfo
        itemInfo={{
          item_name: item.item_name,
          category_code: item.category_code,
          store_name: item.store_name,
          description: item.description,
        }}
      />
    </div>
  );
}

interface ItemInfoProps {
  itemInfo: Pick<TItem, "item_name" | "category_code" | "store_name" | "description">;
}

const ItemInfo = ({ itemInfo }: ItemInfoProps) => {
  return (
    <div className={cx()}>
      <ItemInfoLine title="상품명" description={itemInfo.item_name} />
      <ItemInfoLine title="카테고리" description={itemInfo.category_code} />
      <ItemInfoLine title="업체명" description={itemInfo.store_name} />
      <ItemInfoLine title="설명" description={itemInfo.description} />
      <ItemInfoLine title="설명" description={<ButtonSelector />} />
      <Button
        width="666px"
        height="55px"
        className={cx("item__cartbtn")}
        text="장바구니 담기"
        iconComponent={<ShoppingCart size={16} />}
      />
    </div>
  );
};

const ItemInfoLine = ({ title, description }: { title: string; description: string | ReactNode }) => {
  return (
    <div className={cx("item__info")}>
      <span className={cx("item__info__title", "title-md-b")}>{title}</span>
      <span className={cx("item__info__description", "text-md")}>{description}</span>
    </div>
  );
};

const ButtonSelector = () => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const increase = () => setQuantity((prev) => prev + 1);

  return (
    <div className={cx("item__quantity")}>
      <button className={cx("item__quantity__btn")} onClick={decrease}>
        <ChevronLeft size={16} />
      </button>
      <span className={cx("text-md")}>{quantity}</span>
      <button className={cx("item__quantity__btn")} onClick={increase}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
