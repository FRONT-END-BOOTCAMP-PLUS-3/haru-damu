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

interface MainVerticalItemProps {
  item: MainItems;
}

export default function MainVerticalItem({ item }: MainVerticalItemProps) {
  const {
    vertical_item__image__wrapper,
    vertical_item__no__image,
    vertical_item__image,
    vertical_item__link,
    vertical_item__name,
  } = style;

  const { itemId, itemName, itemPrice, itemImage } = item;

  const [isLoading, setIsLoading] = useState(false);

  const { isLogin, addMessage } = useStore();

  const handleCartClick = async () => {
    setIsLoading(true);
    if (isLoading) return;

    if (!isLogin) return addMessage("로그인이 필요한 서비스 입니다!", "var(--important-color");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts`, {
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
      }).then((response) => response.json());

      addMessage("장바구니 추가!");
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
        <span className="text-lg-b">{itemPrice.toLocaleString()}원</span>
      </div>
    </li>
  );
}
