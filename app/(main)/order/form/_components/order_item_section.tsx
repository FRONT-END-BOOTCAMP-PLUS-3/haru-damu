"use client";
import HorizontalItem from "@/components/common/horizontal_item";

import styles from "@/app/(main)/order/form/_components/order_item_section.module.css";

import type { THorizontalItem } from "@/types";

import classNames from "classnames/bind";
import Subheading from "@/app/(main)/order/form/_components/subheading";

interface OrderItemSectionProps {
  items: THorizontalItem[];
  totalPrice: number;
}

const cx = classNames.bind(styles);

export default function OrderItemSection({ items, totalPrice }: OrderItemSectionProps) {
  const formattedTotalPrice = totalPrice.toLocaleString();
  return (
    <section>
      <Subheading title={"주문 상품"} />
      <ul className={cx("order_item_section_item_list")}>
        {items.map((item) => (
          <HorizontalItem key={item.item_id} horizontalItem={item} isEditable={false} />
        ))}
      </ul>
      <div className={cx("order_item_section_total_price")}>
        <span>최종 결제 금액</span>
        <div className={cx("order_item_section_total_price__div")}>
          <p className={cx("title-md-b")}>{formattedTotalPrice}</p>
          <span>원</span>
        </div>
      </div>
    </section>
  );
}
