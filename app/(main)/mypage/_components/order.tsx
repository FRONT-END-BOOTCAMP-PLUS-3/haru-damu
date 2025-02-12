"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import Pagination from "@/components/common/pagination";
import HorizontalItem from "@/components/common/horizontal_item";

import { useStore } from "@/hooks/usestore";

import dateFormatter from "@/utils/date_formatter";

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

import type { Order } from "@/app/api/orders/route";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const filterOptions = ORDER_FILTER_OPTIONS;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ orders: Order[]; total: number }>({ orders: [], total: 0 });

  const { devMessage } = useStore();

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedFilter = searchParams.get("filter") || filterOptions[0];
  const itemsPerPage = Number(searchParams.get("size")) || 3;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/orders?page=${currentPage}&size=${itemsPerPage}&filter=${selectedFilter}`,
        ).then((response) => response.json());

        const { items, count } = response;

        setData({
          orders: items,
          total: count,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
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
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className={cx("order__item")}>
            <div className={cx("order__item-header")}>
              <div className={cx("text-lg-b")}>{dateFormatter(new Date(order.createdAt))}</div>
              <button
                className={cx("order__item-detail-button", "text-sm")}
                onClick={() => router.push(`/order/${order.orderId}`)}
              >
                {ORDER_DETAIL_BUTTON}
              </button>
            </div>
            {order?.orderList.length > 0 && (
              <HorizontalItem horizontalItem={order?.orderList[0] ?? []} isEditable={false} />
            )}
            <div className={cx("order__item-actions")}>
              <button className={cx("order__item-action-button", "text-sm")} onClick={devMessage}>
                {ORDER_SHIPMENT_BUTTON}
              </button>
              <button className={cx("order__item-action-button", "text-sm")} onClick={devMessage}>
                {ORDER_REVIEW_BUTTON}
              </button>
              <button className={cx("order__item-action-button", "text-sm")} onClick={devMessage}>
                {ORDER_SHIPMENT_AGAIN}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={cx("order__empty")}>{ORDER_ERROR}</p>
      )}
      {totalPages > 1 && (
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
