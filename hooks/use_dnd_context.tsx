"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { useStore } from "@/hooks/usestore";

import getDragDirection from "@/utils/get-drag-direction";

import type { DraggableComponent } from "@/types";
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { useSensor, useSensors, MouseSensor } from "@dnd-kit/core";

const useDndContext = () => {
  const [overlayElement, setOverlayElement] = useState<ReactNode>(null);

  const {
    cart,
    fetchCart,
    getCartItem,
    getMealCartItem,
    removeMealCartItem,
    addMealCartItem,
    startDragging,
    stopDragging,
  } = useStore();

  // 마우스 딜레이를 줘 버튼과 충돌을 피해줍니다.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 1000,
        distance: 0,
      },
    }),
  );

  const onCartItemDragEnd = ({ over, active }: DragEndEvent) => {
    if (!active.data.current || !over?.data.current) return;

    const {
      id: activeItemId,
      item: { wrapper_id: activeItemWrapperId },
    } = active.data.current;

    const {
      id: overItemId,
      item: { wrapper_id: overItemWrapperId },
    } = over.data.current;

    if (activeItemId === overItemId) return;
    if (activeItemWrapperId !== null || overItemWrapperId !== null) return;

    const activeItemIndex = active.data.current.sortable.index as number;
    const overItemIndex = over.data.current.sortable.index as number;

    const newCartItems = arrayMove(cart, activeItemIndex, overItemIndex);

    fetchCart(newCartItems);
  };

  const onCartToMealCartDragEnd = ({ over, active }: DragEndEvent) => {
    if (!active.data.current || !over?.data.current) return;

    const activeItemId = active.data.current.id as number;
    const overItemId = over.data.current.id as number | string;

    if (activeItemId === overItemId) return;

    const item = getCartItem(activeItemId);

    addMealCartItem(item);
  };

  const onMealCartToCartDragEnd = ({ over, active }: DragEndEvent) => {
    if (!active.data.current || !over?.data.current) return;

    const activeItemId = active.data.current.id as number;
    const overItemId = over.data.current.id as number;

    if (activeItemId === overItemId) return;

    const item = getMealCartItem(activeItemId);

    removeMealCartItem(item);
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    startDragging();
    return active.data.current && setOverlayElement(active.data.current.overlayItem as ReactNode);
  };

  const onDragOver = (event: DragOverEvent) => {
    if (!event.active.data.current || !event.over?.data.current) return;

    const overlayItem = event.active.data.current.overlayItem as ReactNode;

    return setOverlayElement(overlayItem);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active.data.current || !over?.data.current) return;

    stopDragging();
    setOverlayElement(null);

    const activeType = active.data.current.type as DraggableComponent;
    const overType = over.data.current.type as DraggableComponent;

    const dragDirection = getDragDirection(activeType, overType);

    if (dragDirection === "cart-item -> cart-item" || dragDirection === "cart-item -> cart-list-box") {
      return onCartItemDragEnd(event);
    }
    if (dragDirection === "cart-item -> meal-cart-item" || dragDirection === "cart-item -> meal-cart-area") {
      return onCartToMealCartDragEnd(event);
    }
    if (dragDirection === "meal-cart-item -> cart-item" || dragDirection === "meal-cart-item -> cart-list-box") {
      return onMealCartToCartDragEnd(event);
    }

    return;
  };

  const onDragCancel = () => {
    stopDragging();
    setOverlayElement(null);
  };

  return {
    sensors,
    onDragEnd,
    onDragOver,
    onDragStart,
    onDragCancel,
    overlayElement,
  };
};

export default useDndContext;
