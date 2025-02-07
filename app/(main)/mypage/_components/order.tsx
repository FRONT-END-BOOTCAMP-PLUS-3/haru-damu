"use client";

import { useSearchParams, useRouter } from "next/navigation";

import Pagination from "@/components/common/pagination";
import HorizontalItem from "@/components/common/horizontal_item";

import styles from "@/app/(main)/mypage/_components/order.module.css";

import {
  ORDER_TITLE,
  ORDER_DETAIL_BUTTON,
  ORDER_SHIPMENT_BUTTON,
  ORDER_REVIEW_BUTTON,
  ORDER_SHIPMENT_AGAIN,
  ORDER_FILTER_OPTIONS,
  ORDER_ERROR,
} from "@/constants/mypage";

import orders from "@/dummys/order";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const filterOptions = ORDER_FILTER_OPTIONS;

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedFilter = searchParams.get("filter") || filterOptions[0];
  const itemsPerPage = Number(searchParams.get("size")) || 3;

  const updateQueryParams = (page: number, filter: string, size: number = itemsPerPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("filter", filter);
    params.set("size", size.toString());
    router.push(`?${params.toString()}`);
  };

  const onClickHandler = (page: number) => {
    updateQueryParams(page, selectedFilter);
  };

  const filterOrders = () => {
    const now = new Date();
    const pastDate = new Date();

    switch (selectedFilter) {
      case filterOptions[0]:
        pastDate.setMonth(now.getMonth() - 3);
        break;
      case filterOptions[1]:
        pastDate.setMonth(now.getMonth() - 6);
        break;
      case filterOptions[2]:
        pastDate.setFullYear(now.getFullYear() - 1);
        break;
      case filterOptions[3]:
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
              updateQueryParams(1, option);
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
        <p className={cx("order__empty")}>{ORDER_ERROR}</p>
      )}
      {filteredOrders.length > 0 && (
        <div className={cx("order__pagination")}>
          <Pagination current={currentPage} total={totalPages} onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
}
