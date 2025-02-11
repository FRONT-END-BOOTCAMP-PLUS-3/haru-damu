"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/common/button";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";
import PaymentButtonList from "@/app/(main)/order/form/_components/payment_button_list";

import { useStore } from "@/hooks/usestore";

import styles from "@/app/(main)/order/form/_components/payment_section.module.css";

import type { TCartItem } from "@/stores/cart_store";

import { PAYMENTS } from "@/constants";
import classNames from "classnames/bind";

interface PaymentInfoSectionProps {
  totalPrice: string;
  fetchedData: TCartItem[];
}

const cx = classNames.bind(styles);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function PaymentSection({ totalPrice, fetchedData }: PaymentInfoSectionProps) {
  const { user, cart, fetchCart } = useStore();

  const router = useRouter();

  const onClickHandler = async () => {
    try {
      const newOrder = {
        orderAddress: user?.address,
        totalPrice,
        orderList: fetchedData,
      };

      const createOrder = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      }).then((response) => response.json());

      Promise.all(
        cart.map(
          async (item) =>
            await fetch(`${BASE_URL}/api/carts`, {
              method: "DELETE",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ itemId: item.itemId }),
            }),
        ),
      );

      fetchCart([]);

      router.push(`/order/${createOrder.order.orderId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Subheading title={"결제 정보"} />
      <LabelValueText label={"결제수단 선택"} />
      <PaymentButtonList payments={PAYMENTS} />
      <Button
        text={`${totalPrice} 원 결제하기`}
        color="primary"
        width="252px"
        height="60px"
        className={cx("payment_section_checkout__button")}
        onClick={onClickHandler}
      />
    </section>
  );
}
