"use client";
import Button from "@/components/common/button";

import styles from "@/app/(main)/order/form/_components/payment_info_section.module.css";

import { PAYMENTS } from "@/constants";
import classNames from "classnames/bind";
import Subheading from "@/app/(main)/order/form/_components/subheading";
import InlineField from "@/app/(main)/order/form/_components/inline_field";
import PaymentButtonList from "@/app/(main)/order/form/_components/payment_button_list";

interface PaymentInfoSectionProps {
  totalPrice: number;
}

const cx = classNames.bind(styles);

export default function PaymentInfoSection({ totalPrice }: PaymentInfoSectionProps) {
  const formattedTotalPrice = totalPrice.toLocaleString();
  return (
    <section>
      <Subheading title={"결제 정보"} />
      <InlineField label={"결제수단 선택"} />
      <PaymentButtonList payments={PAYMENTS} />
      <Button
        text={`${formattedTotalPrice}원 결제하기`}
        color="primary"
        width="252px"
        height="60px"
        className={cx("payment_info_section_checkout__button")}
      />
    </section>
  );
}
