import OrderItemSection from "@/components/order_item_section";
import ShippingInfoSection from "@/components/shipping_info_section";
import PaymentInfoSection from "@/app/(main)/order/[id]/_components/payment_info_section";

import totalPriceCalculator from "@/utils/total_price_calculator";

import styles from "@/app/(main)/order/[id]/page.module.css";

import users from "@/dummys/users";
import classNames from "classnames/bind";
import horizontalItems from "@/dummys/horizontal_items";

const cx = classNames.bind(styles);

export default function OrderPage({ params }: { params: { id: number } }) {
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
