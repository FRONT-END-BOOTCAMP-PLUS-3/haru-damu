import styles from "@/app/(main)/order/form/_components/payment_button_list.module.css";

import classNames from "classnames/bind";
import PaymentButton from "@/app/(main)/order/form/_components/payment_button";

interface PaymentButtonListProps {
  payments: { paymentName: string; brandColor: string }[];
}

const cx = classNames.bind(styles);

export default function PaymentButtonList({ payments }: PaymentButtonListProps) {
  return (
    <div className={cx("payment_button_list")}>
      {payments.map((payment, index) => (
        <PaymentButton
          key={index}
          paymentName={payment.paymentName}
          brandColor={payment.brandColor}
          isChecked={index === 0} // 첫 번째 버튼만 checked 상태로 설정
        />
      ))}
    </div>
  );
}
