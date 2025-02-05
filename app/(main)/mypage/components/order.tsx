"use client";

import { useState } from "react";

import styles from "@/app/(main)/mypage/components/order.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const orders = [
  {
    date: "2025. 01. 21.",
    itemName: "Item name",
    price: "1,000원",
  },
  {
    date: "2025. 01. 20.",
    itemName: "Item name",
    price: "1,000원",
  },
];

const filterOptions = ["3개월", "6개월", "1년", "3년"];

export default function OrderPage() {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  // 선택된 필터에 따라 주문 목록 필터링
  const filterOrders = () => {
    const now = new Date();
    const pastDate = new Date();

    switch (selectedFilter) {
      case "3개월":
        pastDate.setMonth(now.getMonth() - 3);
        break;
      case "6개월":
        pastDate.setMonth(now.getMonth() - 6);
        break;
      case "1년":
        pastDate.setFullYear(now.getFullYear() - 1);
        break;
      case "3년":
        pastDate.setFullYear(now.getFullYear() - 3);
        break;
      default:
        return orders;
    }

    return orders.filter((order) => {
      const orderDate = new Date(order.date.replace(/\./g, "-"));
      return orderDate >= pastDate;
    });
  };

  const filteredOrders = filterOrders();

  return (
    <div className={cx("order-history-container")}>
      <h2 className={cx("order-title")}>주문 내역</h2>
      <div className={cx("button-group")}>
        {filterOptions.map((option) => (
          <button
            key={option}
            className={cx("filter-button", { active: selectedFilter === option })}
            onClick={() => setSelectedFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <hr className={cx("divider")} />
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <div key={index} className={cx("order-item")}>
            <div className={cx("order-date")}>{order.date}</div>
            <HorizontalItem
              cart={{
                user_id: 1,
                item_id: 1,
                wrapper_id: null,
                quantity: 10,
                created_at: "",
                updated_at: "",
                item_name: "[어제까지 초특가 할인] 그냥 고등어",
                item_price: 10000,
                img: undefined,
                blurImg: undefined,
              }}
              isEditable={false}
              onCheck={function (itemId: number, checked: boolean): void {
                console.log("와 체크:" + checked + itemId);
              }}
              onQuantityChange={function (itemId: number, quantity: number): void {
                console.log("와 숫자 변경" + quantity + itemId);
              }}
              onDelete={function (itemId: number): void {
                console.log("와 삭제" + itemId);
              }}
            />
            <div className={cx("action-buttons")}>
              <button className={cx("action-button")}>배송 조회</button>
              <button className={cx("action-button")}>리뷰 작성</button>
              <button className={cx("action-button")}>다시 담기</button>
            </div>
          </div>
        ))
      ) : (
        <p className={cx("no-orders")}>해당 기간의 주문이 없습니다.</p>
      )}
    </div>
  );
}
