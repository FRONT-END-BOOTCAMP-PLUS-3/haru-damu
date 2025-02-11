"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import style from "@/components/common/vertical_item.module.css";

import type { MainItems } from "@/app/(main)/_components/meal_list";

import classNames from "classnames/bind";
import { ImageOff, ShoppingBasket } from "lucide-react";

const cx = classNames.bind(style);

interface VerticalItemProps {
  item: MainItems;
}

export default function VerticalItem({ item }: VerticalItemProps) {
  const {
    vertical_item__image__wrapper,
    vertical_item__no__image,
    vertical_item__image,
    vertical_item__link,
    vertical_item__name,
  } = style;

  const { itemId, itemName, itemPrice, itemImage } = item;
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useStore();
  const handleCartClick = async () => {
    setIsLoading(true);
    addMessage("장바구니 추가!");
    if (isLoading) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            itemId: itemId,
            quantity: 1,
            wrapperId: null,
            isChecked: true,
          },
        }),
      });
      /*if (!response.ok) {
        throw new Error("장바구니 추가 실패");
      }*/

      const result = await response.json();
      console.log("✅ 장바구니 추가 성공:", result);
    } catch (error) {
      console.error("🚨 장바구니 추가 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <li>
      <div className={vertical_item__link}>
        <Link href={`/item/${itemId}`}>
          <div className={cx(vertical_item__image__wrapper, !itemImage && vertical_item__no__image)}>
            {itemImage ? (
              <Image
                src={itemImage[0].src ? itemImage[0].src : "/default_items.jpg"}
                alt={itemName}
                fill
                className={vertical_item__image}
              />
            ) : (
              <ImageOff size={80} />
            )}
          </div>
        </Link>
        <Button onClick={handleCartClick} text="담기" iconComponent={<ShoppingBasket />} />
        <span className={cx(vertical_item__name, "text-lg")}>{itemName}</span>
        <span className="text-lg-b">{itemPrice}원</span>
      </div>
    </li>
  );
}
