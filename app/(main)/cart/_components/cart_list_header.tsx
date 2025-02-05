"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/button";

import style from "@/app/(main)/cart/_components/cart_list_header.module.css";

import classNames from "classnames/bind";
import { useStore } from "@/hooks/usestore";

const cx = classNames.bind(style);

export default function CartListHeader() {
  const [isChecked, setIsChecked] = useState(false);
  const { cart, getIsCheckedAllCartItems, changeIsCheckedAllCartItems, bulkAddMealCartItems, getCheckedCartItems } =
    useStore();

  const totalPrice = cart.reduce((arr, cur) => {
    if (cur.is_checked) return arr + cur.item_price * cur.quantity;
    return arr;
  }, 0);

  const formattedTotalPrice = totalPrice.toLocaleString();

  const CART_LIST_HEADER_ITEM = [
    {
      key: "item_name",
      kor: "제품명",
      flex: 2,
    },
    {
      key: "item_price",
      kor: "가격",
      flex: 1,
    },
    {
      key: "quantity",
      kor: "수량",
      flex: 1,
    },
    {
      key: "delete",
      kor: "제거",
      flex: 1,
    },
  ];

  const CART_TO_MEAL_CART = "한끼 장바구니로 담아보기";
  const CART_ORDER_TEXT = "주문하기";

  const TOTAL_PRICE_TEXT = "총 금액 ₩";

  const bulkAddMealCartItemsHandler = () => {
    const checkedItems = getCheckedCartItems();

    bulkAddMealCartItems(checkedItems);
  };

  useEffect(() => {
    setIsChecked(getIsCheckedAllCartItems());
  }, [cart]);

  return (
    <div className={cx("cart_list_header__wrapper")}>
      <div className={cx("cart_list_header__top__div")}>
        <Button width="280px" height="30px" text={CART_TO_MEAL_CART} onClick={bulkAddMealCartItemsHandler} />
        <div className={cx("cart_list_header__top__text")}>
          <span className={cx("cart_list_header__top__span", "text-lg")}>{TOTAL_PRICE_TEXT}</span>
          <span className={cx("cart_list_header__top__span", "text-lg")}>{formattedTotalPrice}</span>
        </div>
        <Button width="95px" height="30px" text={CART_ORDER_TEXT} />
      </div>
      <ul className={cx("cart_list_header__bottom__div")}>
        <input
          type="checkbox"
          className={cx("cart_list_header__top__checkbox")}
          checked={isChecked}
          onChange={() => changeIsCheckedAllCartItems(!isChecked)}
        />
        {CART_LIST_HEADER_ITEM.map((item) => (
          <li
            key={item.key}
            className={cx("cart_list_header__flex__li")}
            style={{
              flex: item.flex,
            }}
          >
            <div className={cx("cart_list_header__vertical_divider")} />
            <span>{item.kor}</span>
            <div />
          </li>
        ))}
      </ul>
    </div>
  );
}
