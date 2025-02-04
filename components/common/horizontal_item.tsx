"use client";
import Link from "next/link";
import Image from "next/image";

import styles from "@/components/common/horizontal_item.module.css";

import type { TCart } from "@/types";

import classNames from "classnames/bind";
import Button from "@/components/common/button";
import { ChevronLeft, ChevronRight, ImageOff, Trash2 } from "lucide-react";

interface HorizontalItemProps {
  cart: TCart;
  isEditable: boolean;
}

const cx = classNames.bind(styles);

export default function HorizontalItem({ cart, isEditable }: HorizontalItemProps) {
  const {
    wrapper,
    horizontal_item,
    horizontal_item__link_img,
    horizontal_item__link_name,
    horizontal_item_left,
    horizontal_item_left__checkbox,
    horizontal_item_left__img,
    horizontal_item_right,
    horizontal_item_right__name,
    horizontal_item_right__price,
    horizontal_item_right__delete_button,
    horizontal_item_quantity,
    horizontal_item_quantity__button,
    horizontal_item_quantity__value,
  } = styles;
  const { item_id, item_name, item_price, img, quantity, blurImg } = cart;

  return (
    <li className={wrapper}>
      <div className={cx(horizontal_item, { horizontal_item__read_only: !isEditable })}>
        <div className={horizontal_item_left}>
          <input type="checkbox" className={horizontal_item_left__checkbox} />
          <Link href={`/item/${item_id}`} className={horizontal_item__link_img}>
            {img ? (
              <Image
                src={img}
                alt={item_name}
                placeholder="blur"
                blurDataURL={blurImg}
                className={horizontal_item_left__img}
              />
            ) : (
              <ImageOff size={36} />
            )}
          </Link>
        </div>
        <Link href={`/item/${item_id}`} className={horizontal_item__link_name}>
          <p className={cx(horizontal_item_right__name, "text-md-b")}>{item_name}</p>
        </Link>
        <div className={horizontal_item_right}>
          <p className={cx(horizontal_item_right__price, "text-md-b")}>
            <span>{item_price}</span>
            &nbsp;원
          </p>
          <div className={horizontal_item_quantity}>
            <button className={horizontal_item_quantity__button}>
              <ChevronLeft size={20} />
            </button>
            <p className={horizontal_item_quantity__value}>{quantity}</p>
            <button className={horizontal_item_quantity__button}>
              <ChevronRight size={20} />
            </button>
          </div>
          <Button
            text={""}
            width="40px"
            height="40px"
            color="delete"
            iconComponent={<Trash2 size={16} />}
            className={horizontal_item_right__delete_button}
          />
        </div>
      </div>
    </li>
  );
}
