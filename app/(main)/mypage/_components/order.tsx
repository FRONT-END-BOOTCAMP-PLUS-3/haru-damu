"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";

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

import type { Order } from "@/app/api/order/order";

import classNames from "classnames/bind";
import { fetchOrders } from "@/app/api/order/order";

const cx = classNames.bind(styles);

const filterOptions = ORDER_FILTER_OPTIONS;

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ orders: Order[]; total: number }>({ orders: [], total: 0 });
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedFilter = searchParams.get("filter") || filterOptions[0];
  const itemsPerPage = Number(searchParams.get("size")) || 3;

  useEffect(() => {
    fetchOrders(currentPage, selectedFilter, itemsPerPage).then((result) => setData(result));
  }, [currentPage, selectedFilter, itemsPerPage]);

  const updateQueryParams = (page: number, filter: string, size: number = itemsPerPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("filter", filter);
    params.set("size", size.toString());
    router.push(`?${params.toString()}`);
  };

  const { orders, total } = data;
  const totalPages = Math.ceil(total / itemsPerPage);

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
            onClick={() => updateQueryParams(1, option)}
          >
            {option}
          </button>
        ))}
      </div>
      <hr className={cx("order__divider")} />
      {orders.length ? (
        orders.map((order) => (
          <div key={order.item_id} className={cx("order__item")}>
            <div className={cx("order__item-header")}>
              <div className={cx("text-lg-b")}>{order.created_at}</div>
              <button className={cx("order__item-detail-button", "text-sm")}>{ORDER_DETAIL_BUTTON}</button>
            </div>
            <HorizontalItem
              horizontalItem={{
                user_id: order.user_id,
                item_id: order.item_id,
                wrapper_id: order.wrapper_id,
                quantity: order.quantity,
                is_checked: true,
                item_name: order.item_name,
                item_price: order.item_price,
                img: undefined,
                blurImg: undefined,
                created_at: order.created_at,
                updated_at: order.created_at,
              }}
              isEditable={false}
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
      {orders.length > 0 && (
        <div className={cx("order__pagination")}>
          <Pagination
            current={currentPage}
            total={totalPages}
            onClick={(page) => updateQueryParams(page, selectedFilter)}
          />
        </div>
      )}
    </div>
  );
}
