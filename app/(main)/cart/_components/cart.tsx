"use client";

import MealCart from "@/app/(main)/cart/_components/meal_cart";
import CartLists from "@/app/(main)/cart/_components/cart_lists";
import CartListHeader from "@/app/(main)/cart/_components/cart_list_header";

import useDndContext from "@/hooks/use_dnd_context";

import style from "@/app/(main)/cart/_components/cart.module.css";

import type { DropAnimation } from "@dnd-kit/core";
import type { TCartItem } from "@/stores/cart_store";

import classNames from "classnames/bind";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragOverlay } from "@dnd-kit/core";

const cx = classNames.bind(style);

interface CartProps {
  items: TCartItem[];
}

export default function Cart({ items }: CartProps) {
  const { sensors, onDragEnd, onDragOver, onDragStart, onDragCancel, overlayElement } = useDndContext();

  const dropAnimation: DropAnimation = {
    duration: 10,
    easing: "ease-in-out",
    keyframes({ transform }) {
      return [
        { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
        { opacity: 0, transform: CSS.Transform.toString(transform.final) },
      ];
    },
    sideEffects({ active }) {
      active.node.classList.add("dropAnimationInProgress");
      active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 25,
        easing: "ease-in-out",
      });

      return () => {
        active.node.classList.remove("dropAnimationInProgress");
      };
    },
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
    >
      <div className={cx("cart__fixed")}>
        <MealCart />
        <CartListHeader />
      </div>
      <CartLists items={items} />
      <DragOverlay dropAnimation={dropAnimation}>{overlayElement}</DragOverlay>
    </DndContext>
  );
}
