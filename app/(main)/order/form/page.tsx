import OrderItemSection from "@/components/order_item_section";
import OrdererInfoSection from "@/components/orderer_info_section";
import ShippingInfoSection from "@/components/shipping_info_section";
import PaymentSection from "@/app/(main)/order/form/_components/payment_section";

import totalPriceCalculator from "@/utils/total_price_calculator";

import styles from "@/app/(main)/order/form/page.module.css";

import users from "@/dummys/users";
import classNames from "classnames/bind";
import horizontalItems from "@/dummys/horizontal_items";

const cx = classNames.bind(styles);

export default function OrderFormPage() {
  const totalPrice = totalPriceCalculator(horizontalItems);
  return (
    <div className={cx("container")}>
      <h2 className={cx("order_form_title__h2", "title-lg-b")}>주문서</h2>
      <OrderItemSection items={horizontalItems} totalPrice={totalPrice} />
      <OrdererInfoSection user={users[1]} />
      <ShippingInfoSection user={users[1]} />
      <PaymentSection totalPrice={totalPrice} />
    </div>
  );
}
