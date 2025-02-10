import OrderItemSection from "@/components/order_item_section";
import ShippingInfoSection from "@/components/shipping_info_section";
import PaymentInfoSection from "@/app/(main)/order/[id]/_components/payment_info_section";

import totalPriceCalculator from "@/utils/total_price_calculator";

import styles from "@/app/(main)/order/[id]/page.module.css";

import users from "@/dummys/users";
import classNames from "classnames/bind";
import horizontalItems from "@/dummys/horizontal_items";

const cx = classNames.bind(styles);

async function getOrderData(orderId: number) {
  const res = await fetch(`http://localhost:3000/api/order/${orderId}`, {
    cache: "no-store", // 최신 데이터를 가져오기 위해 캐싱 비활성화
  });
  if (!res.ok) {
    if (res.status === 404) {
      return null; // 주문이 없으면 null 반환
    }
    throw new Error(`Failed to fetch order data for ID ${orderId}`);
  }
  return res.json();
}

export default async function OrderPage({ params }: { params: { id: number } }) {
  const orderData = await getOrderData(Number(params.id));

  console.log(orderData);

  const totalPrice = totalPriceCalculator(horizontalItems);

  return (
    <div className={cx("container")}>
      <h2 className={cx("order_title__h2", "title-lg-b")}>주문상세</h2>
      <OrderItemSection items={horizontalItems} totalPrice={totalPrice} />
      <ShippingInfoSection user={users[1]} />
      <PaymentInfoSection totalPrice={totalPrice} />
    </div>
  );
}
