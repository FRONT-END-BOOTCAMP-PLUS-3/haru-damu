"use client";

import { useState } from "react";

import Pagination from "@/components/common/pagination";
import HorizontalItem from "@/components/common/horizontal_item";

import styles from "@/app/(main)/mypage/_components/order.module.css";

import {
  ORDER_TITLE,
  ORDER_DETAIL_BUTTON,
  ORDER_SHIPMENT_BUTTON,
  ORDER_REVIEW_BUTTON,
  ORDER_SHIPMENT_AGAIN,
} from "@/constants/mypage";

import orders from "@/dummys/order";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const filterOptions = ["3개월", "6개월", "1년", "3년"];

export default function OrderPage() {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
      const orderDate = new Date(order.created_at.replace(/\./g, "-"));
      return orderDate >= pastDate;
    });
  };

  const filteredOrders = filterOrders();
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const onClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 주문만 표시
  const getCurrentPageOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const currentOrders = getCurrentPageOrders();

  return (
    <div className={cx("order")}>
      <h2 className={cx("order__title", "title-lg-b")}>{ORDER_TITLE}</h2>
      <div className={cx("order__filter")}>
        {filterOptions.map((option) => (
          <button
            key={option}
            className={cx("order__filter-button", "text-sm", {
              "order__filter-button--active": selectedFilter === option,
            })}
            onClick={() => {
              setSelectedFilter(option);
              setCurrentPage(1); // 필터 변경 시 1페이지로 리셋
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <hr className={cx("order__divider")} />
      {currentOrders.length ? (
        currentOrders.map((order, index) => (
          <div key={index} className={cx("order__item")}>
            <div className={cx("order__item-header")}>
              <div className={cx("text-lg-b")}>{order.created_at}</div>
              <button className={cx("order__item-detail-button", "text-sm")}>{ORDER_DETAIL_BUTTON}</button>
            </div>
            <HorizontalItem
              horizontalItem={{
                ...order,
                img: undefined,
                blurImg: undefined,
              }}
              isEditable={false}
              onCheck={(itemId: number, checked: boolean) => {
                console.log("와 체크:" + checked + itemId);
              }}
              onQuantityChange={(itemId: number, quantity: number) => {
                console.log("와 숫자 변경" + quantity + itemId);
              }}
              onDelete={(itemId: number) => {
                console.log("와 삭제" + itemId);
              }}
            />
            <div className={cx("order__item-actions")}>
              <button className={cx("order__item-action-button", "text-sm")}>{ORDER_SHIPMENT_BUTTON}</button>
              <button className={cx("order__item-action-button", "text-sm")}>{ORDER_REVIEW_BUTTON}</button>
              <button className={cx("order__item-action-button", "text-sm")}>{ORDER_SHIPMENT_AGAIN}</button>
            </div>
          </div>
        ))
      ) : (
        <p className={cx("order__empty")}>해당 기간의 주문이 없습니다.</p>
      )}
      {filteredOrders.length > 0 && (
        <div className={cx("order__pagination")}>
          <Pagination current={currentPage} total={totalPages} onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
}
