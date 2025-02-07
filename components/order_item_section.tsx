"use client";
import { usePathname } from "next/navigation";

import Subheading from "@/components/common/subheading";
import HorizontalItem from "@/components/common/horizontal_item";

import styles from "@/components/order_item_section.module.css";

import type { THorizontalItem } from "@/types";

import classNames from "classnames/bind";

interface OrderItemSectionProps {
  items: THorizontalItem[];
  totalPrice: string;
}

const cx = classNames.bind(styles);

export default function OrderItemSection({ items, totalPrice }: OrderItemSectionProps) {
  const pathname = usePathname();
  const isOrderForm = pathname === "/order/form";
  return (
    <section>
      <Subheading title={"주문 상품"} />
      <ul className={cx("order_item_section_item_list")}>
        {items.map((item) => (
          <HorizontalItem key={item.item_id} horizontalItem={item} isEditable={false} />
        ))}
      </ul>
      {isOrderForm && (
        <div className={cx("order_item_section_total_price")}>
          <span>최종 결제 금액</span>
          <div className={cx("order_item_section_total_price__div")}>
            <p className={cx("title-md-b")}>{totalPrice}</p>
            <span>원</span>
          </div>
        </div>
      )}
    </section>
  );
}
