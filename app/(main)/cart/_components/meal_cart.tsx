"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/button";
import MealCartItem from "@/app/(main)/cart/_components/meal_cart_item";
import MealCartChart from "@/app/(main)/cart/_components/meal_cart_chart";

import { useStore } from "@/hooks/usestore";

import style from "@/app/(main)/cart/_components/meal_cart.module.css";

import type { TItem, TNutrition } from "@/types";
import type { TCartItem } from "@/stores/cart_store";

import items from "@/dummys/items";
import health from "@/dummys/health";
import classNames from "classnames/bind";
import { useDroppable } from "@dnd-kit/core";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { REMOVE_ALL_MEAL_ITEMS_BUTTON, WRAPPING_ALL_MEAL_ITEMS_BUTTON } from "@/constants";

const cx = classNames.bind(style);

export default function MealCart() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [carouselItems, setCarouselItems] = useState<TCartItem[]>([]);

  const { mealCart, removeAllMealCartItems, wrappingMealItems } = useStore();

  const { calorie, carbohydrates, protein, fat, sodium, sugar } = health;

  const { setNodeRef } = useDroppable({
    id: "meal-cart-area",
    data: {
      type: "meal-cart-area",
    },
  });

  const isCarousel = mealCart.length > 4;

  const userNutrition = {
    calorie,
    carbohydrates,
    protein,
    fat,
    sodium,
    sugar,
  };

  const itemsNutrition = mealCart.map((cartItem) => {
    const { g, calorie, carbohydrates, protein, fat, sodium, sugar } = cartItem.item.nutrition;

    return {
      g,
      calorie,
      carbohydrates,
      protein,
      fat,
      sodium,
      sugar,
    };
  });

  useEffect(() => {
    const getCarouselItems = (items: TCartItem[], page: number, pageSize = 4): TCartItem[] => {
      const startIndex = (page - 1) * pageSize;
      return items.slice(startIndex, startIndex + pageSize);
    };

    const newCarouselItems = getCarouselItems(mealCart, page) || [];

    setCarouselItems(newCarouselItems);
  }, [page, mealCart]);

  useEffect(() => {
    const newTotalPage = Math.ceil(mealCart.length / 4);

    setPage(newTotalPage);
    setTotalPage(newTotalPage);
  }, [mealCart]);

  return (
    <div id="meal-cart-area" ref={setNodeRef} className={cx("meal_cart__wrapper")}>
      <span className={cx("meal_cart__title", "title-md-b")}>한끼 영양성분표</span>
      <div className={cx("meal_cart__button__wrapper")}>
        <Button
          className={cx("meal_cart__button")}
          width="230px"
          height="35px"
          text={WRAPPING_ALL_MEAL_ITEMS_BUTTON}
          onClick={wrappingMealItems}
        />
        <Button
          className={cx("meal_cart__button")}
          width="230px"
          height="35px"
          color="delete"
          text={REMOVE_ALL_MEAL_ITEMS_BUTTON}
          onClick={removeAllMealCartItems}
        />
      </div>
      <div className={cx("meal_cart__content__wrapper")}>
        <MealCartChart userNutrition={userNutrition} itemsNutrition={itemsNutrition} />
        <div className={cx("meal_cart__ul__wrapper")}>
          <button
            disabled={!isCarousel || page === 1}
            className={cx("meal_cart__carousel__button")}
            onClick={() =>
              setPage((prev) => {
                if (prev === 1) return 1;
                return prev - 1;
              })
            }
          >
            <ArrowLeftCircle />
          </button>
          <div className={cx("meal_cart__page_text__wrapper")}>
            <span
              className={cx("meal_cart__page_text", !isCarousel && "meal_cart__page_text__none")}
            >{`page : ${page} / ${totalPage}`}</span>
            <ul className={cx("meal_cart__ul")}>
              <SortableContext
                strategy={horizontalListSortingStrategy}
                items={carouselItems.map((item) => item.itemId)}
              >
                {carouselItems.map((item, idx) => (
                  <MealCartItem key={idx} item={item} />
                ))}
              </SortableContext>
            </ul>
          </div>
          <button
            disabled={!isCarousel || page === totalPage}
            className={cx("meal_cart__carousel__button")}
            onClick={() =>
              setPage((prev) => {
                if (prev === totalPage) return 1;
                return prev + 1;
              })
            }
          >
            <ArrowRightCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
