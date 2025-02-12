import OrderItemSection from "@/components/order_item_section";
import ShippingInfoSection from "@/components/shipping_info_section";
import PaymentInfoSection from "@/app/(main)/order/[id]/_components/payment_info_section";

import getHeader from "@/utils/get_header";

import styles from "@/app/(main)/order/[id]/page.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function OrderPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const headers = await getHeader();

  const response = await fetch(`${BASE_URL}/api/orders/${id}`, {
    headers,
    credentials: "include",
  }).then((response) => response.json());

  const order = response.order;

  const fetchedData = order.items ?? [];
  const totalPrice = order.totalPrice;
  const fetchedAddress = order.orderAddress;

  const formattedPrice = totalPrice?.toLocaleString() ?? 0;

  return (
    <div className={cx("container")}>
      <h2 className={cx("order_title__h2", "title-lg-b")}>주문상세</h2>
      {fetchedData.length > 0 && <OrderItemSection items={fetchedData} totalPrice={formattedPrice} />}
      <ShippingInfoSection fetchedAddress={fetchedAddress} />
      <PaymentInfoSection totalPrice={formattedPrice} />
    </div>
  );
}
