"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/common/button";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import styles from "@/app/(main)/order/[id]/_components/payment_info_section.module.css";

import classNames from "classnames/bind";
import { ChevronLeft } from "lucide-react";

interface PaymentInfoSectionProps {
  totalPrice: string;
}

const cx = classNames.bind(styles);

export default function PaymentInfoSection({ totalPrice }: PaymentInfoSectionProps) {
  const router = useRouter();
  const goForwardHandler = () => {
    router.back();
  };
  return (
    <section>
      <Subheading title={"결제 정보"} />
      <LabelValueText label="결제 금액" value={`${totalPrice} 원`} />
      {/* 추후 payments 테이블에 대한 개발 진행 시 결제 내역에 결제 수단 출력 고려 */}
      <Button
        iconComponent={<ChevronLeft size={16} />}
        color="primary"
        width="252px"
        height="60px"
        text={"돌아가기"}
        className={cx("payment_info_section__forward_button")}
        onClick={goForwardHandler}
      />
    </section>
  );
}
