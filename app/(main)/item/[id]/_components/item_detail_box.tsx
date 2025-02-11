"use client";

import Image from "next/image";

import { useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import styles from "@/app/(main)/item/[id]/_components/item_detail_box.module.css";

import classNames from "classnames/bind";
import { ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";

type ItemImage = {
  id: number;
  src: string;
  itemId: number;
  createdAt: string;
};
type Nutrition = {
  g: number;
  fat: number;
  sugar: number;
  sodium: number;
  calorie: number;
  protein: number;
  carbohydrates: number;
};

export type Item = {
  id: number;
  storeId: number;
  itemName: string;
  itemPrice: number;
  description: string;

  categoryCode: string;
  itemCode: number;
  unitType: string;
  volume: number;
  nutrition: Nutrition;
  createdAt: string;
  updatedAt: string;
  itemImages?: ItemImage[];
  storeName?: string;
};
interface ItemDetailBoxProps {
  item: Item;
}

const cx = classNames.bind(styles);

export default function ItemDetailBox({ item }: ItemDetailBoxProps) {
  return (
    <div className={cx("item")}>
      <Image
        width={390}
        height={520}
        alt="제품이미지"
        src={item.itemImages ? item.itemImages[0].src : "/default_items.jpg"}
      />
      <ItemInfo
        itemInfo={{
          itemId: item.id,
          itemName: item.itemName,
          categoryCode: item.categoryCode,
          storeName: "상민컴퍼니",
          description: item.description,
        }}
      />
    </div>
  );
}
type ItemInfo = {
  itemId: number;
  itemName: string;
  description: string;
  storeName?: string;
  categoryCode: string;
};
interface ItemInfoProps {
  itemInfo: ItemInfo;
}
const ItemInfo = ({ itemInfo }: ItemInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useStore();
  const handleCartClick = async () => {
    setIsLoading(true);

    if (isLoading) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            itemId: itemInfo.itemId,
            quantity: quantity,
            wrapperId: null,
            isChecked: true,
          },
        }),
      });
      addMessage("장바구니 추가!");
      const result = await response.json();
      console.log("✅ 장바구니 추가 성공:", result);
    } catch (error) {
      console.error("🚨 장바구니 추가 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cx()}>
      <ItemInfoLine title="상품명" description={itemInfo.itemName} />
      <ItemInfoLine title="카테고리" description={itemInfo.categoryCode} />
      <ItemInfoLine title="업체명" description={itemInfo.storeName} />
      <ItemInfoLine title="설명" description={itemInfo.description} />
      <ItemInfoLine title="수량" description={<ButtonSelector quantity={quantity} setQuantity={setQuantity} />} />
      <Button
        onClick={handleCartClick}
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

type ButtonSelectorProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};
const ButtonSelector = ({ quantity, setQuantity }: ButtonSelectorProps) => {
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
