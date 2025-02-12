import { redirect } from "next/navigation";

import OrderItemSection from "@/components/order_item_section";
import OrdererInfoSection from "@/components/orderer_info_section";
import ShippingInfoSection from "@/components/shipping_info_section";
import PaymentSection from "@/app/(main)/order/form/_components/payment_section";

import getHeader from "@/utils/get_header";

import styles from "@/app/(main)/order/form/page.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function OrderFormPage() {
  const headers = await getHeader();

  const response = await fetch(`${BASE_URL}/api/carts`, {
    headers,
    credentials: "include",
  }).then((response) => response.json());

  const fetchedData = response.items;
  const totalPrice = response.totalPrice;

  const formattedPrice = totalPrice?.toLocaleString() ?? 0;

  if (response.count === 0) redirect("/");

  return (
    <div className={cx("container")}>
      <h2 className={cx("order_form_title__h2", "title-lg-b")}>주문서</h2>
      <OrderItemSection items={fetchedData} totalPrice={formattedPrice} />
      <OrdererInfoSection />
      <ShippingInfoSection />
      <PaymentSection totalPrice={formattedPrice} fetchedData={fetchedData} />
    </div>
  );
}
