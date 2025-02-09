"use client";
import Button from "@/components/common/button";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";
import PaymentButtonList from "@/app/(main)/order/form/_components/payment_button_list";

import styles from "@/app/(main)/order/form/_components/payment_section.module.css";

import { PAYMENTS } from "@/constants";
import classNames from "classnames/bind";

interface PaymentInfoSectionProps {
  totalPrice: string;
}

const cx = classNames.bind(styles);

export default function PaymentSection({ totalPrice }: PaymentInfoSectionProps) {
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
      />
    </section>
  );
}
