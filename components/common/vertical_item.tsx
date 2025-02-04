"use client";

import Link from "next/link";
import Image from "next/image";

import Button from "@/components/common/button";
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

  const { item_id, item_name, item_price, img, blurImg } = item;

  return (
    <li>
      <Link href={`/item/${item_id}`} className={vertical_item__link}>
        <div className={cx(vertical_item__image__wrapper, !img && vertical_item__no__image)}>
          {img ? (
            <Image
              src={img}
              alt={item_name}
              fill
              className={vertical_item__image}
              placeholder="blur"
              blurDataURL={blurImg}
            />
          ) : (
            <ImageOff size={80} />
          )}
        </div>
        <Button text="담기" iconComponent={<ShoppingBasket />} />
        <span className={cx(vertical_item__name, "text-lg")}>{item_name}</span>
        <span className="text-lg-b">{item_price}원</span>
      </Link>
    </li>
  );
}
