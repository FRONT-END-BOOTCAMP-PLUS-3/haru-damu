"use client";
import Link from "next/link";
import Image from "next/image";

import Button from "@/components/common/button";
import styles from "@/components/common/horizontal_item.module.css";

import type { TCart } from "@/types";

import classNames from "classnames/bind";
import { ChevronLeft, ChevronRight, ImageOff, Trash2 } from "lucide-react";

interface HorizontalItemProps {
  cart: TCart;
  isEditable: boolean;
  onCheck: (itemId: number, checked: boolean) => void;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onDelete: (itemId: number) => void;
}

const cx = classNames.bind(styles);

export default function HorizontalItem({ cart, isEditable, onCheck, onQuantityChange, onDelete }: HorizontalItemProps) {
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
  const { item_id, item_name, item_price, img, quantity, is_checked, blurImg } = cart;
  const formattedPrice = item_price.toLocaleString();
  const handlers = isEditable
    ? {
        onCheckHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
          onCheck(item_id, e.target.checked);
        },
        onDecreaseQuantityHandler: () => {
          if (quantity > 1) {
            onQuantityChange(item_id, quantity - 1);
          }
        },
        onIncreaseQuantityHandler: () => {
          onQuantityChange(item_id, quantity + 1);
        },
        onDeleteHandler: () => {
          onDelete(item_id);
        },
      }
    : null;
  return (
    <li className={wrapper}>
      <div className={cx(horizontal_item, { horizontal_item__read_only: !isEditable })}>
        <div className={horizontal_item_left}>
          {isEditable && (
            <input
              type="checkbox"
              className={horizontal_item_left__checkbox}
              onChange={handlers?.onCheckHandler}
              checked={is_checked}
            />
          )}
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
              <ImageOff size={36} color="#aaa" />
            )}
          </Link>
        </div>
        <Link href={`/item/${item_id}`} className={horizontal_item__link_name}>
          <p className={cx(horizontal_item_right__name, "text-md-b")}>{item_name}</p>
        </Link>
        <div className={horizontal_item_right}>
          <p className={cx(horizontal_item_right__price, "text-md-b")}>
            <span>{formattedPrice}</span>
            &nbsp;원
          </p>
          <div className={horizontal_item_quantity}>
            {isEditable ? (
              <>
                <button
                  className={horizontal_item_quantity__button}
                  aria-label="수량 감소"
                  onClick={handlers?.onDecreaseQuantityHandler}
                >
                  <ChevronLeft size={20} />
                </button>
                <p className={horizontal_item_quantity__value}>{quantity}</p>
                <button
                  className={horizontal_item_quantity__button}
                  aria-label="수량 증가"
                  onClick={handlers?.onIncreaseQuantityHandler}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : (
              <p className={horizontal_item_quantity__value}>{quantity}</p>
            )}
          </div>
          {isEditable && (
            <Button
              text={""}
              width="40px"
              height="40px"
              color="delete"
              iconComponent={<Trash2 size={16} />}
              className={horizontal_item_right__delete_button}
              onClick={handlers?.onDeleteHandler}
            />
          )}
        </div>
      </div>
    </li>
  );
}
