"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import type { MouseEvent } from "react";

import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import style from "@/components/common/vertical_item.module.css";

import type { TItem } from "@/types";

import classNames from "classnames/bind";
import { ImageOff, ShoppingBasket } from "lucide-react";

const cx = classNames.bind(style);

interface VerticalItemProps {
  item: TItem;
}

export default function VerticalItem({ item }: VerticalItemProps) {
  const {
    vertical_item__image__wrapper,
    vertical_item__no__image,
    vertical_item__image,
    vertical_item__link,
    vertical_item__name,
  } = style;

  const { itemId, itemName, itemPrice, img, blurImg } = item;

  const [isLoading, setIsLoading] = useState(false);

  const { isLogin, addMessage } = useStore();

  const handleCartClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

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
      <Link href={`/item/${itemId}`} className={vertical_item__link}>
        <div className={cx(vertical_item__image__wrapper, !img && vertical_item__no__image)}>
          {img ? (
            <Image
              src={img}
              alt={itemName}
              fill
              className={vertical_item__image}
              placeholder="blur"
              blurDataURL={blurImg}
            />
          ) : (
            <ImageOff size={80} />
          )}
        </div>
        <Button text="담기" iconComponent={<ShoppingBasket />} onClick={handleCartClick} />
        <span className={cx(vertical_item__name, "text-lg")}>{itemName}</span>
        <span className="text-lg-b">{itemPrice}원</span>
      </Link>
    </li>
  );
}
