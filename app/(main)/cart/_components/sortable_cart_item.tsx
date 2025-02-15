"use client";

import type { JSX } from "react";

import HorizontalItem from "@/components/common/horizontal_item";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/cart/_components/sortable_cart_item.module.css";

import type { TCartItem } from "@/stores/cart_store";

import classNames from "classnames/bind";
import { useSortable } from "@dnd-kit/sortable";

const cx = classNames.bind(style);

interface SortableCartItemProps {
  id: number;
  item: TCartItem;
  isDragging?: boolean;
  isWrapped?: boolean;
  isOddIndex?: boolean;
  isWrapperTop?: boolean;
  isWrapperBottom?: boolean;
}

export default function SortableCartItem({
  id,
  item,
  isDragging = false,
  isWrapped = false,
  isOddIndex = false,
  isWrapperTop = false,
  isWrapperBottom = false,
}: SortableCartItemProps): JSX.Element | null {
  const { removeCartItem, changeIsCheckedCartItems, changeQuantityCartItem } = useStore();

  const { listeners, setNodeRef } = useSortable({
    id,
    data: {
      id,
      item,
      type: "cart-item",
      overlayItem: <SortableCartItem id={id} item={item} isDragging={true} />,
    },
  });

  if (!id) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      id={`cart-item__${item.itemId}`}
      className={cx(
        isDragging && "cart_list_dragging",
        isWrapperTop && "cart_list__border_top_radius",
        !isDragging && (isWrapperBottom ? "cart_list__border_bottom_radius" : "cart_list__padding"),
        isWrapped && (isOddIndex ? "cart_list__background__even_index" : "cart_list__background__odd_index"),
      )}
    >
      <div className={cx("cart_list")}>
        <HorizontalItem
          horizontalItem={item}
          isEditable={true}
          onCheck={changeIsCheckedCartItems}
          onQuantityChange={changeQuantityCartItem}
          onDelete={removeCartItem}
        />
      </div>
    </div>
  );
}
