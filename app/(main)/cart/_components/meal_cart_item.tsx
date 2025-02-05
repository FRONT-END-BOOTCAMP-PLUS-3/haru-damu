import Link from "next/link";
import Image from "next/image";

import type { MouseEvent } from "react";

import Button from "@/components/common/button";
import style from "@/app/(main)/cart/components/meal_cart_item.module.css";

import type { TCartItem } from "@/stores/cart_store";

import classNames from "classnames/bind";
import { ImageOff, X } from "lucide-react";
import { useStore } from "@/hooks/usestore";

const cx = classNames.bind(style);

interface ItemListProps {
  item: TCartItem;
}

export default function MealCartItem({ item }: ItemListProps) {
  const { removeMealCartItem } = useStore();

  const { item_id, item_name, item_price, img, blurImg } = item;

  const removeMealItemHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    removeMealCartItem(item);
  };

  return (
    <li id={`meal-cart-item__${item.item_id}`}>
      <Link href={`/item/${item_id}`} className={cx("meal_cart_item__link")}>
        <div className={cx("meal_cart_item__image__wrapper")}>
          {img ? (
            <Image
              className={cx("meal_cart_item__image")}
              src={img}
              alt={item_name}
              fill
              placeholder="blur"
              blurDataURL={blurImg}
            />
          ) : (
            <ImageOff size={80} className={cx("meal_cart_item__no__image")} />
          )}
        </div>
        <div className={cx("meal_cart_item__button__wrapper")}>
          <Button
            width="30px"
            height="30px"
            text=""
            color="delete"
            iconComponent={<X width={15} />}
            onClick={(event) => removeMealItemHandler(event)}
          />
        </div>
        <div className={cx("meal_cart_item__name__wrapper")}>
          <span className={cx("meal_cart_item__name", "text-sm")}>{item_name}</span>
          <span className={cx("meal_cart_item__name", "text-sm")}>{item_price}</span>
        </div>
      </Link>
    </li>
  );
}
