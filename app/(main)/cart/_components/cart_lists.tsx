"use client";

import { useEffect, useState } from "react";

import SortableCartItem from "@/app/(main)/cart/_components/sortable_cart_item";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/cart/_components/cart_lists.module.css";

import type { TCartItem } from "@/stores/cart_store";

import classNames from "classnames/bind";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const cx = classNames.bind(style);

interface CartListsProps {
  items: TCartItem[];
}

export default function CartLists({ items }: CartListsProps) {
  const [wrapperIdList, setWrapperIdList] = useState<string[]>([]);

  const { cart, fetchCart } = useStore();

  const { setNodeRef } = useDroppable({
    id: "cart-list-box",
    data: {
      type: "cart-list-box",
    },
  });

  const getIsOddWrapperIdIndex = (id: string) => {
    return wrapperIdList.indexOf(id) % 2 !== 0;
  };

  useEffect(() => {
    const wrapperIds = [...new Set(cart.map((item) => item.wrapperId))].filter((value) => value !== null) as string[];

    setWrapperIdList(wrapperIds);
  }, [cart]);

  useEffect(() => {
    const sortedCartItems = items.sort((a, b) => {
      const referenceA = a.wrapperId ?? "";
      const referenceB = b.wrapperId ?? "";
      return referenceA.localeCompare(referenceB, undefined, { numeric: true });
    });

    fetchCart(sortedCartItems);
  }, [fetchCart, items]);

  return (
    <div id="cart-list-box" ref={setNodeRef} className={cx("cart_list_box")}>
      <ul>
        <SortableContext strategy={verticalListSortingStrategy} items={cart.map((item) => item.itemId)}>
          {cart.map((item, idx) => (
            <SortableCartItem
              key={idx}
              id={item.itemId}
              item={item}
              isWrapped={item.wrapperId !== null}
              isOddIndex={item.wrapperId !== null && getIsOddWrapperIdIndex(item.wrapperId)}
              isWrapperTop={!cart[idx - 1] || item.wrapperId !== cart[idx - 1].wrapperId}
              isWrapperBottom={!cart[idx + 1] || item.wrapperId !== cart[idx + 1].wrapperId}
            />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
}
