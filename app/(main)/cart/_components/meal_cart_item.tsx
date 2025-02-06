import Link from "next/link";
import Image from "next/image";

import type { MouseEvent } from "react";

import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/cart/_components/meal_cart_item.module.css";

import type { TCartItem } from "@/stores/cart_store";

import classNames from "classnames/bind";
import { ImageOff, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

const cx = classNames.bind(style);

interface ItemListProps {
  item: TCartItem;
  isDragging?: boolean;
}

export default function MealCartItem({ item, isDragging = false }: ItemListProps) {
  const { removeMealCartItem } = useStore();

  const { item_id, item_name, item_price, img, blurImg } = item;

  const { listeners, setNodeRef } = useSortable({
    id: item_id,
    data: {
      id: item_id,
      type: "meal-cart-item",
      overlayItem: <MealCartItem item={item} isDragging={true} />,
    },
  });

  const removeMealItemHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    removeMealCartItem(item);
  };

  if (!item.item_id) return null;

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      id={`meal-cart-item__${item.item_id}`}
      className={cx(isDragging && "meal_cart_item__dragging")}
    >
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
            <ImageOff size={60} className={cx("meal_cart_item__no__image")} />
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
